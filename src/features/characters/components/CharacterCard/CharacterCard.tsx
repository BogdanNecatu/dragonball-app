import FilledHeartIcon from '../../../../assets/icons/FilledHeartIcon';
import OutlineHeartIcon from '../../../../assets/icons/OutlineHeartIcon';
import { Link } from 'react-router-dom';
import { useCharactersStore } from '../../store/useCharactersStore';
import styles from './CharacterCard.module.css';

type Props = {
  id: number;
  name: string;
  image: string;
};

const CharacterCard = ({ id, name, image }: Props) => {
  const { toggleFavorite, isFavorite } = useCharactersStore();
  const fav = isFavorite(id);

  const character = useCharactersStore((state) => state.characters.find((c) => c.id === id));

  return (
    <Link to={`/character/${id}`} className={styles.card} data-testid="character-card">
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} draggable={false} />
        <div className={`${styles.footer} ${fav ? styles.favorite : ''}`}>
          <div className={styles.nameWrapper}>
            <span className={styles.name} data-testid="character-card-name">
              {name}
            </span>
            <span
              data-testid={`favorite-toggle-${id}`}
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

export default CharacterCard;
