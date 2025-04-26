import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { useCharactersStore } from '../../features/characters/model/useCharactersStore';
import { Character } from '../../entities/characters/types';

// Dummy character used for testing favorites
const dummyCharacter: Character = {
  id: 1,
  name: 'Goku',
  image: 'goku.jpg',
  description: 'The strongest',
  transformations: [],
};

describe('Header component', () => {
  beforeEach(() => {
    // Populate Zustand store with dummy favorite characters
    useCharactersStore.setState({
      characters: [],
      favorites: [dummyCharacter, dummyCharacter],
      toggleFavorite: () => {},
      isFavorite: () => true,
      setCharacters: () => {},
      fetchCharacters: () => {},
    });
  });

  // Renders the logo with correct alt text
  it('renders the logo image correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Dragon Ball Logo');
  });

  // Displays the correct number of favorite characters
  it('displays correct number of favorite characters', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('favorites-counter')).toHaveTextContent('2');
  });

  // Applies bottom border style when the route is a character detail page
  it('applies border style when on detail route', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Header />
      </MemoryRouter>,
    );

    const header = screen.getByRole('banner');
    expect(header.className).toMatch(/borderBottom/);
  });
});
