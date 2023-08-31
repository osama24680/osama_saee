import { Helmet } from 'react-helmet';
import { Container } from 'react-bootstrap';

import NavBar from 'components/NavBar';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header';

import t from 'src/Locales/ar/translation.json';

import styles from './style.module.css';

const dir = 'rtl';

const Layout = ({ pageTitle, parentTitle, children }) => {
  const mainTitle = t.main_title;

  return (
    <section
      className={styles.Layout}
      dir={dir}
    >
      <Helmet>
        <title>{`${pageTitle} - ${mainTitle}`}</title>
      </Helmet>

      <Header
        bgSize='small'
        title={pageTitle}
        parentTitle={parentTitle}
      >
        <NavBar bgSize />
      </Header>

      <section className={styles.wrapper}>
        <Container>{children}</Container>
      </section>

      <Footer />
    </section>
  );
};

export default Layout;
