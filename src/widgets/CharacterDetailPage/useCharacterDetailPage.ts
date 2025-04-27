import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCharactersStore } from '../../features/characters/model/useCharactersStore';
import useImagesLoaded from '../../shared/lib/hooks/useImagesLoaded';

export function useCharacterDetailPage() {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState(false);
  const [showBar, setShowBar] = useState(true);

  const character = useCharactersStore((state) => state.characters.find((c) => Number(c.id) === Number(id)));

  const memoCharacter = useMemo(() => character, [character]);

  const transformationImages = useMemo(() => {
    return memoCharacter?.transformations?.map((t) => t.image) || [];
  }, [memoCharacter]);

  const isNotFound = useMemo(() => !memoCharacter, [memoCharacter]);

  const imagesLoaded = useImagesLoaded([memoCharacter?.image, ...transformationImages].filter(Boolean) as string[]);

  useEffect(() => {
    const barTimer = setTimeout(() => setShowBar(false), 700);
    const detailTimer = setTimeout(() => {
      if (imagesLoaded) setShowDetail(true);
    }, 700);

    return () => {
      clearTimeout(barTimer);
      clearTimeout(detailTimer);
    };
  }, [imagesLoaded]);

  return {
    character: memoCharacter,
    showBar,
    showDetail,
    isNotFound,
  };
}
