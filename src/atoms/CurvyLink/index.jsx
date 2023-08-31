import Link from 'next/link';

import styles from './style.module.css';

const CurvyLink = ({ children, href, disabled }) => {
  return (
    <Link
      className={`${styles.CurvyLink}${disabled ? ' ' + styles.disabled : ''}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default CurvyLink;
