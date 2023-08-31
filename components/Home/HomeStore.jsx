import { Container, Row, Col } from 'react-bootstrap';
import storeImg from 'public/assets/images/store_pic.png';
import ShoppingImg from 'public/assets/images/shopping-cart.svg';
import Image from 'next/image';
import t from 'src/Locales/ar/translation.json';
function HomeStore() {
  return (
    <section className='home__store'>
      <Container>
        <Row>
          <Col md={5}>
            <Image
              alt=''
              src={storeImg}
              fluid
            />
          </Col>
          <Col md={1} />
          <Col
            md={6}
            className='d-flex justify-content-center  flex-column'
          >
            <h4>{t.shop}</h4>
            <p>
              تهدف إلى تأسيس المكتبات المتخصصة في الوقف ودعمها، وتزويدها بالكتب
              والدوريات والمصادر العلمية والمواد السمعية والبصرية والوسائل
              التعليمية والتثقيفية، وتوثيق الإنتاج العلمي، والمخطوطات العلمية
              وحيازة النسخ الأصلية، وإتاحتها للمستفيدين
            </p>

            <a
              className='mainBtn align-self-end'
              href='https://saee.store/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                alt=''
                src={ShoppingImg}
                fluid
              />
              <span>{t.shop}</span>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HomeStore;
