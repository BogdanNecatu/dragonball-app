import { NavLink, useLocation } from "react-router-dom";
import { useCharactersStore } from "../../../features/characters/store/useCharactersStore";
import styles from "./Header.module.css";
import dragonballLogo from "../../../assets/images/logo-dragon-ball-api.png";

const Header = () => {
  const location = useLocation();
  const favorites = useCharactersStore((state) => state.favorites);
  const isDetail = location.pathname.startsWith("/character/");

  return (
    <header
      className={`${styles.header} ${isDetail ? styles.borderBottom : ""}`}
    >
      <NavLink to="/" className={styles.logo}>
        <img
          src={dragonballLogo}
          alt="Dragon Ball Logo"
          className={styles.logo}
        />
      </NavLink>
      <NavLink to="/favorites">
        <svg
          width="24"
          height="21.68"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z"
            fill="#EC1D24"
          />
        </svg>
        <span className={styles.fav}>{favorites.length}</span>
      </NavLink>
    </header>
  );
};

export default Header;
