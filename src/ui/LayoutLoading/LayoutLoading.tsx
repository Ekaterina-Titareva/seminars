import styles from "./styles.module.css";

const LayoutLoading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.container}>
        <div className={styles.hourglass} />
      </div>
    </div>
  );
};

export default LayoutLoading;
