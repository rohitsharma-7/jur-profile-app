import styles from "src/styles/Loader.module.css";
const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.ldsHourglass}></div>
    </div>
  );
};

export default Loader;
