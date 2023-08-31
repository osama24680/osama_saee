import { Container } from 'react-bootstrap';
import Link from 'next/link';

const Header = ({ bgSize, title, parentTitle, children }) => {
  return (
    <div
      className={`mainHeader ${bgSize == 'small' ? 'smHeight' : 'bigHeight'}`}
    >
      {children}

      {(title || parentTitle) && (
        <Container className='title_header d-flex justify-content-between align-items-center '>
          <div className='my-3 d-flex  justify-content-center '>
            <h2>
              <Link
                style={{
                  color: 'inherit',
                }}
                href={`/`}
              >
                {parentTitle}
              </Link>
            </h2>
            <h2>
              <span
                style={{
                  margin: '0rem 0.5rem',
                }}
              >
                {' > '}
              </span>

              {title}
            </h2>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Header;
