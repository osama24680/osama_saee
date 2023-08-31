import styles from './style.module.css';

const CategoryButton = ({ children, onClick, active }) => {
  return (
    <button
      className={`${styles.CategoryButton}${active ? ` ${styles.active}` : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
