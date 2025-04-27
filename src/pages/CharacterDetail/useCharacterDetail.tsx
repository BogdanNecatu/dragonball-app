import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCharactersStore } from '../../features/characters/model/useCharactersStore';
import { useHorizontalScroll } from '../../shared/lib/hooks/useHorizontalScroll';
import { sortTransformationsByKi } from '../../features/characters/utils/transformationDetails';
import { Transformation } from '../../entities/characters/types';

export function useCharacterDetail() {
  const { id } = useParams();
  const scrollRef = useHorizontalScroll<HTMLDivElement>();
  const { toggleFavorite, isFavorite } = useCharactersStore();

  const character = useCharactersStore((state) => state.characters.find((c) => Number(c.id) === Number(id)));

  const memoCharacter = useMemo(() => character, [character]);

  const sortedTransformations: Transformation[] = useMemo(() => {
    if (!memoCharacter?.transformations) return [];
    return sortTransformationsByKi(memoCharacter.transformations);
  }, [memoCharacter]);

  const fav = isFavorite(Number(id));

  return {
    character: memoCharacter,
    fav,
    toggleFavorite,
    scrollRef,
    sortedTransformations,
  };
}
