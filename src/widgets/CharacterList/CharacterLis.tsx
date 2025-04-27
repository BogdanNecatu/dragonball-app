import CharacterCard from '../../entities/characters/ui/CharacterCard/CharacterCard';
import styles from './CharacterList.module.css';
import { Character } from '../../entities/characters/types';

interface Props {
  characters: Character[];
}

const CharacterList = ({ characters }: Props) => {
  return (
    <div className={styles.grid} role="list" aria-label="List of Dragon Ball characters">
      {characters.map((char: Character) => (
        <CharacterCard key={char.id} id={char.id} name={char.name} image={char.image} />
      ))}
    </div>
  );
};

export default CharacterList;
