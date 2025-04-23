import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CharacterGrid from "../components/CharacterGrid";
import { useCharactersStore } from "../store/useCharactersStore";
import { Character } from "../types";
import styles from "./Home.module.css";

const Home = () => {
  const { characters, fetchCharacters } = useCharactersStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const filtered = characters.filter((char: Character) =>
    char.name.toLowerCase().split(" ")[0].startsWith(search.toLowerCase())
  );

  return (
    <main className={styles.main}>
      <SearchBar
        search={search}
        onSearch={setSearch}
        resultCount={filtered.length}
      />
      <CharacterGrid characters={filtered} />
    </main>
  );
};

export default Home;
