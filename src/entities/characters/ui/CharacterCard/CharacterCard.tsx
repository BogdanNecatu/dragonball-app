import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FilledHeartIcon from '../../../../assets/icons/FilledHeartIcon';
import OutlineHeartIcon from '../../../../assets/icons/OutlineHeartIcon';
import { useCharactersStore } from '../../../../features/characters/model/useCharactersStore';
import styles from './CharacterCard.module.css';

type Props = {
  id: number;
  name: string;
  image: string;
};

const CharacterCard = ({ id, name, image }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useCharactersStore();
  const fav = isFavorite(id);

  const character = useCharactersStore((state) => state.characters.find((c) => c.id === id));

  return (
    <Link
      to={`/character/${id}`}
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      role="link"
      aria-label={`View details about ${name}`}
      data-testid="character-card"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerCancel={() => setIsHovered(false)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} draggable={false} />
        <div className={`${styles.footer} ${fav ? styles.favorite : ''}`}>
          <div className={styles.nameWrapper}>
            <span className={styles.name} data-testid="character-card-name">
              {name}
            </span>
            <span
              data-testid={`favorite-toggle-${id}`}
              role="button"
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={fav}
              onClick={(e) => {
                e.preventDefault();
                character && toggleFavorite(character);
              }}
            >
              {fav ? <FilledHeartIcon width={12} height={10.84} fill="#EC1D24" /> : <OutlineHeartIcon />}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(CharacterCard);
