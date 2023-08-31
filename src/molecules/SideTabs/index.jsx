import TabLink from 'src/atoms/TabLink';

import Dropdown from 'src/molecules/Dropdown';

import styles from './style.module.css';

function SideTabs({ tabs, title }) {
  const tabsList = tabs.map(tab => {
    return tab.type === 'link' ? (
      <TabLink
        key={tab.id}
        tab={tab}
      />
    ) : tab.type === 'dropdown' ? (
      <Dropdown
        key={tab.id}
        tabs={tab.tabs}
        title={tab.title}
      />
    ) : null;
  });

  return (
    <div className={styles.SideTabs}>
      {title && <p className={styles.title}>{title}</p>}

      {tabs && tabsList}
    </div>
  );
}

export default SideTabs;
