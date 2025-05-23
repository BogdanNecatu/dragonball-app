import { useNavigate } from 'react-router-dom';
import styles from './NotFoundCharacter.module.css';

const NotFoundCharacter = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={styles.container} data-testid="not-found-character" role="alert" aria-label="Character not found">
      <h2 className={styles.title}>Character Not Found</h2>
      <p className={styles.message}>The character you're looking for doesn't exist or was removed.</p>
      <button onClick={handleBack} className={styles.button} aria-label="Go back to home page">
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundCharacter;
