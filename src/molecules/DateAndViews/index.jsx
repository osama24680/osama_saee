import PublishingDate from 'src/atoms/PublishingDate';
import ViewsNumber from 'src/atoms/ViewsNumber';

import styles from './style.module.css';

function DateAndViews({ date, views }) {
  return (
    <div className={styles.DateAndViews}>
      <PublishingDate date={date} />

      <ViewsNumber views={views} />
    </div>
  );
}

export default DateAndViews;
