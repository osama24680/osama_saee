import Image from 'next/image';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';

import Layout from 'src/organisms/Layout';

import ShareBox from 'components/ShareBox';
import RecentMedia from 'components/RecentMedia';
import SkeletonSingleMedia from 'components/Skeleton/SkeletonSingleMedia';

import DateAndViews from 'src/molecules/DateAndViews';

import CurvyLink from 'src/atoms/CurvyLink';

import v from 'src/adapters/vocab.json';
import t from 'src/Locales/ar/translation.json';

import styles from './style.module.css';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const StudyTemplate = ({ parentTitle, mainTitle, pageData }) => {
  return (
    <Layout
      parentTitle={parentTitle}
      pageTitle={pageData?.title.ar}
    >
      <Helmet>
        <title>{`${pageData?.title.ar} - ${mainTitle}`}</title>
      </Helmet>

      <div className={styles.StudyTemplate}>
        <Container>
          <section className='paddingTop'>
            <Row className='media-center__blog'>
              <Col lg={12}>
                {pageData ? (
                  <div className='singleBlog mb-4'>
                    <ShareBox />

                    <div className='singleBlog__info'>
                      <h4>{pageData.title['ar'] || pageData.title}</h4>

                      <DateAndViews
                        date={pageData.publish_date}
                        views={pageData.views}
                      />
                    </div>

                    <div className='text-center'>
                      {pageData?.image_url && (
                        <Image
                          width={400}
                          height={600}
                          alt=''
                          src={`${baseURL}${pageData.image_url}`}
                          fluid
                          loading='lazy'
                          className='singleImg'
                        />
                      )}
                    </div>

                    <div className='singleBlog__content'>
                      {pageData.content ? (
                        <div
                          style={{ fontSize: '16px' }}
                          dangerouslySetInnerHTML={{
                            __html:
                              pageData.content?.ar ||
                              pageData.content?.content ||
                              pageData.content,
                          }}
                        ></div>
                      ) : (
                        <>
                          <span>
                            {pageData.content?.field} /{' '}
                            {pageData.content?.place}
                          </span>
                          <p>{pageData.content?.info}</p>
                        </>
                      )}
                    </div>

                    {pageData?.file_url && (
                      <iframe
                        src={`${baseURL}${pageData?.file_url}`}
                        width='100%'
                        height={'500px'}
                      ></iframe>
                    )}

                    {pageData?.content?.file_url && (
                      <iframe
                        src={`${baseURL}${pageData?.content?.file_url}`}
                        width='100%'
                        height={'500px'}
                      ></iframe>
                    )}

                    {pageData?.content?.video_url && (
                      <iframe
                        width='100%'
                        height='500'
                        src={`https://www.youtube.com/embed/${pageData.content.video_url}`}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      ></iframe>
                    )}

                    {pageData?.author && (
                      <Row className='border-top border-bottom py-3'>
                        <Col lg={12}>
                          <h5>{pageData.author.name[i18n.language]}</h5>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                pageData.author.description[i18n.language],
                            }}
                          ></div>
                        </Col>
                      </Row>
                    )}

                    <CurvyLink href={pageData.content[v.buyNow]}>
                      {t.btns.buy}
                    </CurvyLink>
                  </div>
                ) : (
                  <SkeletonSingleMedia />
                )}
              </Col>

              <Col
                lg={12}
                className='mb-3'
              >
                <RecentMedia />
              </Col>
            </Row>
          </section>
        </Container>
      </div>
    </Layout>
  );
};

export default StudyTemplate;
