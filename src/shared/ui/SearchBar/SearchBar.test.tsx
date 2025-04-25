import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import SearchBar from './SearchBar';

// Renders input and result counter correctly
it('renders input with placeholder and result count', () => {
  render(<SearchBar search="" onSearch={() => {}} resultCount={5} />);

  expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toBeInTheDocument();
  expect(screen.getByTestId('result-count')).toHaveTextContent('5 RESULTS');
});

// Calls onSearch when typing into input
it('calls onSearch with correct value when input changes', () => {
  const handleSearch = vi.fn();

  render(<SearchBar search="" onSearch={handleSearch} resultCount={0} />);

  const input = screen.getByPlaceholderText('SEARCH A CHARACTER...');
  fireEvent.change(input, { target: { value: 'Goku' } });

  expect(handleSearch).toHaveBeenCalledWith('Goku');
});
