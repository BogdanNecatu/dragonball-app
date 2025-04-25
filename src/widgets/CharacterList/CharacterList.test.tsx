import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CharacterList from './CharacterLis';
import { Character } from '../../entities/characters/types';
import { BrowserRouter } from 'react-router-dom';

// Mock characters to render
const mockCharacters: Character[] = [
  { id: 1, name: 'Goku', image: 'goku.png', transformations: [] },
  { id: 2, name: 'Vegeta', image: 'vegeta.png', transformations: [] },
];

describe('CharacterList component', () => {
  it('renders a grid with CharacterCard components', () => {
    render(
      <BrowserRouter>
        <CharacterList characters={mockCharacters} />
      </BrowserRouter>,
    );

    const cards = screen.getAllByTestId('character-card');

    expect(cards).toHaveLength(mockCharacters.length);
    expect(cards[0]).toHaveTextContent('Goku');
    expect(cards[1]).toHaveTextContent('Vegeta');
  });

  it('renders empty grid when characters array is empty', () => {
    render(
      <BrowserRouter>
        <CharacterList characters={[]} />
      </BrowserRouter>,
    );

    const cards = screen.queryAllByTestId('character-card');
    expect(cards).toHaveLength(0);
  });
});
