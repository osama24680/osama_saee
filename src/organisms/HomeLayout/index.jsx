import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header';
import HomeSlider from 'components/Home/HeaderSlider';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import styles from './style.module.css';

const dir = 'rtl';

const HomeLayout = ({ children }) => {
  const [IsScroll, setIsScroll] = useState(false);

  const fixedOnScroll = () => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= window.innerHeight) {
        setIsScroll(() => !IsScroll);
      } else {
        setIsScroll(false);
      }
    });
  };

  useEffect(() => {
    let isUnMounted = false;
    if (!isUnMounted) {
      fixedOnScroll();
    }

    return () => {
      isUnMounted = true;
    };
  }, []);

  return (
    <section
      className={styles.Layout}
      dir={dir}
    >
      <Helmet>
        <title>{`${tShared.home} - ${t.main_title}`}</title>
      </Helmet>

      <Header slider>
        <NavBar isScroll={IsScroll} />

        <div className='header__content'>
          <HomeSlider />
        </div>
      </Header>

      <section className={styles.wrapper}>{children}</section>

      <Footer />
    </section>
  );
};

export default HomeLayout;
