import { act } from 'react-dom/test-utils';
import { useCharactersStore } from './useCharactersStore';
import { Character } from '../../../entities/characters/types';
import { vi } from 'vitest';

// Dummy character to use in all tests
const dummyCharacter: Character = {
  id: 1,
  name: 'Goku',
  image: 'goku.jpg',
  description: 'Saiyan warrior',
  transformations: [],
};

describe('useCharactersStore (Zustand + persist)', () => {
  beforeEach(() => {
    // Reset the Zustand store and localStorage before each test
    useCharactersStore.setState({
      characters: [],
      favorites: [],
    });
    localStorage.clear();
    vi.restoreAllMocks();
  });

  // Test that setCharacters correctly updates the store
  it('sets characters in the store', () => {
    act(() => {
      useCharactersStore.getState().setCharacters([dummyCharacter]);
    });

    const characters = useCharactersStore.getState().characters;
    expect(characters).toHaveLength(1);
    expect(characters[0].name).toBe('Goku');
  });

  // Test that toggleFavorite adds and then removes a favorite character
  it('adds and removes favorites with toggleFavorite', () => {
    act(() => {
      useCharactersStore.getState().setCharacters([dummyCharacter]);
      useCharactersStore.getState().toggleFavorite(dummyCharacter);
    });

    let favorites = useCharactersStore.getState().favorites;
    expect(favorites).toHaveLength(1);

    act(() => {
      useCharactersStore.getState().toggleFavorite(dummyCharacter);
    });

    favorites = useCharactersStore.getState().favorites;
    expect(favorites).toHaveLength(0);
  });

  // Test that isFavorite returns true after character is favorited
  it('isFavorite returns true for a favorited character', () => {
    act(() => {
      useCharactersStore.getState().setCharacters([dummyCharacter]);
      useCharactersStore.getState().toggleFavorite(dummyCharacter);
    });

    const isFav = useCharactersStore.getState().isFavorite(dummyCharacter.id);
    expect(isFav).toBe(true);
  });

  // Test that isFavorite returns false when character is not in favorites
  it('isFavorite returns false for a non-favorited character', () => {
    const isFav = useCharactersStore.getState().isFavorite(999);
    expect(isFav).toBe(false);
  });
});
