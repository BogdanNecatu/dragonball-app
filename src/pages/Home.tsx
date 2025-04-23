import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CharacterGrid from "../components/CharacterGrid";
import { useCharactersStore } from "../store/useCharactersStore";
import { Character } from "@types";

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
    <main className="w-full max-w-7xl mx-auto">
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
