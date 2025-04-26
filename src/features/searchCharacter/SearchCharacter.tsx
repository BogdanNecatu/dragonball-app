import { useDebounce } from '../../shared/lib/hooks/useDebounce';
import { useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/SearchIcon';
import styles from './SearchCharacter.module.css';

type Props = {
  search: string;
  onSearch: (value: string) => void;
  resultCount: number;
};

const SearchCharacter = ({ search, onSearch, resultCount }: Props) => {
  const [inputValue, setInputValue] = useState(search);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputGroup}>
        <SearchIcon className={styles.icon} />
        <input
          type="text"
          placeholder="SEARCH A CHARACTER..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
        />
      </div>
      <p className={styles.result} data-testid="result-count">
        {resultCount} RESULTS
      </p>
    </div>
  );
};

export default SearchCharacter;
