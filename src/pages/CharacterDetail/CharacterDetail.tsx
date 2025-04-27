import FilledHeartIcon from '../../assets/icons/FilledHeartIcon';
import OutlineHeartIcon from '../../assets/icons/OutlineHeartIcon';
import { useCharacterDetail } from './useCharacterDetail';
import styles from './CharacterDetail.module.css';

export default function CharacterDetail() {
  const { character, fav, toggleFavorite, scrollRef, sortedTransformations } = useCharacterDetail();

  if (!character) return <p className="p-4">Personaje no encontrado.</p>;

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <img src={character.image} alt={character.name} draggable={false} className={styles.characterImage} />
          <div className={styles.characterInfo}>
            <div className={styles.characterName}>
              <h1 className={styles.name} data-testid="character-name">
                {character.name.toUpperCase()}
              </h1>
              <span
                role="button"
                aria-pressed={fav}
                aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                onClick={(e) => {
                  e.preventDefault();
                  character && toggleFavorite(character);
                }}
                data-testid={`favorite-toggle-${character?.id}`}
              >
                {fav ? (
                  <FilledHeartIcon width={24} height={21.68} fill="#EC1D24" />
                ) : (
                  <OutlineHeartIcon width={24} height={21.68} />
                )}
              </span>
            </div>

            <p className={styles.description} data-testid="character-description">
              {character.description}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.transformations}>
        <div className={styles.transformationsInner}>
          <h2 data-testid="transformation">TRANSFORMATIONS</h2>
          <div className={styles.scrollWrapper}>
            <div
              className={styles.scrollContainer}
              ref={scrollRef}
              role="list"
              aria-label="List of character transformations"
            >
              {sortedTransformations.length > 0 ? (
                sortedTransformations.map((t) => (
                  <div key={t.id} className={styles.card} data-testid="transformation-card" role="listitem">
                    <img src={t.image} alt={t.name} draggable={false} className={styles.transformationImage} />
                    <div className={styles.cardInfo}>
                      <p className={styles.cardTitle} data-testid="transformation-name">
                        {t.name}
                      </p>
                      <p className={styles.cardKi} data-testid="transformation-ki">
                        Ki: {t.ki}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noTransformations}>This character has no recorded transformations.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
