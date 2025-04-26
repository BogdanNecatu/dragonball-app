import { describe, it, expect, vi } from 'vitest';
import { loadCharacters } from '../characterService';
import { fetchCharacters } from '../../api/fetchCharacters';
import { shouldRefetch, updateLastFetch } from '../characterCacheService';
import { StoreState, Character } from '../../../../entities/characters/types';

vi.mock('../../api/fetchCharacters', () => ({
  fetchCharacters: vi.fn(),
}));

vi.mock('../characterCacheService', () => ({
  shouldRefetch: vi.fn(),
  updateLastFetch: vi.fn(),
}));

describe('loadCharacters', () => {
  const setMock = vi.fn<(state: Partial<StoreState>) => void>();
  const getMock = vi.fn<() => StoreState>(() => ({
    characters: [],
    favorites: [],
    setCharacters: vi.fn(),
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
    fetchCharacters: vi.fn(),
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not fetch characters if shouldRefetch returns false', async () => {
    vi.mocked(shouldRefetch).mockReturnValue(false);

    await loadCharacters(setMock, getMock);

    expect(fetchCharacters).not.toHaveBeenCalled();
    expect(setMock).not.toHaveBeenCalled();
    expect(updateLastFetch).not.toHaveBeenCalled();
  });

  it('should fetch characters and update store when shouldRefetch returns true', async () => {
    const mockCharacters: Character[] = [{ id: 1, name: 'Goku', image: 'goku.jpg', transformations: [] }];

    vi.mocked(shouldRefetch).mockReturnValue(true);
    vi.mocked(fetchCharacters).mockResolvedValue(mockCharacters);

    await loadCharacters(setMock, getMock);

    expect(fetchCharacters).toHaveBeenCalled();
    expect(setMock).toHaveBeenCalledWith({ characters: mockCharacters });
    expect(updateLastFetch).toHaveBeenCalled();
  });

  it('should handle errors when fetchCharacters fails', async () => {
    const error = new Error('Network failure');

    vi.mocked(shouldRefetch).mockReturnValue(true);
    vi.mocked(fetchCharacters).mockRejectedValue(error);

    await expect(loadCharacters(setMock, getMock)).rejects.toThrow(error);

    expect(fetchCharacters).toHaveBeenCalled();
    expect(setMock).not.toHaveBeenCalled();
    expect(updateLastFetch).not.toHaveBeenCalled();
  });
});
