import { shouldRefetch, updateLastFetch } from '../characterCacheService';
import { StoreState } from '../../../../entities/characters/types';
import { vi } from 'vitest';

describe('characterCacheService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers(); // Para controlar el tiempo en tests
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true if characters list is empty', () => {
    const fakeState = {
      characters: [],
      favorites: [],
      fetchCharacters: vi.fn(),
      setCharacters: vi.fn(),
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    } as unknown as StoreState;

    expect(shouldRefetch(fakeState)).toBe(true);
  });

  it('returns true if last fetch is older than 24h', () => {
    const now = Date.now();
    localStorage.setItem('lastFetch', (now - 25 * 60 * 60 * 1000).toString()); // 25 horas atrás

    const fakeState = {
      characters: [{ id: 1, name: 'Goku', image: 'goku.png', transformations: [] }],
      favorites: [],
      fetchCharacters: vi.fn(),
      setCharacters: vi.fn(),
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    } as unknown as StoreState;

    expect(shouldRefetch(fakeState)).toBe(true);
  });

  it('returns false if last fetch is within 24h and characters are loaded', () => {
    const now = Date.now();
    localStorage.setItem('lastFetch', now.toString());

    const fakeState = {
      characters: [{ id: 1, name: 'Goku', image: 'goku.png', transformations: [] }],
      favorites: [],
      fetchCharacters: vi.fn(),
      setCharacters: vi.fn(),
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(),
    } as unknown as StoreState;

    expect(shouldRefetch(fakeState)).toBe(false);
  });

  it('updateLastFetch stores the current timestamp', () => {
    updateLastFetch();
    const stored = localStorage.getItem('lastFetch');
    expect(Number(stored)).toBeGreaterThan(0);
  });
});
