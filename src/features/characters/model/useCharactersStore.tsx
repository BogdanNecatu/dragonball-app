import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loadCharacters } from '../model/characterService';
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
        await loadCharacters(set, get);
      },
    }),
    {
      name: 'dragonball-storage',
    },
  ),
);
