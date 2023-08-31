import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import defaultImg from 'public/assets/images/library_default.jpg';
import slugify from 'src/Helper/slugify';
import t from 'src/Locales/ar/translation.json';

function BookCard({ book, setModalData, setShow, type }) {
  const router = useRouter();

  return (
    <Card className='bookCard'>
      {book.image_url && (
        <Card.Img
          variant='top'
          src={`${process.env.NEXT_PUBLIC_API_URL}/${book.image_url}`}
          loading='lazy'
        />
      )}
      {!book.image_url && (
        <Card.Img
          variant='top'
          src={defaultImg}
          loading='lazy'
        />
      )}

      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <span>
          {t.price}:{book.brief.book_price}
          <b>{t.sar}</b>
        </span>

        <a
          className='mainBtn mainBtn--light'
          rel='noopener noreferrer'
          onClick={() => {
            if (type !== 'books') {
              router.push(
                `/${type}/show/${book.id}/${slugify(
                  book.title['ar'] || book.title
                )}`
              );
            } else {
              setModalData && type === 'books' && setModalData(book);
              setShow && type === 'books' && setShow(true);
            }
          }}
          style={{
            cursor: 'pointer',
          }}
        >
          المزيد
        </a>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
