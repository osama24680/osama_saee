import { useEffect, useState } from 'react';
import { Col, Container, Image, Modal, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import PhotoCard from 'components/Cards/PhotoCard';
import SkeletonBlog from 'components/Skeleton/SkeletonBlog';

import Layout from 'src/organisms/Layout';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const photosFetcher = url => fetch(`${apiurl}${url}`).then(res => res.json());

const Photos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { page, categoryid } = router.query;
  const itemNumber = 12;
  const [modalData, setModalData] = useState(null);
  const [show, setShow] = useState(false);

  const { data: photos } = useSWR(
    [
      `${
        categoryid === '0'
          ? `/pgarticles/photos/0/${itemNumber}?page=${page}`
          : `/pgarticles/photos/bycategory/${categoryid}/0/${itemNumber}?page=${page}`
      }`,
      categoryid,
      page,
    ],
    (url, categoryid, page) => photosFetcher(url, categoryid, page)
  );

  const { data: categories } = useSWR('/pgarticlecategories/photos/0/500');

  useEffect(() => {
    setCurrentPage(parseInt(page) - 1);
  }, [page]);

  const handlePageClick = pageid => {
    router.push(`/photos/${categoryid}/${pageid.selected + 1}`);
  };
  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={t.navbar.media.photos}
    >
      <Helmet>
        <title>{`${t.main_title}
        `}</title>
      </Helmet>

      <div className='paddingTop books'>
        <Container>
          <Row>
            <Col lg={12}>
              <div className='home__sheikhBooks--btns'>
                {categories && categories.data.length > 0 && (
                  <>
                    {categories.data.map((cate, index) => (
                      <Link
                        key={index}
                        href={`/photos/${cate.id}/1`}
                        style={{
                          display: 'inline-block',
                          marginInlineEnd: '1rem',
                        }}
                      >
                        <button
                          className={` ${
                            cate.id === categoryid
                              ? 'mainBtn active'
                              : 'mainBtn'
                          }`}
                        >
                          {cate.title.ar}
                        </button>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={12}
              className='mb-4 recentBar'
            >
              <div className='recent'>
                {photos?.data &&
                  photos?.data.length > 0 &&
                  photos?.data.map(photo => (
                    <div
                      className='recentBar__item'
                      key={photo.id}
                      onClick={() => {
                        setModalData(photo);
                        setShow(true);
                      }}
                    >
                      <PhotoCard photo={photo} />
                    </div>
                  ))}

                {!photos?.data && (
                  <>
                    {[...Array(6).keys()].map(index => (
                      <SkeletonBlog key={index} />
                    ))}
                  </>
                )}
              </div>

              {photos?.data && photos.length === 0 && (
                <h3 className='text-center'>{t.noData}</h3>
              )}

              {photos?.meta && photos?.meta.total > itemNumber ? (
                <>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={photos?.meta.last_page}
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

            <Modal
              show={show}
              onHide={() => {
                setModalData(null);
                setShow(false);
              }}
              dialogClassName='modal-90w'
              aria-labelledby='photos-title'
              size='lg'
            >
              <Modal.Header closeButton>
                <Modal.Title id='photos-title'>
                  {modalData?.title.ar}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {modalData && (
                  <Image
                    src={`${apiurl}/${modalData?.image_url}`}
                    alt={modalData?.title.ar}
                    fluid
                    style={{
                      width: '100%',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </Modal.Body>
            </Modal>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Photos;
