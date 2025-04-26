export interface StoreState {
  characters: Character[];
  favorites: Character[];
  setCharacters: (characters: Character[]) => void;
  toggleFavorite: (character: Character) => void;
  isFavorite: (id: number) => boolean;
  fetchCharacters: () => void;
}
export interface Character {
  id: number;
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

export type Transformation = {
  id: number;
  name: string;
  image: string;
  ki: string;
  deletedAt: string | null;
};
