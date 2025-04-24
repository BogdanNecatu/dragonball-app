import CharacterDetail from "../../../features/characters/pages/CharacterDetail/CharacterDetail";
import { useCharacterDetailPage } from "./useCharacterDetailPage";
import styles from "./CharacterDetailPage.module.css";

export default function CharacterDetailPage() {
  const { character, showBar, showDetail } = useCharacterDetailPage();

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
