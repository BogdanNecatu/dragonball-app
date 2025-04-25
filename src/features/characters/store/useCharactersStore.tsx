import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchCharacters as fetchDragonBallCharacters } from '../api/fetchCharacters';
import { StoreState } from '../../../entities/characters/types';

export const useCharactersStore = create<StoreState>()(
  persist(
    (set, get) => ({
      characters: [],
      favorites: [],
      setCharacters: (characters) => set({ characters }),
      toggleFavorite: (character) => {
        const exists = get().favorites.some((fav) => fav.id === character.id);
        if (exists) {
          set({
            favorites: get().favorites.filter((f) => f.id !== character.id),
          });
        } else {
          const fullCharacter = get().characters.find((c) => c.id === character.id);
          if (fullCharacter) {
            set({ favorites: [...get().favorites, fullCharacter] });
          }
        }
      },
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
      fetchCharacters: async () => {
        const now = Date.now();
        const lastFetch = Number(localStorage.getItem('lastFetch')) || 0;
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (now - lastFetch < twentyFourHours && get().characters.length > 0) return;

        try {
          const characters = await fetchDragonBallCharacters();
          set({ characters });
          localStorage.setItem('lastFetch', now.toString());
        } catch (e) {
          console.error('Error fetching Dragon Ball characters:', e);
          throw e;
        }
      },
    }),
    {
      name: 'dragonball-storage',
    },
  ),
);
