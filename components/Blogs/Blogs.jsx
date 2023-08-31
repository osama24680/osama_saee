import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Col, Container, Image, Row } from 'react-bootstrap';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';

import SideBar from 'components/SideBar';
import SkeletonBlog from 'components/Skeleton/SkeletonBlog';

import DateAndViews from 'src/molecules/DateAndViews';

import slugify from 'src/Helper/slugify';
import stripHtml from 'src/Helper/stripHtml';

import defaultImage from 'public/assets/images/defaultImage.png';

import t from 'src/Locales/ar/translation.json';

const apiUrl = 'https://api.saee.org.sa/';
const blogsFetcher = url => fetch(`${apiUrl}${url}`).then(res => res.json());

const Blogs = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemNumber = 5;

  const tab = router.query.tab;
  const categoryid = router.query.categoryid;
  const page = router.query.page;

  const { data: blogs } = useSWR(
    [
      `${
        categoryid == 0 || categoryid == ''
          ? `/pgarticles/${tab}/0/${itemNumber}?page=${page}`
          : `/pgarticles/${tab}/bycategory/${categoryid}/0/${itemNumber}?page=${page}`
      }`,
      tab,
      page,
      categoryid,
    ],
    (url, tab, page, categoryid) => blogsFetcher(url, tab, page, categoryid)
  );

  useEffect(() => {
    setCurrentPage(parseInt(page) - 1);
  }, [page]);

  const handlePageClick = pageid => {
    router.push(`/media-center/${tab}/${categoryid}/${pageid.selected + 1}`);
  };

  return (
    <div className='paddingTop media-center__blog'>
      <Container>
        <Row>
          <Col
            lg={{ span: `${tab === 'magazines' ? 12 : 8}`, order: 1 }}
            xs={{ span: 12, order: 2 }}
            className='mb-4'
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
                      href={`/${tab}/show/${blog.id}/${slugify(
                        blog.title['ar'] || blog.title
                      )}`}
                    >
                      {blog.image_url && (
                        <Image
                          alt=''
                          src={`${apiUrl}/${blog.image_url}`}
                          fluid
                          loading='lazy'
                        />
                      )}
                      {!blog.image_url && (
                        <Image
                          alt=''
                          src={defaultImage}
                          fluid
                          loading='lazy'
                        />
                      )}
                    </Link>
                  </div>

                  <div className='media-center__blog__item--text'>
                    <div className='info'>
                      <Link
                        href={`/${tab}/show/${blog.id}/${slugify(
                          blog.title['ar'] || blog.title
                        )}`}
                      >
                        <h6>{blog.title['ar'] || blog.title}</h6>
                      </Link>

                      {blog.content && tab !== 'books' ? (
                        <p>
                          {stripHtml(
                            blog.content?.content || blog.content
                          ).substring(0, 400)}
                        </p>
                      ) : (
                        <>
                          <span>
                            {blog.content?.field} / {blog.content?.place}
                          </span>
                          <p>{blog.content?.info}</p>
                        </>
                      )}
                    </div>

                    <div>
                      <DateAndViews
                        date={blog?.publish_date ?? '-'}
                        views={blog?.views}
                      />

                      <div className='d-flex justify-content-end'>
                        <Link
                          href={`/${tab}/show/${blog.id}/${slugify(
                            blog.title['ar'] || blog.title
                          )}`}
                          className='mainBtn '
                        >
                          <span>{t.btns.more}</span>
                        </Link>
                      </div>
                    </div>
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

            {blogs?.data && blogs.length === 0 && (
              <h3 className='text-center'>{t.noData}</h3>
            )}

            {blogs?.meta && blogs?.meta.total > itemNumber ? (
              <>
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={blogs?.meta.last_page}
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

          {tab !== 'magazines' && (
            <Col
              lg={{ span: 4, order: 2 }}
              xs={{ span: 12, order: 1 }}
            >
              <SideBar />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
