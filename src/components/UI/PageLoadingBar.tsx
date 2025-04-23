import { useEffect, useState } from "react";
import styles from "./PageLoadingBar.module.css";

const PageLoadingBar = ({ isActive }: { isActive: boolean }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      const timeout = setTimeout(() => setShow(false), 500); // 0.5s
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return show ? <div className={styles.loadingBar} /> : null;
};

export default PageLoadingBar;
