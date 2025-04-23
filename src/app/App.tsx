import { Outlet } from "react-router-dom";
import Header from "../shared/ui/Header/Header";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
