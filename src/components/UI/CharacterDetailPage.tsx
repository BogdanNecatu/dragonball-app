import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCharactersStore } from "../../store/useCharactersStore";
import useImagesLoaded from "../../hooks/useImagesLoaded";
import CharacterDetail from "../../pages/CharacterDetail";
import styles from "./CharacterDetailPage.module.css";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [showDetail, setShowDetail] = useState(false);
  const [showBar, setShowBar] = useState(true);

  const character = useCharactersStore((s) =>
    s.characters.find((c) => Number(c.id) === Number(id))
  );

  const transformationImages =
    character?.transformations?.map((t) => t.image) || [];

  const imagesLoaded = useImagesLoaded(
    [character?.image, ...transformationImages].filter(Boolean) as string[]
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

  return (
    <>
      {showBar && <div className={styles.animatedBar} />}
      {showDetail && character && (
        <div className={styles.slideIn}>
          <CharacterDetail />
        </div>
      )}
    </>
  );
}
