import TabLink from 'src/atoms/TabLink';

import styles from './style.module.css';

function UpperTabs({ tabs }) {
  const tabsList = tabs.map(tab => (
    <TabLink
      solid
      key={tab.id}
      tab={tab}
    />
  ));

  return <div className={styles.UpperTabs}>{tabs && tabsList}</div>;
}

export default UpperTabs;
