import { waitFor } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useCharactersStore } from '../../features/characters/model/useCharactersStore';
import Home from './Home';
import { vi } from 'vitest';

vi.mock('../../shared/lib/hooks/useImagesLoaded', () => ({
  default: () => true,
}));

// Dummy character list
const dummyCharacters = [
  {
    id: 1,
    name: 'Goku',
    image: 'goku.png',
    description: 'Saiyan warrior',
    transformations: [],
  },
  {
    id: 2,
    name: 'Vegeta',
    image: 'vegeta.png',
    description: 'Proud prince',
    transformations: [],
  },
];

describe('Home Component', () => {
  beforeEach(() => {
    useCharactersStore.setState({
      characters: dummyCharacters,
      favorites: [],
      toggleFavorite: () => {},
      isFavorite: () => false,
      setCharacters: () => {},
      fetchCharacters: async () => {},
    });
  });

  // Should render all characters correctly
  it('renders all characters provided by the store', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const cards = await screen.findAllByTestId('character-card');
    expect(cards).toHaveLength(dummyCharacters.length);

    const resultCount = screen.getByTestId('result-count');
    expect(resultCount).toHaveTextContent(`${dummyCharacters.length} RESULTS`);
  });

  // Sould filter characters when searching by name
  it('filters characters based on search input', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('SEARCH A CHARACTER...');

    fireEvent.change(input, { target: { value: 'goku' } });

    await waitFor(
      async () => {
        const filteredCards = await screen.findAllByTestId('character-card');
        expect(filteredCards).toHaveLength(1);
        expect(filteredCards[0]).toHaveTextContent('Goku');

        const resultCount = screen.getByTestId('result-count');
        expect(resultCount).toHaveTextContent('1 RESULTS');
      },
      { timeout: 1500 },
    );
  });
});
