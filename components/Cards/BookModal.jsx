import { useCallback, useState, useEffect } from 'react';
import { Col, Image, Modal, Row } from 'react-bootstrap';
import SkeletonBlog from 'components/Skeleton/SkeletonBlog';
import defaultImg from 'public/assets/images/library_default.jpg';
import t from 'src/Locales/ar/translation.json';

function BookModal({ show, setModalData, setShow, data }) {
  const [book, setBook] = useState(null);

  const getBookById = useCallback(async () => {
    const { id } = data;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lessons/books/show/${id}/1/0?loadSections=1&loadAttachments=1`
      );
      const data = await res.json();

      setBook(data.data);
    } catch (error) {}
  }, [data]);

  useEffect(() => {
    if (data) {
      getBookById();
    }
  }, [data, getBookById]);

  return (
    <Modal
      show={show}
      onHide={() => {
        setModalData(null);
        setBook(null);

        setShow(false);
      }}
      dialogClassName='modal-book'
      aria-labelledby='photos-title'
      centered
      size='lg'
    >
      <Modal.Header closeButton />
      <Modal.Body>
        {!book ? (
          <SkeletonBlog />
        ) : (
          <Row>
            <Col
              md={4}
              className='text-center'
            >
              <Image
                src={
                  data?.image_url
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${data?.image_url}`
                    : defaultImg
                }
                alt={data?.title}
                fluid
                style={{
                  width: '200px',
                  objectFit: 'contain',
                }}
              />

              <h6 className='bookPrice'>
                <span>{t.price}</span>:<b> {data?.brief?.book_price}</b>{' '}
                <b>{t.sar}</b>
              </h6>
            </Col>
            <Col md={8}>
              <div>
                <h4>{book?.title}</h4>

                <div className='modal-grid'>
                  <div className='modal-grid__item'>
                    <span>المؤلف</span>:<b>{book?.objective?.author ?? '-'}</b>
                  </div>
                  <div className='modal-grid__item'>
                    <span>
                      التصنيف
                      {book?.many_sections?.map(section => (
                        <b key={section.id}> {section?.title ?? '-'}</b>
                      ))}
                    </span>
                  </div>

                  <div className='modal-grid__item'>
                    <span>الطبعة</span>:<b>{book?.objective?.info ?? '-'}</b>
                  </div>
                  <div className='modal-grid__item'>
                    <span>رقم المادة</span>:
                    <b>{book?.objective?.number ?? '-'}</b>
                  </div>
                  <div className='modal-grid__item'>
                    <span>النوع</span>:<b>{book?.objective?.type ?? '-'}</b>
                  </div>

                  {book?.objective?.link && (
                    <div className='modal-grid__item'>
                      <span>الرابط</span>:
                      <b>
                        <a
                          href={book?.objective?.link}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {book?.title}
                        </a>
                      </b>
                    </div>
                  )}
                </div>
              </div>

              <div className='modal-btns'>
                {book?.certificate_url && (
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${book?.certificate_url}`}
                    width='100%'
                    height={'500px'}
                  ></iframe>
                )}
              </div>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default BookModal;
