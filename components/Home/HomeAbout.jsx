import { useContext, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import playBtn from 'public/assets/images/svg/ic_play-button.svg';
import VideoImage from 'public/assets/images/video-bg.png';
import VisionImage from 'public/assets/images/svg/ic_vision.svg';
import MessageImage from 'public/assets/images/svg/ic_message.svg';
import ValuessImage from 'public/assets/images/svg/ic_values.svg';
import Image from 'next/image';
import StaticPagesContext from 'src/context/staticPages-context';

function HomeAbout() {
  const [show, setShow] = useState(false);

  const staticPages = useContext(StaticPagesContext);

  return (
    <section className='paddingTop home__about'>
      <Container>
        <div className='home__about--text'>
          <Row>
            <Col md={2} />
            <Col md={5}>
              <h2>ساعي في أرقام</h2>

              <p>
                إحدى مؤسسات وقف الشيخ سليمان بن عبدالعزيز الراجحي، وهي مؤسســة
                أهلية مستقلة غير ربحية، متخصصـة في التطــوير العلمي والمهني
                للوقـف، بهدف خدمته علميًـا ونشره في المجتمـع، وخــدمـة القائمين
                عليه والمستفيدين منه، والجهات ذات العلاقة به، وتقديم الحلول
                والتطبيقات المناسبة
              </p>
            </Col>
            <Col md={5}>
              <button
                className='aboutPlayImages'
                onClick={() => setShow(true)}
              >
                <Image
                  alt=''
                  src={VideoImage}
                  fluid
                />
                <Image
                  alt=''
                  src={playBtn}
                  fluid
                />
              </button>
            </Col>
            <Modal
              show={show}
              onHide={() => {
                setShow(false);
              }}
              dialogClassName='modal-book'
              aria-labelledby='photos-title'
              centered
              size='lg'
            >
              <Modal.Header closeButton />
              <Modal.Body>
                {staticPages['previewVideo']?.file_url && (
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${staticPages['previewVideo']?.file_url}`}
                    width='100%'
                    height={'500px'}
                  ></iframe>
                )}

                <iframe
                  src={`${process.env.NEXT_PUBLIC_API_URL}//storage/bfef324c-3f97-45ea-ad41-7a45c94d3ad6.mp4`}
                  width='100%'
                  height={'500px'}
                ></iframe>
              </Modal.Body>
            </Modal>
          </Row>
        </div>
      </Container>

      <Row>
        <Col md={2} />
        <Col md={10}>
          <div className='home__about--numbers'>
            <Row>
              <Col md={1} />
              <Col md={5}>
                <div className='numbersGrid bigNum'>
                  <div className='gridItem'>
                    <p>إنشاء أوقاف محلية وعالمية بأكثر من</p>
                    <span>
                      +20
                      <b>مليون ريال</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <p>قيمة الأوقاف المستفيدة من المركز</p>
                    <span>
                      +68
                      <b>مليون ريال</b>
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className='numbersGrid'>
                  <div className='gridItem'>
                    <span>
                      +500
                      <b>ساعة استشارية</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      +800
                      <b>منتج علمي</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      +300
                      <b>منتج إعلامي</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      +2300
                      <b>كتابا بالمكتبة الرقمية</b>
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Container>
        <Row>
          <Col md={2} />
          <Col md={10}>
            <div className='home__about--grid'>
              <div className='grid-item'>
                <div className='gridTop'>
                  <Image
                    alt=''
                    src={VisionImage}
                    fluid
                  />
                  <h5>الرؤية</h5>
                </div>
                <p>التميز في تطوير الأوقاف ونشر ثقافتها</p>
              </div>
              <div className='grid-item'>
                <div className='gridTop'>
                  <Image
                    alt=''
                    src={MessageImage}
                    fluid
                  />
                  <h5>الرسالة</h5>
                </div>
                <p>
                  الإسهـــام في تمكين الأوقــاف من خـــلال الإنتــاج العلمــــي،
                  والتطــــــــويــر الإداري، والاتصـــــــــال المجتمعي، وفق
                  أفضل الممارسات المؤسسية
                </p>
              </div>
              <div className='grid-item'>
                <div className='gridTop'>
                  <Image
                    alt=''
                    src={ValuessImage}
                    fluid
                  />
                  <h5>قيمنا</h5>
                </div>
                <p>الموضوعية، الريادة، الابتكار، الشراكة، الالتزام</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HomeAbout;
