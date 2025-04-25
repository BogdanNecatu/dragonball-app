import { renderHook } from '@testing-library/react';
import { useCharacterDetail } from './useCharacterDetail';
import { useCharactersStore } from '../../features/characters/store/useCharactersStore';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ReactNode } from 'react';
import { Character } from '../../entities/characters/types';

// Dummy data
const dummyCharacter: Character = {
  id: 1,
  name: 'Goku',
  image: 'goku.jpg',
  description: 'The strongest Saiyan',
  transformations: [
    { id: 1, name: 'Base', ki: '500 Thousand', image: 'base.png', deletedAt: null },
    { id: 2, name: 'SSJ', ki: '5 Million', image: 'ssj.png', deletedAt: null },
    { id: 3, name: 'SSJ Blue', ki: '2 Billion', image: 'blue.png', deletedAt: null },
  ],
};

// Envolver el hook con Router y route param
const wrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={['/character/1']}>
    <Routes>
      <Route path="/character/:id" element={children} />
    </Routes>
  </MemoryRouter>
);

describe('useCharacterDetail (no mocks)', () => {
  beforeEach(() => {
    useCharactersStore.setState({
      characters: [dummyCharacter],
      favorites: [dummyCharacter],
      toggleFavorite: () => {},
      isFavorite: (id: number) => id === 1,
      setCharacters: () => {},
      fetchCharacters: () => {},
    });
  });

  it('returns the correct character from store', () => {
    const { result } = renderHook(() => useCharacterDetail(), { wrapper });
    expect(result.current.character?.name).toBe('Goku');
  });

  it('returns correct favorite status', () => {
    const { result } = renderHook(() => useCharacterDetail(), { wrapper });
    expect(result.current.fav).toBe(true);
  });

  it('returns sorted transformations by Ki ascending', () => {
    const { result } = renderHook(() => useCharacterDetail(), { wrapper });
    const kiOrder = result.current.sortedTransformations.map((t) => t.ki);
    expect(kiOrder).toEqual(['500 Thousand', '5 Million', '2 Billion']);
  });

  it('returns a scrollRef', () => {
    const { result } = renderHook(() => useCharacterDetail(), { wrapper });
    expect(result.current.scrollRef).toHaveProperty('current');
  });
});
