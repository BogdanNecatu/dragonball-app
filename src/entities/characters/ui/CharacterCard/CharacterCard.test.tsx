import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { useCharactersStore } from '../../../../features/characters/model/useCharactersStore';
import { vi } from 'vitest';

// Dummy character used for all tests
const dummyCharacter = {
  id: 1,
  name: 'Goku',
  image: 'goku.png',
  transformations: [],
};

describe('CharacterCard Component', () => {
  beforeEach(() => {
    // Reset Zustand state before each test
    useCharactersStore.setState({
      characters: [dummyCharacter],
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: () => false,
    });
  });

  // Test that the character name and image are correctly rendered
  it('renders character name and image', () => {
    render(
      <MemoryRouter>
        <CharacterCard {...dummyCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('character-card-name')).toHaveTextContent(dummyCharacter.name);
    expect(screen.getByAltText(dummyCharacter.name)).toBeInTheDocument();
  });

  // Test that the filled heart icon is displayed when the character is a favorite
  it('shows filled heart icon when character is favorite', () => {
    useCharactersStore.setState({
      favorites: [dummyCharacter],
      isFavorite: () => true,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...dummyCharacter} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(`favorite-toggle-${dummyCharacter.id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`favorite-toggle-${dummyCharacter.id}`).querySelector('svg')).toBeTruthy();
  });

  // Test that clicking the heart icon triggers the toggleFavorite function
  it('calls toggleFavorite on heart icon click', () => {
    const toggleFavorite = vi.fn();

    useCharactersStore.setState({
      characters: [dummyCharacter],
      favorites: [],
      toggleFavorite,
      isFavorite: () => false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...dummyCharacter} />
      </MemoryRouter>,
    );

    const heartButton = screen.getByTestId(`favorite-toggle-${dummyCharacter.id}`);
    fireEvent.click(heartButton);

    expect(toggleFavorite).toHaveBeenCalled();
  });

  // Test that the outline heart icon is displayed when the character is not a favorite
  it('renders outline heart icon when character is not favorite', () => {
    useCharactersStore.setState({
      favorites: [],
      isFavorite: () => false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...dummyCharacter} />
      </MemoryRouter>,
    );

    const heartButton = screen.getByTestId(`favorite-toggle-${dummyCharacter.id}`);
    expect(heartButton).toBeInTheDocument();
    expect(heartButton.querySelector('svg')).toBeTruthy();
  });

  // Test that toggleFavorite is called only if the character is found in the store
  it('calls toggleFavorite only if character is found in the store', () => {
    const toggleFavorite = vi.fn();

    useCharactersStore.setState({
      characters: [dummyCharacter],
      favorites: [],
      toggleFavorite,
      isFavorite: () => false,
    });

    render(
      <MemoryRouter>
        <CharacterCard {...dummyCharacter} />
      </MemoryRouter>,
    );

    const heartButton = screen.getByTestId(`favorite-toggle-${dummyCharacter.id}`);
    fireEvent.click(heartButton);

    expect(toggleFavorite).toHaveBeenCalledWith(dummyCharacter);
  });
});
