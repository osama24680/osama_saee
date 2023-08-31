import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SkeletonBlog from 'components/Skeleton/SkeletonBlog';

import Layout from 'src/organisms/Layout';

import slugify from 'src/Helper/slugify';
import stripHtml from 'src/Helper/stripHtml';

import mainImg from 'public/assets/images/defaultImage.png';
import defaultImg from 'public/assets/images/library_default.jpg';
import AppGallery from 'public/assets/images/AppGallery.png';
import appStore from 'public/assets/images/appstore.svg';
import googleplay from 'public/assets/images/googleplay.png';
import SearchingNav from 'components/SearchingNav';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState(null);
  const router = useRouter();
  const { term, page } = router.query;
  const itemNumber = 10;

  const getSearchData = useCallback(async () => {
    try {
      const formData = new FormData();
      formData.append('pageSize', 10);
      formData.append('searchTerm', term);
      const res = await fetch(`${apiurl}/packages-search?page=${page}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setBlogs(data.data);
    } catch (error) {}
  }, [term, page]);

  useEffect(() => {
    setCurrentPage(parseInt(page) - 1);
    getSearchData();
  }, [page, term, getSearchData]);

  const handlePageClick = pageid => {
    router.push(`/search/${term}/${pageid.selected + 1}`);
  };

  const generateLink = blog => {
    switch (blog.type) {
      case 'projects':
      case 'testimonials':
      case 'news':
      case 'annualreport':
      case 'magazines':
      case 'researches':
      case 'infos':
      case 'media':
      case 'docs':
      case 'versions':
        return `/${blog.type}/show/${blog.id}/${slugify(
          blog.title['ar'] || blog.title
        )}`;

      case 'staticpages':
        return `/static/${blog.brief}`;

      case 'books':
        return blog?.objective?.link;

      case 'photos':
        return `/photos/${blog.pgarticlecategories_id}/1`;

      default:
        return `/`;
    }
  };

  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={term}
    >
      <Helmet>
        <title>
          {t.search_res}- {t.main_title}
        </title>
      </Helmet>
      <section className='about-us paddingTop'>
        <section className=' media-center__blog'>
          <Container>
            <Row>
              <Col
                lg={12}
                className='mb-3'
              >
                <SearchingNav />
              </Col>
              <Col
                lg={12}
                className='mb-3'
              >
                {blogs?.data &&
                  blogs?.data.length > 0 &&
                  blogs?.data.map((blog, index) => (
                    <div
                      key={index}
                      className='media-center__blog__item'
                    >
                      <div className='media-center__blog__item--img'>
                        <Link
                          target={
                            (blog.brief?.store_url || blog?.objective?.link) &&
                            '_blank'
                          }
                          href={{
                            pathname:
                              blog.type === 'applications'
                                ? `${blog.brief?.store_url}` || '#'
                                : generateLink(blog),
                          }}
                        >
                          <Image
                            alt=''
                            fluid
                            src={`${
                              blog.image_url
                                ? `${apiurl}/${blog.image_url}`
                                : blog.type === 'books'
                                ? `${defaultImg}`
                                : `${mainImg}`
                            }`}
                            style={{
                              objectFit:
                                blog.type === 'books' ? 'contain' : 'cover',
                            }}
                          />
                        </Link>
                      </div>
                      <div className='media-center__blog__item--text'>
                        <div className='info'>
                          <div className='date'>{blog.publish_date}</div>
                          <Link
                            target={
                              (blog.brief?.store_url ||
                                blog?.objective?.link) &&
                              '_blank'
                            }
                            href={{
                              pathname:
                                blog.type === 'applications'
                                  ? `${blog.brief?.store_url}` || '#'
                                  : generateLink(blog),
                            }}
                          >
                            <h6>{blog.title['ar'] || blog.title}</h6>
                          </Link>

                          {blog?.content && (
                            <p>
                              {stripHtml(
                                blog.content?.content || blog.content
                              ).substring(0, 400)}
                            </p>
                          )}
                          {blog.type === 'books' && (
                            <div className='modal-grid'>
                              <div className='modal-grid__item'>
                                <span>المؤلف</span>:
                                <b>{blog?.objective?.author || '-'}</b>
                              </div>

                              <div className='modal-grid__item'>
                                <span>الطبعة</span>:
                                <b>{blog?.objective?.info || '-'}</b>
                              </div>
                              <div className='modal-grid__item'>
                                <span>رقم المادة</span>:
                                <b>{blog?.objective?.number || '-'}</b>
                              </div>
                              <div className='modal-grid__item'>
                                <span>النوع</span>:
                                <b>{blog?.objective?.info || '-'}</b>
                              </div>
                            </div>
                          )}
                        </div>

                        {blog.type === 'applications' ? (
                          <div className='app-links'>
                            {blog.brief?.app_gallery && (
                              <a
                                href={blog.brief?.app_gallery}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <Image
                                  alt=''
                                  src={AppGallery}
                                  fluid
                                />
                              </a>
                            )}
                            {blog.brief?.app_store && (
                              <a
                                href={blog.brief?.app_store}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <Image
                                  alt=''
                                  src={appStore}
                                  fluid
                                />
                              </a>
                            )}
                            {blog.brief?.google_play && (
                              <a
                                href={blog.brief?.google_play}
                                target='_blank'
                                rel='noopener noreferrer'
                              >
                                <Image
                                  alt=''
                                  src={googleplay}
                                  fluid
                                />
                              </a>
                            )}
                          </div>
                        ) : (
                          <div className='text-left'>
                            <Link
                              target={
                                (blog.brief?.store_url ||
                                  blog?.objective?.link) &&
                                '_blank'
                              }
                              href={{
                                pathname:
                                  blog.type === 'applications'
                                    ? `${blog.brief?.store_url}` || '#'
                                    : generateLink(blog),
                              }}
                              className='see_more text-left'
                            >
                              <span>{t.btns.more}</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                {!blogs?.data && (
                  <>
                    {[1, 2, 3, 4, 5].map(index => (
                      <SkeletonBlog key={index} />
                    ))}
                  </>
                )}

                {blogs?.data && blogs?.data.length === 0 && (
                  <h3 className='text-center'>لا توجد بيانات</h3>
                )}

                {blogs && blogs?.total > itemNumber ? (
                  <>
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={blogs?.last_page}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={4}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                      forcePage={currentPage}
                    />
                  </>
                ) : null}
              </Col>
            </Row>
          </Container>
        </section>
      </section>
    </Layout>
  );
};

export default Search;
