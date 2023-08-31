import { useState } from 'react';
import SvgFaceBook from 'components/Icons/SvgFaceBook';
import SvgTwitter from 'components/Icons/SvgTwitter';
import SvgPrint from 'components/Icons/SvgPrint';
import SvgError from 'components/Icons/SvgError';
import SvgShare from 'components/Icons/SvgShare';
import { Modal } from 'react-bootstrap';
import SvgWhatsApp from 'components/Icons/SvgWhatsApp';
import SvgTelegram from 'components/Icons/SvgTelegram';
import SvgLinkedIn from 'components/Icons/SvgLinkedIn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import t from 'src/Locales/ar/translation.json';

const apiUrl = 'https://api.saee.org.sa/';

function ShareBox() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className='shareBox'>
        <a
          href={`https://www.facebook.com/sharer.php?u=${apiUrl}${router.pathname}`}
          target='_blank'
          rel='noopener noreferrer'
          className='shareBox__item'
          title={t.share}
        >
          <SvgFaceBook
            fill='#FFF'
            width={30}
            height={20}
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${apiUrl}${router.pathname}`}
          target='_blank'
          rel='noopener noreferrer'
          className='shareBox__item'
          title={t.share}
        >
          <SvgTwitter
            fill='#FFF'
            width={30}
            height={20}
          />
        </a>
        <a
          rel='noopener noreferrer'
          className='shareBox__item'
          onClick={() => {
            setOpenModal(true);
          }}
          style={{
            cursor: 'pointer',
          }}
        >
          <SvgShare
            fill='#FFF'
            width={30}
            height={20}
          />
        </a>
        <a
          rel='noopener noreferrer'
          className='shareBox__item'
          onClick={() => {
            window.print();
          }}
          style={{
            cursor: 'pointer',
          }}
          title={t.print}
        >
          <SvgPrint
            fill='#FFF'
            width={30}
            height={20}
          />
        </a>
        <Link
          style={{
            cursor: 'pointer',
          }}
          href={`/contact-us`}
          className='shareBox__item'
          title={t.send_error}
        >
          <SvgError
            fill='#FFF'
            width={30}
            height={22}
            scale={0.3}
          />
        </Link>
      </div>

      <Modal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
        dialogClassName='modal-book'
        aria-labelledby='photos-title'
        centered
        size='lg'
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <div
            className='shareBox'
            style={{
              justifyContent: 'center',
            }}
          >
            <a
              href={`https://api.whatsapp.com/send?text=${apiUrl}${router.pathname}`}
              target='_blank'
              rel='noopener noreferrer'
              className='shareBox__item'
              title={t.share}
            >
              <SvgWhatsApp
                fill='#FFF'
                width={30}
                height={20}
              />
            </a>

            <a
              rel='noopener noreferrer'
              target='_blank'
              className='shareBox__item'
              href={`https://telegram.me/share/url?url=${apiUrl}${router.pathname}`}
            >
              <SvgTelegram
                fill='#FFF'
                width={25}
                height={20}
              />
            </a>
            <a
              rel='noopener noreferrer'
              target='_blank'
              className='shareBox__item'
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${apiUrl}${router.pathname}`}
            >
              <SvgLinkedIn
                fill='#FFF'
                width={30}
                height={20}
              />
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShareBox;
