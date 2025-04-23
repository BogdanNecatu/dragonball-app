import styles from "./CharacterDetail.module.css";
import { useParams } from "react-router-dom";
import { useCharactersStore } from "../store/useCharactersStore";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

export default function CharacterDetail() {
  const { toggleFavorite, isFavorite } = useCharactersStore();
  const { id } = useParams();
  const scrollRef = useHorizontalScroll<HTMLDivElement>();

  const character = useCharactersStore((state) =>
    state.characters.find((c) => Number(c.id) === Number(id))
  );

  if (!character) return <p className="p-4">Personaje no encontrado.</p>;

  const fav = id ? isFavorite(id) : false;

  const parseKi = (kiString: string): number => {
    const units: Record<string, number> = {
      Million: 1e6,
      Billion: 1e9,
      Trillion: 1e12,
      Quadrillion: 1e15,
      Quintillion: 1e18,
      Sextillion: 1e21,
      Septillion: 1e24,
    };

    if (!kiString.includes(" ")) {
      const numeric = parseFloat(kiString.replace(/\./g, "").replace(/,/g, ""));
      return isNaN(numeric) ? 0 : numeric;
    }

    const [numberPart, unit] = kiString.split(" ");
    const cleaned = numberPart.replace(/[\.,]/g, "");
    const base = parseFloat(cleaned);
    const multiplier = units[unit] || 1;

    return isNaN(base) ? 0 : base * multiplier;
  };

  const sortedTransformations = [...(character.transformations || [])].sort(
    (a, b) => parseKi(a.ki) - parseKi(b.ki)
  );

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <img
            src={character.image}
            alt={character.name}
            width={300}
            height={400}
            className={styles.characterImage}
          />
          <div className={styles.characterInfo}>
            <div className={styles.characterName}>
              <h1 className={styles.name}>{character.name.toUpperCase()}</h1>
              {fav ? (
                <svg
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(character);
                  }}
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
              ) : (
                <svg
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(character);
                  }}
                  width="24"
                  height="21.68"
                  viewBox="0 0 26 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 1.67337L7.51885 0.818504L7 0.503596L6.48115 0.818505L7 1.67337ZM13 5.31499L12.4812 6.16985L13 6.48476L13.5188 6.16985L13 5.31499ZM1 5.31499L0.481151 4.46012L0 4.75215V5.31499H1ZM1 13.1185H0V13.58L0.351203 13.8794L1 13.1185ZM13 23.3497L12.3512 24.1106L13 24.6638L13.6488 24.1106L13 23.3497ZM25 13.1185L25.6488 13.8794L26 13.58V13.1185H25ZM25 5.31499H26V4.75215L25.5188 4.46012L25 5.31499ZM19 1.67337L19.5189 0.818505L19 0.503596L18.4812 0.818504L19 1.67337ZM6.48115 2.52824L12.4812 6.16985L13.5188 4.46012L7.51885 0.818504L6.48115 2.52824ZM1.51885 6.16985L7.51885 2.52824L6.48115 0.818505L0.481151 4.46012L1.51885 6.16985ZM2 13.1185V5.31499H0V13.1185H2ZM13.6488 22.5887L1.6488 12.3575L0.351203 13.8794L12.3512 24.1106L13.6488 22.5887ZM13.6488 24.1106L25.6488 13.8794L24.3512 12.3575L12.3512 22.5887L13.6488 24.1106ZM26 13.1185V5.31499H24V13.1185H26ZM25.5188 4.46012L19.5189 0.818505L18.4812 2.52824L24.4812 6.16985L25.5188 4.46012ZM18.4812 0.818504L12.4812 4.46012L13.5188 6.16985L19.5189 2.52824L18.4812 0.818504Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>

            <p className={styles.description}>{character.description}</p>
          </div>
        </div>
      </section>

      <section className={styles.transformations}>
        <div className={styles.transformationsInner}>
          <h2>TRANSFORMACIONES</h2>
          <div className={styles.scrollWrapper}>
            <div className={styles.scrollContainer} ref={scrollRef}>
              {sortedTransformations.length > 0 ? (
                sortedTransformations.map((t) => (
                  <div key={t.id} className={styles.card}>
                    <img
                      src={t.image}
                      alt={t.name}
                      width={180}
                      height={250}
                      draggable={false}
                    />
                    <div className={styles.cardInfo}>
                      <p className={styles.cardTitle}>{t.name}</p>
                      <p className={styles.cardKi}>Ki: {t.ki}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noTransformations}>
                  Este personaje no tiene transformaciones registradas.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
