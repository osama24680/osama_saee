import { useState } from 'react';

import TabLink from 'src/atoms/TabLink';

import styles from './style.module.css';

function Dropdown({ tabs, title }) {
  const [IsOpen, setIsOpen] = useState(false);

  const tabsList = tabs.map(tab => (
    <TabLink
      key={tab.id}
      tab={tab}
    />
  ));

  return (
    <div className={styles.Dropdown}>
      {title && (
        <p
          className={styles.title}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {title}
        </p>
      )}

      {tabs && IsOpen && <div className={styles.list}>{tabsList}</div>}
    </div>
  );
}

export default Dropdown;
