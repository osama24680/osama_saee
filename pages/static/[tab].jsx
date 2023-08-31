import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import Layout from 'src/organisms/Layout';

import PublishingDate from 'src/atoms/PublishingDate';

import StaticPagesContext from 'src/context/staticPages-context';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const apiUrl = 'https://api.saee.org.sa/';

const StaticPages = () => {
  const staticPages = useContext(StaticPagesContext);

  const router = useRouter();
  const tab = router.query.tab;

  const routesObj = {
    library: '/category/books/0/1',
    magazines: '/media-center/magazines/0/1',
    researches: '/media-center/researches/0/1',
  };
  const showMoreLink = routesObj[tab];

  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={staticPages[tab] ? staticPages[tab].title.ar : '...'}
    >
      <Helmet>
        <title>
          {staticPages[tab]?.title.ar ? staticPages[tab]?.title.ar : ''} -{' '}
          {t.main_title}
        </title>
      </Helmet>

      <Container>
        <section className='paddingTop'>
          <Row className='media-center__blog'>
            <Col lg={12}>
              <div className='singleBlog mb-4'>
                <div className='singleBlog__info'>
                  <h4
                    dangerouslySetInnerHTML={{
                      __html: staticPages[tab]?.title.ar,
                    }}
                  ></h4>

                  {staticPages[tab]?.publish_date && (
                    <div className='singleBlog__info--icons'>
                      <PublishingDate date={staticPages[tab].publish_date} />

                      <span>{staticPages[tab].views}</span>
                    </div>
                  )}
                </div>

                <div className='text-center'>
                  {staticPages[tab]?.image_url && (
                    <Image
                      alt=''
                      src={`${apiUrl}/${staticPages[tab].image_url}`}
                      fluid
                      loading='lazy'
                      className='singleImg'
                    />
                  )}
                </div>

                <div className='singleBlog__content'>
                  {staticPages[tab]?.content && (
                    <div
                      style={{ fontSize: '16px' }}
                      dangerouslySetInnerHTML={{
                        __html: staticPages[tab]?.content.ar,
                      }}
                    ></div>
                  )}
                </div>

                {staticPages[tab]?.file_url && (
                  <iframe
                    src={`${apiUrl}/${staticPages[tab].file_url}`}
                    width='100%'
                    height={'500px'}
                  ></iframe>
                )}

                {staticPages[tab]?.author && (
                  <Row className='border-top border-bottom py-3'>
                    <Col lg={12}>
                      <h5>{staticPages[tab].author.name.ar}</h5>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: staticPages[tab].author.description.ar,
                        }}
                      ></div>
                    </Col>
                  </Row>
                )}
              </div>
            </Col>
            {showMoreLink && (
              <Col
                lg={12}
                className='mb-4'
              >
                <Link
                  className='mainBtn'
                  href={showMoreLink}
                >
                  إقرأ المزيد
                </Link>
              </Col>
            )}
          </Row>
        </section>
      </Container>
    </Layout>
  );
};

export default StaticPages;
