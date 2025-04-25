import { useState, useEffect } from 'react';
import SearchCharacter from '../../features/searchCharacter/SearchCharacter';
import CharacterList from '../../widgets/CharacterList/CharacterLis';
import { useCharactersStore } from '../../features/characters/store/useCharactersStore';
import useImagesLoaded from '../../shared/lib/hooks/useImagesLoaded';
import { Character } from '../../entities/characters/types';
import styles from './Home.module.css';

const Home = () => {
  const { characters, fetchCharacters } = useCharactersStore();
  const [search, setSearch] = useState('');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCharacters();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    fetchData();
  }, [fetchCharacters]);

  const filtered = characters.filter((char: Character) =>
    char.name.toLowerCase().split(' ')[0].startsWith(search.toLowerCase()),
  );

  const imageUrls = filtered.map((char) => char.image);
  const allImagesLoaded = useImagesLoaded(imageUrls);

  return (
    <main className={`${styles.main} ${allImagesLoaded ? styles.loaded : ''}`}>
      {error ? (
        <div className={styles.errorMessage}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      ) : allImagesLoaded ? (
        <>
          <SearchCharacter search={search} onSearch={setSearch} resultCount={filtered.length} />
          <CharacterList characters={filtered} />
        </>
      ) : (
        <div className={styles.loadingBar}></div>
      )}
    </main>
  );
};

export default Home;
