import Link from 'next/link';
import Image from 'next/image';

import CurvyLink from 'src/atoms/CurvyLink';

import DateAndViews from 'src/molecules/DateAndViews';

import placeholderImg from './placeholderImg.jpg';

import styles from './style.module.css';

function ListCard({
  href,
  imgSrc,
  imgAlt,
  title,
  text,
  date,
  views,
  linkContent,
}) {
  return (
    <div className={styles.ListCard}>
      <div className={styles.img_side}>
        <Link href={href}>
          <Image
            loading='lazy'
            className={styles.img}
            src={imgSrc ? imgSrc : placeholderImg}
            alt={imgAlt}
          />
        </Link>
      </div>

      <div className={styles.content_side}>
        <Link href={href}>{title}</Link>

        <div
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></div>

        <DateAndViews
          date={date}
          views={views}
        />

        <div className={styles.link}>
          <CurvyLink href={href}>{linkContent}</CurvyLink>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
