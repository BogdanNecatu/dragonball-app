import axiosInstance from '../../../shared/api/axiosInstance';
import { Character } from '../../../entities/characters/types';

/**
 * Fetch all paginated characters from the API.
 * Tries to load the first page (required), then loads remaining in parallel.
 */
const getAllCharactersPages = async (): Promise<Character[]> => {
  const allCharacters: Character[] = [];

  try {
    // First request (critical)
    const firstResponse = await axiosInstance.get('');
    const { items, meta } = firstResponse.data;

    allCharacters.push(...items);

    // Prepare additional page requests
    const totalPages = meta.totalPages;
    const requests = [];

    for (let i = 2; i <= totalPages; i++) {
      requests.push(axiosInstance.get(`?page=${i}`));
    }

    // Run all in parallel, don't stop if one fails
    const responses = await Promise.allSettled(requests);

    responses.forEach((res) => {
      if (res.status === 'fulfilled') {
        allCharacters.push(...res.value.data.items);
      } else {
        console.warn(`⚠️ Failed to load page:`, res.reason);
      }
    });
  } catch (err) {
    console.error('❌ Error loading first page of characters:', err);
    throw new Error('Failed to fetch characters from API');
  }

  return allCharacters;
};

/**
 * For each character in the limited list, fetch its full detail.
 */
const getDetailedCharacters = async (characters: Character[]): Promise<Character[]> => {
  const limited = characters.slice(0, 50);
  const detailedRequests = limited.map((char) => axiosInstance.get(`${char.id}`));

  try {
    const detailedResponses = await Promise.allSettled(detailedRequests);

    const successfulDetails = detailedResponses
      .filter((res) => res.status === 'fulfilled')
      .map((res: any) => res.value.data);

    if (successfulDetails.length === 0) {
      throw new Error('Failed to fetch detailed character information');
    }

    return successfulDetails;
  } catch (err) {
    console.error('❌ Error fetching detailed character info:', err);
    throw new Error('Failed to fetch detailed character information');
  }
};

/**
 * Public function used by the service/store layer.
 * Combines list loading + details.
 */
export const fetchCharacters = async (): Promise<Character[]> => {
  const allCharacters = await getAllCharactersPages();
  const detailedCharacters = await getDetailedCharacters(allCharacters);
  return detailedCharacters;
};
