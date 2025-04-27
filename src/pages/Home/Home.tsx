import { useState, useEffect, useMemo } from 'react';
import SearchCharacter from '../../features/searchCharacter/SearchCharacter';
import CharacterList from '../../widgets/CharacterList/CharacterLis';
import { useCharactersStore } from '../../features/characters/model/useCharactersStore';
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

  const filtered = useMemo(() => {
    return characters.filter((char: Character) =>
      char.name.toLowerCase().split(' ')[0].startsWith(search.toLowerCase()),
    );
  }, [characters, search]);

  const imageUrls = filtered.map((char) => char.image);
  const allImagesLoaded = useImagesLoaded(imageUrls);

  return (
    <main className={`${styles.main} ${allImagesLoaded ? styles.loaded : ''}`} aria-label="Dragon Ball characters list">
      {error ? (
        <div className={styles.errorMessage}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} aria-label="Retry loading characters">
            Reintentar
          </button>
        </div>
      ) : allImagesLoaded ? (
        <>
          <SearchCharacter search={search} onSearch={setSearch} resultCount={filtered.length} />
          <CharacterList characters={filtered} />
        </>
      ) : (
        <div className={styles.loadingBar} role="status" aria-live="polite" aria-label="Loading characters"></div>
      )}
    </main>
  );
};

export default Home;
