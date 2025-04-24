import { NavLink, useLocation } from 'react-router-dom';
import { useCharactersStore } from '../../../features/characters/store/useCharactersStore';
import styles from './Header.module.css';
import dragonballLogo from '../../../assets/images/logo-dragon-ball-api.png';
import FilledHeartIcon from '../../../assets/icons/FilledHeartIcon';

const Header = () => {
  const location = useLocation();
  const favorites = useCharactersStore((state) => state.favorites);
  const isDetail = location.pathname.startsWith('/character/');

  return (
    <header className={`${styles.header} ${isDetail ? styles.borderBottom : ''}`}>
      <NavLink to="/" className={styles.logo}>
        <img
          src={dragonballLogo}
          alt="Dragon Ball Logo"
          draggable={false}
          className={styles.logo}
        />
      </NavLink>
      <NavLink to="/favorites">
        <FilledHeartIcon width={24} height={21.68} fill="#EC1D24" />
        <span className={styles.fav} data-testid="favorites-counter">
          {favorites.length}
        </span>
      </NavLink>
    </header>
  );
};

export default Header;
