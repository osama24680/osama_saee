import { useRouter } from 'next/router';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import useSWR from 'swr';

import Layout from 'src/organisms/Layout';

import ShareBox from 'components/ShareBox';
import RecentMedia from 'components/RecentMedia';
import SkeletonSingleMedia from 'components/Skeleton/SkeletonSingleMedia';

import DateAndViews from 'src/molecules/DateAndViews';

import { createLocalStore, getStoreData } from 'src/Helper/createStoreIds';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const apiUrl = 'https://api.saee.org.sa/';
const blogFetcher = url => fetch(`${apiUrl}${url}`).then(res => res.json());

const SingleBlog = () => {
  const router = useRouter();
  const { id, tab } = router.query;

  const { data: blog } = useSWR(
    [
      [
        tab === 'versions'
          ? `/lessons/${tab}/show/${id}/1/0?loadSections=1&loadAttachments=1`
          : `/pgarticles/${tab}/show/${id}`,
      ],
      tab,
      id,
    ],
    (url, tab, id) => {
      let newUrl = url;
      const ids = getStoreData(tab);

      if (!ids) {
        createLocalStore(tab, ids, id);
        newUrl = `${url}/1`;
      } else if (ids && ids.indexOf(id) === -1) {
        createLocalStore(tab, ids, id);
        newUrl = `${url}/1`;
      }

      return blogFetcher(newUrl, tab, id);
    }
  );

  const getTitle = () => {
    if (tab == 'articles') {
      return t.navbar.media.blog;
    } else if (tab == 'news') {
      return t.navbar.media.news;
    } else if (tab == 'books') {
      return 'المكتبة الوقفية';
    } else if (tab == 'magazines') {
      return 'مجلة واقف';
    } else if (tab == 'videos') {
      return t.navbar.media.videos;
    } else if (tab == 'media') {
      return 'مركز الإعلام والإتصال الوقفي';
    } else if (tab == 'infos') {
      return 'مركز المعلومات';
    } else if (tab == 'researches') {
      return t.navbar.centers.researchesAndStudiesCenter;
    } else if (tab == 'docs') {
      return 'وثيقة';
    }
  };

  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={getTitle() || blog?.data?.title.ar}
    >
      <Helmet>
        <title>
          {blog?.data
            ? blog?.data.title['ar'] || blog?.data.title
            : t.navbar.media.blog}{' '}
          - {t.main_title}
        </title>

        <meta
          property='og:image'
          content={`${apiUrl}/${blog?.data.image_url}`}
        />

        <meta
          property='og:image:type'
          content='image/png'
        />

        <meta
          property='og:image:width'
          content='1024'
        />

        <meta
          property='og:image:height'
          content='1024'
        />

        {blog?.data && (
          <meta
            name='description'
            content={blog?.data.title['ar'] || blog?.data.title}
          />
        )}
      </Helmet>

      <Container>
        <section className='paddingTop'>
          <Row className='media-center__blog'>
            <Col lg={12}>
              {blog?.data ? (
                <div className='singleBlog mb-4'>
                  <ShareBox />
                  <div className='singleBlog__info'>
                    <h4>{blog?.data.title['ar'] || blog?.data.title}</h4>

                    <DateAndViews
                      date={blog?.data.publish_date}
                      views={blog?.data.views}
                    />
                  </div>

                  <div className='text-center'>
                    {blog?.data?.image_url && (
                      <Image
                        alt=''
                        src={`${apiUrl}/${blog?.data.image_url}`}
                        fluid
                        loading='lazy'
                        className='singleImg'
                      />
                    )}
                  </div>

                  <div className='singleBlog__content'>
                    {blog.data.content && tab !== 'books' ? (
                      <div
                        style={{ fontSize: '16px' }}
                        dangerouslySetInnerHTML={{
                          __html:
                            blog.data.content?.content || blog.data.content,
                        }}
                      ></div>
                    ) : (
                      <>
                        <span>
                          {blog.data.content?.field} /{' '}
                          {blog.data.content?.place}
                        </span>
                        <p>{blog.data.content?.info}</p>
                      </>
                    )}
                  </div>

                  {blog?.data?.file_url && (
                    <iframe
                      src={`${apiUrl}/${blog?.data?.file_url}`}
                      width='100%'
                      height={'500px'}
                    ></iframe>
                  )}

                  {blog?.data?.content?.video_url && (
                    <iframe
                      width='100%'
                      height='500'
                      src={`https://www.youtube.com/embed/${blog?.data.content.video_url}`}
                      title='YouTube video player'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  )}

                  {blog?.data?.author && (
                    <Row className='border-top border-bottom py-3'>
                      <Col lg={12}>
                        <h5>{blog?.data.author.name.ar}</h5>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: blog?.data.author.description.ar,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  )}
                </div>
              ) : (
                <>
                  <SkeletonSingleMedia />
                </>
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
    </Layout>
  );
};

export default SingleBlog;
