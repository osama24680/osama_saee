import styles from './style.module.css';

const GridView = ({ children }) => {
  return <div className={styles.GridView}>{children}</div>;
};

export default GridView;
