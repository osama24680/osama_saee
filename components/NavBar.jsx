import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import navLogo from 'public/assets/images/svg/logo_header.svg';
import Link from 'next/link';
import Image from 'next/image';
import ShoppingCart from 'public/assets/images/svg/shopping-cart.svg';
import t from 'src/Locales/ar/translation.json';

const CENTERS = {
  title: t.navbar.centers.title,
  list: [
    {
      id: 1,
      href: '/centers/researchCenter/about',
      title: t.navbar.centers.researchesAndStudiesCenter,
    },
    {
      id: 2,
      href: '/centers/infoCenter/about',
      title: t.navbar.centers.dataCenter,
    },
    {
      id: 3,
      href: '/centers/mediaCenter/about',
      title: t.navbar.centers.mediaAndCommunicationCenter,
    },
  ],
};
const JOIN_SAEE = {
  title: t.navbar.joinSaee.title,
  list: [
    {
      id: 1,
      href: '/joinSaee',
      title: t.navbar.joinSaee.researcher,
    },
    {
      id: 2,
      href: '/joinSaee',
      title: t.navbar.joinSaee.judge,
    },
    {
      id: 3,
      href: '/joinSaee',
      title: t.navbar.joinSaee.writer,
    },
    {
      id: 4,
      href: '/joinSaee',
      title: t.navbar.joinSaee.languageChecker,
    },
    {
      id: 5,
      href: '/joinSaee',
      title: t.navbar.joinSaee.advisor,
    },
    {
      id: 6,
      href: '/joinSaee',
      title: t.navbar.joinSaee.others,
    },
  ],
};

function NavBar({ isScroll }) {
  const centersList = CENTERS.list.map(item => (
    <NavDropdown.Item
      key={item.id}
      as={Link}
      href={{
        pathname: item.href,
      }}
    >
      {item.title}
    </NavDropdown.Item>
  ));

  const joinSaeeList = JOIN_SAEE.list.map(item => (
    <NavDropdown.Item
      key={item.id}
      as={Link}
      href={{
        pathname: item.href,
      }}
    >
      {item.title}
    </NavDropdown.Item>
  ));

  return (
    <div
      className='navbar_container'
      style={{
        position: isScroll ? 'fixed' : null,
        backgroundColor: isScroll ? '#00B7CE' : null,
        height: isScroll && 'auto',
      }}
    >
      <div className='under_construction'>
        إطلاق تجريبي - الموقع تحت الصيانة والتطوير
      </div>

      <Navbar
        className='mainNav'
        expand='lg'
      >
        <Container>
          <Navbar.Brand
            as={Link}
            exact
            activeClassName='active'
            className='navbar-brand'
            href={`/`}
          >
            <Image
              tabIndex='1'
              src={navLogo}
              alt='logo'
              fluid
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavDropdown
                title={JOIN_SAEE.title}
                id='basic-nav-dropdown'
              >
                {joinSaeeList}
              </NavDropdown>

              <Link
                exact
                className='nav-link'
                href={`/about-us`}
              >
                {t.navbar.aboutSaee}
              </Link>

              <NavDropdown
                title={CENTERS.title}
                id='basic-nav-dropdown'
              >
                {centersList}
              </NavDropdown>

              <Link
                exact
                className='nav-link'
                href={{
                  pathname: '/static/magazines',
                }}
                isActive={() =>
                  window.location.pathname.indexOf('/magazines') !== -1
                }
              >
                {t.navbar.magazine}
              </Link>

              <Link
                exact
                className='nav-link'
                href={{
                  pathname: '/static/library',
                }}
                isActive={() =>
                  window.location.pathname.indexOf('books') !== -1
                }
              >
                {t.navbar.library}
              </Link>

              <NavDropdown
                title={t.navbar.media.media_title}
                id='basic-nav-dropdown'
              >
                <NavDropdown.Item
                  as={Link}
                  href={`/media-center/news/0/1`}
                  isActive={() =>
                    window.location.pathname.indexOf('/news') !== -1
                  }
                >
                  {t.navbar.media.news}
                </NavDropdown.Item>
              </NavDropdown>

              <Link
                className='nav-link'
                href={`/contact-us`}
                isActive={() =>
                  window.location.pathname.indexOf('/contact-us') !== -1
                }
              >
                {t.navbar.contact_us}
              </Link>

              <a
                href='https://saee.store/'
                target='blank'
                className='navBtn'
              >
                <Image
                  alt=''
                  src={ShoppingCart}
                  fluid
                />
                <span>{t.shop}</span>
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
