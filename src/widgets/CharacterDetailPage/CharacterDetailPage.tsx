import CharacterDetail from '../../pages/CharacterDetail/CharacterDetail';
import { useCharacterDetailPage } from './useCharacterDetailPage';
import styles from './CharacterDetailPage.module.css';
import NotFoundCharacter from '../../entities/characters/ui/NotFoundCharacter/NotFoundCharacter';

export default function CharacterDetailPage() {
  const { character, showBar, showDetail, isNotFound } = useCharacterDetailPage();

  if (isNotFound) return <NotFoundCharacter />;

  return (
    <>
      {showBar && <div className={styles.animatedBar} aria-hidden="true" />}
      {showDetail && character && (
        <div className={styles.slideIn} role="main" aria-label="Character detail view">
          <CharacterDetail />
        </div>
      )}
    </>
  );
}
