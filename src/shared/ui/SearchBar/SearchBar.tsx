import SearchIcon from "../../../assets/icons/SearchIcon";
import styles from "./SearchBar.module.css";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  resultCount: number;
};

const SearchBar = ({ search, onSearch, resultCount }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputGroup}>
        <SearchIcon className={styles.icon} />
        <input
          type="text"
          placeholder="SEARCH A CHARACTER..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className={styles.input}
        />
      </div>
      <p className={styles.result}>{resultCount} RESULTS</p>
    </div>
  );
};

export default SearchBar;
