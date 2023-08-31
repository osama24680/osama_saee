import DateIcon from './DateIcon';

import styles from './style.module.css';

const PublishingDate = ({ date }) => {
  return (
    <span className={styles.PublishingDate}>
      <DateIcon />

      {date}
    </span>
  );
};

export default PublishingDate;
