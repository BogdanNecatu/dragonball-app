import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CharacterGrid from "../components/CharacterGrid";
import { useCharactersStore } from "../store/useCharactersStore";
import { Character } from "../types";

const Favorites = () => {
  const { favorites } = useCharactersStore();
  const [search, setSearch] = useState("");

  const filtered = favorites.filter((char: Character) =>
    char.name.toLowerCase().split(" ")[0].startsWith(search.toLowerCase())
  );

  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-4">FAVORITES</h1>
      <SearchBar
        search={search}
        onSearch={setSearch}
        resultCount={filtered.length}
      />
      <CharacterGrid characters={filtered} />
    </main>
  );
};

export default Favorites;
