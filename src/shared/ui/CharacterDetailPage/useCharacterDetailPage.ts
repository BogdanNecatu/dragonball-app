import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCharactersStore } from '../../../features/characters/store/useCharactersStore';
import useImagesLoaded from '../../common/hooks/useImagesLoaded';

export function useCharacterDetailPage() {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState(false);
  const [showBar, setShowBar] = useState(true);

  const character = useCharactersStore((s) =>
    s.characters.find((c) => Number(c.id) === Number(id)),
  );

  const transformationImages = character?.transformations?.map((t) => t.image) || [];

  const imagesLoaded = useImagesLoaded(
    [character?.image, ...transformationImages].filter(Boolean) as string[],
  );

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
    character,
    showBar,
    showDetail,
  };
}
