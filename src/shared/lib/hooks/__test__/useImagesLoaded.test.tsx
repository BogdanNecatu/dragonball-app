import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useImagesLoaded from '../useImagesLoaded';

// Simulates image loading by overriding Image prototype
beforeEach(() => {
  vi.stubGlobal(
    'Image',
    class {
      src: string = '';
      onload: () => void = () => {};
      constructor() {
        // Simulate async load immediately
        setTimeout(() => {
          this.onload();
        }, 0);
      }
    },
  );
});

// Returns true immediately when urls is empty
it('returns true immediately if no URLs are provided', () => {
  const { result } = renderHook(() => useImagesLoaded([]));
  expect(result.current).toBe(true);
});

// Returns true after all images are loaded
it('returns true after all images are loaded', async () => {
  const urls = ['img1.png', 'img2.png', 'img3.png'];
  const { result } = renderHook(() => useImagesLoaded(urls));

  // Wait for all simulated loads to complete
  await act(() => new Promise((r) => setTimeout(r, 0)));

  expect(result.current).toBe(true);
});
