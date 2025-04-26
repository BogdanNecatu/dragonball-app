import { StoreState } from '../../../entities/characters/types';

const CACHE_KEY = 'lastFetch';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Check if we should refetch characters based on time and current state
 */
export const shouldRefetch = (state: StoreState): boolean => {
  const now = Date.now();
  const lastFetch = Number(localStorage.getItem(CACHE_KEY)) || 0;
  const isStale = now - lastFetch > CACHE_DURATION_MS;
  const isEmpty = state.characters.length === 0;
  return isStale || isEmpty;
};

/**
 * Update the last fetch timestamp
 */
export const updateLastFetch = () => {
  localStorage.setItem(CACHE_KEY, Date.now().toString());
};
