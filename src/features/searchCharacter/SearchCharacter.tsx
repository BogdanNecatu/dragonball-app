import { useDebounce } from '../../shared/lib/hooks/useDebounce';
import { useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/SearchIcon';
import styles from './SearchCharacter.module.css';
import React from 'react';

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
          className={styles.input}
          type="text"
          placeholder="SEARCH A CHARACTER..."
          spellCheck="false"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          role="searchbox"
          aria-label="Search a Dragon Ball character"
        />
      </div>
      <p className={styles.result} data-testid="result-count">
        {resultCount} RESULTS
      </p>
    </div>
  );
};

export default React.memo(SearchCharacter);
