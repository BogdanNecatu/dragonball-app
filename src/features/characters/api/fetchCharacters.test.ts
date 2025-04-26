import { fetchCharacters } from './fetchCharacters';
import axiosInstance from '../../../shared/api/axiosInstance';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('@/shared/api/axiosInstance');

const mockAxios = axiosInstance as unknown as {
  get: ReturnType<typeof vi.fn>;
};

const baseCharacters = [
  { id: 1, name: 'Goku', image: 'goku.png', transformations: [] },
  { id: 2, name: 'Vegeta', image: 'vegeta.png', transformations: [] },
  { id: 3, name: 'Piccolo', image: 'piccolo.png', transformations: [] },
];

const detailedCharacters = baseCharacters.map((char) => ({
  ...char,
  race: 'Saiyan',
  gender: 'Male',
  transformations: [{ id: 1, name: 'Super Saiyan', image: 'ssj.png', ki: '10000', deletedAt: null }],
}));

describe('fetchCharacters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches all characters and their details successfully', async () => {
    mockAxios.get = vi
      .fn()
      // Primera llamada a "/"
      .mockResolvedValueOnce({
        data: {
          items: baseCharacters,
          meta: { totalPages: 1 },
        },
      })
      // Segundas llamadas a "/character/:id"
      .mockResolvedValueOnce({ data: detailedCharacters[0] })
      .mockResolvedValueOnce({ data: detailedCharacters[1] })
      .mockResolvedValueOnce({ data: detailedCharacters[2] });

    const result = await fetchCharacters();

    expect(mockAxios.get).toHaveBeenCalledWith('1');
    expect(mockAxios.get).toHaveBeenCalledWith('2');
    expect(mockAxios.get).toHaveBeenCalledWith('3');

    expect(result).toHaveLength(3);
    expect(result[0].transformations.length).toBeGreaterThan(0);
  });

  it('handles failed page requests but continues loading', async () => {
    mockAxios.get = vi
      .fn()
      // Primera llamada a "/"
      .mockResolvedValueOnce({
        data: {
          items: baseCharacters,
          meta: { totalPages: 3 },
        },
      })
      // Fallo en una página
      .mockRejectedValueOnce(new Error('Page 2 failed'))
      .mockResolvedValueOnce({ data: { items: [] } })
      // Segundas llamadas a detalles
      .mockResolvedValueOnce({ data: detailedCharacters[0] })
      .mockResolvedValueOnce({ data: detailedCharacters[1] })
      .mockResolvedValueOnce({ data: detailedCharacters[2] });

    const result = await fetchCharacters();

    expect(result).toHaveLength(3);
  });

  it('throws if first page fails', async () => {
    mockAxios.get = vi.fn().mockRejectedValueOnce(new Error('API down'));

    await expect(fetchCharacters()).rejects.toThrow('Failed to fetch characters from API');
  });

  it('throws if all detail fetching fails', async () => {
    mockAxios.get = vi
      .fn()
      .mockResolvedValueOnce({
        data: {
          items: baseCharacters,
          meta: { totalPages: 1 },
        },
      })
      // Todos los detalles fallan
      .mockRejectedValue(new Error('Detail API down'));

    await expect(fetchCharacters()).rejects.toThrow('Failed to fetch detailed character information');
  });
});
