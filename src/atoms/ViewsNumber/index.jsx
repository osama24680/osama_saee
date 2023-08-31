import ViewIcon from './ViewIcon';

import styles from './style.module.css';

const ViewsNumber = ({ views }) => {
  return (
    <span className={styles.ViewsNumber}>
      <ViewIcon />

      {views}
    </span>
  );
};

export default ViewsNumber;
