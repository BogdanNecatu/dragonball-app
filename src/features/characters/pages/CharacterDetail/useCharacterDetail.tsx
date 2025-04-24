// src/components/UI/CharacterDetail/useCharacterDetail.ts
import { useParams } from 'react-router-dom';
import { useCharactersStore } from '../../store/useCharactersStore';
import { useHorizontalScroll } from '../../../../shared/common/hooks/useHorizontalScroll';

const parseKi = (kiString: string): number => {
  const units: Record<string, number> = {
    Million: 1e6,
    Billion: 1e9,
    Trillion: 1e12,
    Quadrillion: 1e15,
    Quintillion: 1e18,
    Sextillion: 1e21,
    Septillion: 1e24,
  };

  if (!kiString.includes(' ')) {
    const numeric = parseFloat(kiString.replace(/\./g, '').replace(/,/g, ''));
    return isNaN(numeric) ? 0 : numeric;
  }

  const [numberPart, unit] = kiString.split(' ');
  const cleaned = numberPart.replace(/[\.,]/g, '');
  const base = parseFloat(cleaned);
  const multiplier = units[unit] || 1;

  return isNaN(base) ? 0 : base * multiplier;
};

export function useCharacterDetail() {
  const { id } = useParams();
  const scrollRef = useHorizontalScroll<HTMLDivElement>();
  const { toggleFavorite, isFavorite } = useCharactersStore();

  const character = useCharactersStore((state) =>
    state.characters.find((c) => Number(c.id) === Number(id)),
  );

  const sortedTransformations =
    character?.transformations
      ?.slice()
      .sort((a, b) => parseKi(a.ki) - parseKi(b.ki)) || [];

  const fav = isFavorite(Number(id));

  return {
    character,
    fav,
    toggleFavorite,
    scrollRef,
    sortedTransformations,
  };
}
