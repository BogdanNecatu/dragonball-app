import { useState } from "react";
import SearchBar from "../../shared/ui/SearchBar/SearchBar";
import CharacterGrid from "../../features/characters/components/CharacterGrid/CharacterGrid";
import { useCharactersStore } from "../../features/characters/store/useCharactersStore";
import useImagesLoaded from "../../shared/common/hooks/useImagesLoaded";
import { Character } from "../../features/characters/types";
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
