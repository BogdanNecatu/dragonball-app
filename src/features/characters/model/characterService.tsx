import { fetchCharacters } from '../api/fetchCharacters';
import { shouldRefetch, updateLastFetch } from './characterCacheService';
import { StoreState } from '../../../entities/characters/types';

export const loadCharacters = async (set: (state: Partial<StoreState>) => void, get: () => StoreState) => {
  if (!shouldRefetch(get())) {
    return; // No need to refetch
  }

  try {
    const characters = await fetchCharacters();
    set({ characters });
    updateLastFetch();
  } catch (error) {
    console.error('❌ Error loading characters in service:', error);
    throw error;
  }
};
