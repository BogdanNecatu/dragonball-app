import { useState } from 'react';
import SearchCharacter from '../../features/searchCharacter/SearchCharacter';
import CharacterList from '../../widgets/CharacterList/CharacterLis';
import { useCharactersStore } from '../../features/characters/model/useCharactersStore';
import useImagesLoaded from '../../shared/lib/hooks/useImagesLoaded';
import { Character } from '../../entities/characters/types';
import styles from './Favorites.module.css';

const Favorites = () => {
  const { favorites } = useCharactersStore();
  const [search, setSearch] = useState('');

  const filtered = favorites.filter((char: Character) =>
    char.name.toLowerCase().split(' ')[0].startsWith(search.toLowerCase()),
  );

  const imageUrls = filtered.map((char) => char.image);
  const allImagesLoaded = useImagesLoaded(imageUrls);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title} data-testid="favorites-name">
        FAVORITES
      </h1>
      <main className={`${styles.main} ${allImagesLoaded ? styles.loaded : ''}`}>
        {allImagesLoaded ? (
          <>
            <SearchCharacter search={search} onSearch={setSearch} resultCount={filtered.length} />
            <CharacterList characters={filtered} />
          </>
        ) : (
          <div className={styles.loadingBar}></div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
