import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCharacters } from './fetchCharacters';
import axiosInstance from '../../../shared/api/axiosInstance';

// Mock Axios instance
vi.mock('../../../shared/api/axiosInstance', () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockGet = axiosInstance.get as ReturnType<typeof vi.fn>;

describe('fetchCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch all pages and return detailed characters', async () => {
    // Mock first response with meta
    mockGet.mockResolvedValueOnce({
      data: {
        items: [{ id: '1' }, { id: '2' }],
        meta: {
          totalPages: 2,
        },
      },
    });

    // Mock page 2 response
    mockGet.mockResolvedValueOnce({
      data: {
        items: [{ id: '3' }],
      },
    });

    // Mock detailed responses
    mockGet.mockResolvedValueOnce({ data: { id: '1', name: 'Goku' } });
    mockGet.mockResolvedValueOnce({ data: { id: '2', name: 'Vegeta' } });
    mockGet.mockResolvedValueOnce({ data: { id: '3', name: 'Gohan' } });

    const result = await fetchCharacters();

    expect(result).toEqual([
      { id: '1', name: 'Goku' },
      { id: '2', name: 'Vegeta' },
      { id: '3', name: 'Gohan' },
    ]);
    expect(mockGet).toHaveBeenCalledTimes(5); // 1 inicial + 1 extra page + 3 detalles
  });

  it('should handle rejected page requests and still return successful details', async () => {
    // Initial
    mockGet.mockResolvedValueOnce({
      data: {
        items: [{ id: '1' }],
        meta: { totalPages: 2 },
      },
    });

    // Page 2 fails
    mockGet.mockRejectedValueOnce(new Error('Page 2 failed'));

    // Detalle
    mockGet.mockResolvedValueOnce({ data: { id: '1', name: 'Goku' } });

    const result = await fetchCharacters();

    expect(result).toEqual([{ id: '1', name: 'Goku' }]);
    expect(mockGet).toHaveBeenCalledTimes(3); // 1 primera, 1 page fallida, 1 detalle
  });

  it('should throw an error if initial request fails', async () => {
    mockGet.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchCharacters()).rejects.toThrow('Failed to fetch Dragon Ball characters');
  });
});
