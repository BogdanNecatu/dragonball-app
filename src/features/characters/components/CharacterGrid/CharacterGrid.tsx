import CharacterCard from "../CharacterCard/CharacterCard";
import styles from "./CharacterGrid.module.css";
import { Character } from "../../types";

interface Props {
  characters: Character[];
}

const CharacterGrid = ({ characters }: Props) => {
  return (
    <div className={styles.grid}>
      {characters.map((char: Character) => (
        <CharacterCard
          key={char.id}
          id={char.id}
          name={char.name}
          image={char.image}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
