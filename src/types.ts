export interface Character {
  id: string;
  name: string;
  image: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
  description?: string;
  race?: string;
  gender?: string;
  ki?: number;
  maxKi?: number;
  transformations: Transformation[] | [];
}

export interface StoreState {
  characters: Character[];
  favorites: Character[];
  setCharacters: (characters: Character[]) => void;
  toggleFavorite: (character: Character) => void;
  isFavorite: (id: string) => boolean;
  fetchCharacters: () => void;
}

export type Transformation = {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: string | null;
};
