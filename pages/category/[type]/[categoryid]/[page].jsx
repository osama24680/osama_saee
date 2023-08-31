import { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import Layout from 'src/organisms/Layout';

import BookCard from 'components/Cards/BookCard';
import SkeletonBlog from 'components/Skeleton/SkeletonBlog';
import BookModal from 'components/Cards/BookModal';
import SearchingInput from 'components/SearchingInput';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const booksFetcher = url => fetch(`${apiurl}${url}`).then(res => res.json());

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { page, categoryid, type } = router.query;
  const itemNumber = 18;
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchedData, setSearchedData] = useState(null);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const { data: books } = useSWR(
    [
      `${
        categoryid === '0'
          ? `/lessons/${type}/${itemNumber}?loadSections=1&loadAttachments=0&page=${page}`
          : `/course/sections/${type}/many_lessons/${categoryid}/${itemNumber}?loadSections=0&loadAttachments=0&page=${page}`
      }`,
      categoryid,
      page,
      type,
    ],
    (url, categoryid, page) => booksFetcher(url, categoryid, page, type)
  );
  const { data: categories } = useSWR(`/course/sections/${type}/500`);

  useEffect(() => {
    setCurrentPage(parseInt(page) - 1);
  }, [page]);

  const handlePageClick = pageid => {
    router.push(`/category/${type}/${categoryid}/${pageid.selected + 1}`);
  };

  const searchOnBooks = useCallback(
    async search => {
      try {
        const res = await fetch(
          `${apiurl}/lessons/books/search/${search}/${itemNumber}`
        );
        const data = await res.json();
        setSearchedData(data.data);
      } catch (error) {}
    },
    [itemNumber]
  );

  useEffect(() => {
    if (searchTerm) {
      searchOnBooks(searchTerm);
    }
  }, [searchTerm, searchOnBooks]);

  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={t.navbar.media.booksSection}
    >
      <div className='paddingTop books'>
        <Container>
          <Row>
            <Col lg={12}>
              <SearchingInput
                getSearchTerm={term => {
                  setSearchTerm(term);
                }}
                placeHolder='ابحث عن كتب'
              />
            </Col>
            <Col lg={12}>
              <div className='home__sheikhBooks--btns'>
                <Link
                  href={`/category/${type}/0/1`}
                  style={{
                    display: 'inline-block',
                    marginInlineEnd: '1rem',
                  }}
                >
                  <button
                    className={` ${
                      categoryid == 0 ? 'mainBtn active' : 'mainBtn'
                    }`}
                  >
                    {t.btns.all}
                  </button>
                </Link>
                {categories && categories.data.length > 0 && (
                  <>
                    {categories.data.map((cate, index) => (
                      <Link
                        key={index}
                        href={`/category/${type}/${cate.id}/1`}
                        style={{
                          display: 'inline-block',
                          marginInlineEnd: '1rem',
                        }}
                        onClick={() => searchedData && setSearchedData(null)}
                      >
                        <button
                          className={` ${
                            cate.id === categoryid
                              ? 'mainBtn active'
                              : 'mainBtn'
                          }`}
                        >
                          {cate.title}
                        </button>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={12}
              className='mb-4'
            >
              <div className='books-grid'>
                {books?.data &&
                  !searchedData &&
                  books?.data.length > 0 &&
                  books?.data.map(book => (
                    <BookCard
                      key={book.id}
                      book={book}
                      setModalData={setModalData}
                      setShow={setShow}
                      type={type}
                    />
                  ))}
              </div>
              <div className='books-grid'>
                {searchedData &&
                  searchedData?.length > 0 &&
                  searchedData?.map(book => (
                    <BookCard
                      key={book.id}
                      book={book}
                      setModalData={setModalData}
                      setShow={setShow}
                      type={type}
                    />
                  ))}
              </div>
              {!books?.data && (
                <>
                  {[1, 2, 3, 4, 5].map(index => (
                    <SkeletonBlog key={index} />
                  ))}
                </>
              )}

              {books?.data && books.length === 0 && (
                <h3 className='text-center'>{t.noData}</h3>
              )}

              {!searchedData &&
              books?.meta &&
              books?.meta.total > itemNumber ? (
                <>
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={books?.meta.last_page}
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

              <BookModal
                show={show}
                setModalData={setModalData}
                setShow={setShow}
                data={modalData}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default Books;
