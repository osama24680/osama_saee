import { Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
const moment = require('moment-hijri');

import SocialIcons from 'components/SocialIcons';
import SvgUp from 'components/Icons/SvgUp';

import footerLogo from 'public/assets/images/svg/logo_header.svg';
import SafeTitleImage from 'public/assets/images/SAEE_title.png';
import SagnitureImage from 'public/assets/images/signature.png';
import ShaikhImage from 'public/assets/images/shaikh_photo.png';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const Footer = () => {
  const tody = moment().locale('ar-SA').format('iYYYYهـ © YYYYم');

  const scrollToTop = () => {
    const mainHeader = document.getElementsByClassName('mainHeader');
    if (mainHeader) {
      mainHeader[0].scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer>
      <section className='footer '>
        <Container>
          <Row className='footer__rajhi'>
            <Col
              md={6}
              className='my-5'
            >
              <Image
                alt=''
                className='footer__rajhi--title'
                src={SafeTitleImage}
                fluid
              />

              <div className='footer__rajhi--text'>
                <h5>وقــد أشـركـت في أجـــــر هــذه الأوقـــاف...</h5>
                <p>
                  والـديّ ووالــديهم وذريتي وزوجـــاتي وإخــواني وأخواتــي
                  وأعمامـــي وعماتـــي وأخــــوالي وخـــالاتي وأعضاء مجلس
                  النظارة وجميع العاملين فيها ووالديهــم، وبخاصة من أعد صياغة
                  هذا النظام وكـل من أسهم فيه بجهدٍ أو نصـــح أو رأي أو مشـــورة
                  أو دعــــوة صــالـحـــة وكــــل مـن أحـبـنـي فــي الله
                  وأحـبـبـتـــــه فـيــه، كما أشركت في أجرها كـل مسئول في أي
                  جهـــــة حكوميـــــة أو أهليـــة قدّم دعماً أو تسهيلاً أو أزال
                  عقبة عن هذه الأوقاف رغبة في إنجاحها ورعايتها
                </p>

                <div className='footer__rajhi--signature'>
                  <Image
                    alt=''
                    src={SagnitureImage}
                    fluid
                  />
                </div>
              </div>
            </Col>

            <Col
              md={6}
              className='rajhi-img'
            >
              <Image
                alt=''
                src={ShaikhImage}
                fluid
              />
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className='footer__top '>
            <Col md={3}>
              <Image
                alt=''
                fluid
                src={footerLogo}
                className='footer__logo'
              />
              <div className='mt-3'>
                <SocialIcons fill='#FFF' />
              </div>
            </Col>
            <Col md={1} />
            <Col md={3}>
              <ul className='footer__links'>
                <li>
                  <Link
                    href={`/`}
                    className='footer__link'
                  >
                    {tShared.home}
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/static/magazines',
                      state: {
                        staticLink: `/media-center/magazines/0/1`,
                      },
                    }}
                    className='footer__link'
                  >
                    مجلة الوقف
                  </Link>
                </li>
                <li>
                  <Link
                    href={{
                      pathname: '/static/library',
                      state: {
                        staticLink: `/category/books/0/1`,
                      },
                    }}
                    className='footer__link'
                  >
                    المكتبة الوقفية
                  </Link>
                </li>
              </ul>
            </Col>
            <Col md={3}>
              <ul className='footer__links'>
                <li>
                  <Link
                    href={{
                      pathname: '/static/researches',
                      state: {
                        staticLink: `/media-center/researches/0/1`,
                      },
                    }}
                    className='footer__link'
                  >
                    {t.navbar.centers.researchesAndStudiesCenter}
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/media-center/docs/0/1`}
                    className='footer__link'
                  >
                    مركز وثيقة
                  </Link>
                </li>
              </ul>{' '}
            </Col>
            <Col
              md={2}
              className='position-relative'
            >
              {' '}
              <ul className='footer__links'>
                <li>
                  <Link
                    href='#'
                    className='footer__link'
                  >
                    {t.shop}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/media-center/news/0/1`}
                    className='footer__link'
                  >
                    الإعلام
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact-us'
                    className='footer__link'
                  >
                    {t.navbar.contact_us}
                  </Link>
                </li>
              </ul>
              <div className='goUp'>
                <button
                  type='button'
                  onClick={() => scrollToTop()}
                >
                  <SvgUp fill='#FFF' />
                </button>
              </div>
            </Col>
          </Row>
        </Container>

        <div className='footer__bottom '>
          <Container className='p-0'>
            <div className='d-flex justify-content-between py-3 flex-wrap'>
              <div>
                <div
                  style={{
                    display: 'inline-block',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: t.footer.copyright,
                  }}
                ></div>
                <div
                  style={{
                    margin: '0 5px',
                    display: 'inline-block',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: tody,
                  }}
                ></div>
              </div>

              <p>
                <a
                  className='slsalText'
                  href='http://slsal.co/'
                  target='_blank'
                  dangerouslySetInnerHTML={{
                    __html: t.footer.made_by_slsal,
                  }}
                ></a>
              </p>
            </div>
          </Container>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
