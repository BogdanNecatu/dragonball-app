import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useDebounce } from '../useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the debounced value after the delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Change the value
    rerender({ value: 'updated', delay: 500 });

    // Before delay, value should still be initial
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // After delay, value should be updated
    expect(result.current).toBe('updated');
  });

  it('should reset the debounce timer if value changes quickly', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    rerender({ value: 'firstChange', delay: 300 });

    act(() => {
      vi.advanceTimersByTime(150); // Not enough time
    });

    rerender({ value: 'secondChange', delay: 300 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('secondChange');
  });
});
