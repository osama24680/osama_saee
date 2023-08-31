import Image from 'next/image';
import { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';

import StaticPagesContext from 'src/context/staticPages-context';

import Layout from 'src/organisms/Layout';

import OurValues from 'public/assets/images/svg/our_values.svg';
import OurVision from 'public/assets/images/svg/our_vision.svg';
import OurMessage from 'public/assets/images/svg/our_message.svg';

import t from 'src/Locales/ar/aboutUs.json';
import tShared from 'src/Locales/ar/shared.json';

const AboutUs = () => {
  const staticPages = useContext(StaticPagesContext);

  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={t.aboutUs}
    >
      <section className='about-us '>
        <section className='paddingTop'>
          <div
            className='mainP'
            dangerouslySetInnerHTML={{
              __html: staticPages['about_us']?.content['ar'],
            }}
          ></div>
        </section>

        <section className='spaceMargin about-us-desc innerPadding'>
          <Row>
            <Col
              sm={6}
              lg={4}
              className='border-left'
            >
              <div className='d-flex  align-items-center mb-5'>
                <div className='home__about__icons'>
                  <Image
                    src={OurVision}
                    alt='our Vision'
                  />
                </div>
                <h3>{staticPages['our_vision']?.title['ar']}</h3>
              </div>

              <div
                className='arrow-ul'
                dangerouslySetInnerHTML={{
                  __html: staticPages['our_vision']?.content['ar'],
                }}
              ></div>
            </Col>

            <Col
              sm={6}
              lg={4}
              className='border-left'
            >
              <div className='d-flex  align-items-center mb-5'>
                <div className='home__about__icons'>
                  <Image
                    src={OurMessage}
                    alt='Our Message'
                  />
                </div>
                <h3>{staticPages['our_mission']?.title['ar']}</h3>
              </div>

              <div
                className='arrow-ul'
                dangerouslySetInnerHTML={{
                  __html: staticPages['our_mission']?.content['ar'],
                }}
              ></div>
            </Col>

            <Col
              sm={6}
              lg={4}
            >
              <div className='d-flex  align-items-center mb-5'>
                <div className='home__about__icons'>
                  <Image
                    src={OurValues}
                    alt='our values'
                  />
                </div>
                <h3>{staticPages['our_values']?.title['ar']}</h3>
              </div>

              <div
                className='arrow-ul'
                dangerouslySetInnerHTML={{
                  __html: staticPages['our_values']?.content['ar'],
                }}
              ></div>
            </Col>
          </Row>
        </section>
      </section>
    </Layout>
  );
};

export default AboutUs;
