import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CharacterGrid from "../components/CharacterGrid";
import { useCharactersStore } from "../store/useCharactersStore";
import useImagesLoaded from "../hooks/useImagesLoaded";
import { Character } from "../types";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { favorites } = useCharactersStore();
  const [search, setSearch] = useState("");

  const filtered = favorites.filter((char: Character) =>
    char.name.toLowerCase().split(" ")[0].startsWith(search.toLowerCase())
  );

  const imageUrls = filtered.map((char) => char.image);
  const allImagesLoaded = useImagesLoaded(imageUrls);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>FAVORITES</h1>
      <main
        className={`${styles.main} ${allImagesLoaded ? styles.loaded : ""}`}
      >
        {allImagesLoaded ? (
          <>
            <SearchBar
              search={search}
              onSearch={setSearch}
              resultCount={filtered.length}
            />
            <CharacterGrid characters={filtered} />
          </>
        ) : (
          <div className={styles.loadingBar}></div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
