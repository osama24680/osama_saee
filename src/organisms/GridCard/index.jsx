import Image from 'next/image';

import CurvyLink from 'src/atoms/CurvyLink';

import placeholderImg from './placeholderImg.jpg';

import styles from './style.module.css';

function GridCard({ href, imgSrc, imgAlt, title, buttonContent }) {
  const maxLength = 25;

  return (
    <div className={styles.GridCard}>
      <Image
        className={styles.img}
        src={imgSrc == null ? imgSrc : placeholderImg}
        alt={imgAlt}
        width={200}
        height={200}
        loading='lazy'
      />

      <p className={styles.title}>
        {title.length > maxLength ? title.slice(0, maxLength) + '...' : title}
      </p>

      <CurvyLink href={href}>{buttonContent}</CurvyLink>
    </div>
  );
}

export default GridCard;
