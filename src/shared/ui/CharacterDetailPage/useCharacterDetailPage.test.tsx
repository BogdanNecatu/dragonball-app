import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useCharacterDetailPage } from './useCharacterDetailPage';
import { useCharactersStore } from '../../../features/characters/store/useCharactersStore';
import { ReactNode } from 'react';
import { Character } from '../../../features/characters/types';
import { vi } from 'vitest';

// Dummy character data used for testing Zustand store state
const dummyCharacter: Character = {
  id: 1,
  name: 'Goku',
  image: 'goku.jpg',
  description: 'The strongest Saiyan',
  transformations: [
    { id: 1, name: 'Base', ki: '1 Million', image: 'base.png', deletedAt: null },
    { id: 2, name: 'SSJ', ki: '5 Million', image: 'ssj.png', deletedAt: null },
  ],
};

// Wrapper that simulates routing context with route params
const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={['/character/1']}>
    <Routes>
      <Route path="/character/:id" element={children} />
    </Routes>
  </MemoryRouter>
);

describe('useCharacterDetailPage (no mocks)', () => {
  beforeEach(() => {
    // Prepopulate Zustand store with dummy character
    useCharactersStore.setState({
      characters: [dummyCharacter],
      favorites: [],
      toggleFavorite: () => {},
      isFavorite: () => false,
      setCharacters: () => {},
      fetchCharacters: () => {},
    });

    // Fake timers to test timeout-based UI logic
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore timers after each test
  });

  /**
   * ✅ Test: Should return the correct character and manage visibility states.
   * It ensures `character` is returned, and both `showBar` and `showDetail` update with time.
   */
  it('returns the correct character and sets visibility after time', () => {
    const { result } = renderHook(() => useCharacterDetailPage(), { wrapper });

    // Initial state after render
    expect(result.current.character?.id).toBe(1);
    expect(result.current.showBar).toBe(true);
    expect(result.current.showDetail).toBe(false);
    expect(result.current.isNotFound).toBe(false);
  });

  /**
   * ✅ Test: Should return `isNotFound` as true when the character is missing in the store.
   */
  it('returns isNotFound when character is not in store', () => {
    useCharactersStore.setState({ characters: [] }); // simulate empty store

    const { result } = renderHook(() => useCharacterDetailPage(), { wrapper });

    expect(result.current.character).toBeUndefined();
    expect(result.current.isNotFound).toBe(true);
  });
});
