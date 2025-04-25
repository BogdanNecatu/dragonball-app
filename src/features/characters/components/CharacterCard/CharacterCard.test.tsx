import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest'; // ✅ Make sure to import 'vi' namespace
import { BrowserRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { useCharactersStore } from '../../store/useCharactersStore';

// External reusable mock for toggleFavorite
const toggleFavoriteMock = vi.fn();

// Zustand hook mock
vi.mock('../../store/useCharactersStore', () => ({
  useCharactersStore: vi.fn(() => ({
    isFavorite: vi.fn((id: number) => id === 1),
    toggleFavorite: toggleFavoriteMock,
    characters: [{ id: 1, name: 'Goku', image: 'goku.png', transformations: [] }],
  })),
}));

describe('CharacterCard Component', () => {
  const mockCharacter = { id: 1, name: 'Goku', image: 'goku.png', transformations: [] };

  // Test that component renders name and image correctly
  it('renders character name and image', () => {
    render(
      <BrowserRouter>
        <CharacterCard {...mockCharacter} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId('character-card-name')).toHaveTextContent(mockCharacter.name);
    expect(screen.getByRole('img')).toHaveAttribute('src', mockCharacter.image);
  });

  // Test that the favorite icon is rendered when the character is a favorite
  it('shows filled heart icon when character is favorite', () => {
    render(
      <BrowserRouter>
        <CharacterCard {...mockCharacter} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId(`favorite-toggle-${mockCharacter.id}`)).toBeInTheDocument();
  });

  // Test that clicking the heart icon triggers the toggleFavorite function
  it('calls toggleFavorite on heart icon click', () => {
    const { toggleFavorite } = useCharactersStore();

    render(
      <BrowserRouter>
        <CharacterCard {...mockCharacter} />
      </BrowserRouter>,
    );

    const favoriteButton = screen.getByTestId(`favorite-toggle-${mockCharacter.id}`);
    fireEvent.click(favoriteButton);

    expect(toggleFavorite).toHaveBeenCalled();
  });

  // Test that the outline heart icon is shown when character is not favorite
  it('renders outline heart icon when character is not favorite', () => {
    (useCharactersStore as unknown as Mock).mockReturnValue({
      isFavorite: vi.fn(() => false),
      toggleFavorite: vi.fn(),
      characters: [{ ...mockCharacter, transformations: [] }],
    });

    render(
      <BrowserRouter>
        <CharacterCard {...mockCharacter} />
      </BrowserRouter>,
    );

    const icon = screen.getByTestId(`favorite-toggle-${mockCharacter.id}`).querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  // ToggleFavorite is called when the character is in the store
  it('Call toggleFavorite if character is found in the store', () => {
    const toggleFavorite = vi.fn();

    (useCharactersStore as unknown as Mock).mockReturnValue({
      isFavorite: vi.fn(() => true),
      toggleFavorite,
      characters: [{ ...mockCharacter, transformations: [] }],
    });

    render(
      <BrowserRouter>
        <CharacterCard id={11} name="Unknown" image="unknown.png" />
      </BrowserRouter>,
    );

    const heartIcon = screen.getByTestId('favorite-toggle-11');
    fireEvent.click(heartIcon);

    expect(toggleFavorite).toHaveBeenCalled();
  });
});
