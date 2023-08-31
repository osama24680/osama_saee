import Link from 'next/link';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';

import img1 from 'public/assets/images/research_pic.png';
import img2 from 'public/assets/images/magazine_pic.png';
import img3 from 'public/assets/images/media_pic.png';
import img4 from 'public/assets/images/library_pic.png';
import waqff from 'public/assets/images/magazine_logo.png';
import watheqhLogo from 'public/assets/images/watheqh_logo.png';

import t from 'src/Locales/ar/translation.json';

function HomeCenters() {
  return (
    <section className=' home__centers'>
      <Container>
        <div className='home__centers--center'>
          <Row>
            <Col md={4}>
              <Image
                alt=''
                src={img1}
                fluid
              />
            </Col>
            <Col md={1} />

            <Col md={4}>
              <div className='center-text'>
                <h4>{t.navbar.centers.researchesAndStudiesCenter}</h4>
                <p>
                  أضخم مركز بحثي سعودي في الأوقاف من ناحية الإنتاج العلمي، متخصص
                  برصد الأعمال العلمية المتنوعة والتعريف بها ونشــرها، وإعـــداد
                  الأبحــاث والدراسات الوقفية ذات الأولية، وإصدار الموسوعات
                  العلمية
                </p>

                <div className='numbersGrid bigNum mb-5'>
                  <div className='gridItem'>
                    <span>
                      +75<b>منتج علمي متنوع في مجالات الأوقاف</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      3<b>موسوعات علمية نوعية</b>
                    </span>
                  </div>
                </div>

                <Link
                  href={{
                    pathname: '/static/researches',
                    state: {
                      staticLink: `/media-center/researches/0/1`,
                    },
                  }}
                  className='mainBtn'
                >
                  إقرأ المزيد
                </Link>
              </div>
            </Col>
            <Col md={1} />
            <Col md={2}>
              <ul className='footer__links'>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    الأولويات البحثية
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    إعداد البحوث العلمية
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    نشر الأعمال العلمية
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
        <div className='home__centers--center'>
          <Row>
            <Col md={5}>
              <Image
                alt=''
                src={img2}
                fluid
              />
            </Col>

            <Col md={1} />

            <Col md={6}>
              <div className='center-text'>
                <h4>
                  <Image
                    alt=''
                    src={waqff}
                    fluid
                    style={{
                      width: '60px',
                      objectFit: 'contain',
                      marginInlineEnd: '0.5rem',
                    }}
                  />
                  مجلة وقف
                </h4>
                <p>
                  المجلة العلمية المحكَّمة لدراســات الأوقـــاف، تصــدر بشكـــل
                  نصف سنـــوي، مسجــلة في مكتبـــة المـــلك فــهـــــــد
                  الوطــنيــــــة برقـــم الإيـــداع 12133/1441 ومرخصـــة في
                  وزارة الإعــــلام بترخيص رقم 395 معتمـــدة برقـــم معيـــــاري
                  دولي وهي ضمـــن قواعد بيانات دار المنظومة
                </p>

                <div className='numbersGrid bigNum mb-5'>
                  <div className='gridItem'>
                    <span>
                      5<b>أعداد للمجلة</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      12<b>بحث</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      43<b>فعالية</b>
                    </span>
                  </div>
                </div>

                <Link
                  href={{
                    pathname: '/static/magazines',
                    state: {
                      staticLink: `/media-center/magazines/0/1`,
                    },
                  }}
                  className='mainBtn'
                >
                  إقرأ المزيد
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className='home__centers--center'>
          <Row>
            <Col md={6}>
              <div className='center-text'>
                <h4>مركز الإعلام الوقفي</h4>
                <p>
                  بأســاليب عصــــرية وأفكــــار مميزة ننشــــر ثـقــــافة
                  الـــوقـف بين المجتمع، وفق أحدث معــايير الإنتــاج الإعلامي في
                  جميع وسائل التواصل الاجتماعي
                </p>

                <div
                  className='numbersGrid bigNum mb-5'
                  style={{
                    gap: '3rem',
                  }}
                >
                  <div className='gridItem'>
                    <span>
                      1.000.000
                      <b>إجمالي التفاعل على وسائل التواصل المختلفة</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      +250<b>منتج إعلامي متنوع وحديث</b>
                    </span>
                  </div>
                </div>

                <Link
                  href={{
                    pathname: '/static/mediaCenter',
                    state: {
                      staticLink: `/media-center/media/0/1`,
                    },
                  }}
                  className='mainBtn'
                >
                  إقرأ المزيد
                </Link>
              </div>
            </Col>
            <Col md={1} />

            <Col md={5}>
              <Image
                alt=''
                src={img3}
                fluid
              />
            </Col>
          </Row>
        </div>
        <div className='home__centers--center'>
          <Row>
            <Col md={5}>
              <Image
                alt=''
                src={img4}
                fluid
              />
            </Col>

            <Col md={1} />

            <Col md={6}>
              <div className='center-text'>
                <h4>المكتبة الوقفية</h4>
                <p>
                  أكبر مكتبة سعودية متخصصة في مجال الأوقاف، تنقسم إلى المكتبـة
                  الإلكترونية والمكتبـة الورقية وتعـد المكتبة بنك معرفي ومخــزون
                  علمي متنوع ومتجدد في جميع مجــالات الوقف، ذات قسمين (ورقي -
                  إلكتروني) ويقع مقر المكتبة الورقية بمكتبة جامع الراجحي بالرياض
                </p>

                <div
                  className='numbersGrid bigNum mb-5'
                  style={{
                    gap: '3rem',
                  }}
                >
                  <div className='gridItem'>
                    <span>
                      +2400
                      <b>كتاب ورقي وإلكتروني</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      20<b>مجال متنوع في الأوقاف</b>
                    </span>
                  </div>
                </div>

                <Link
                  href='/books/0/1'
                  className='mainBtn'
                >
                  إقرأ المزيد
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className='home__centers--center'>
          <Row>
            <Col md={6}>
              <div className='center-text'>
                <Image
                  alt=''
                  src={watheqhLogo}
                  fluid
                  style={{
                    width: '180px',
                    marginBottom: '8px',
                  }}
                />
                <p>
                  أول مركـز متخصص يقدم استشـارات وقفية مجــانية، يهدف إلى تقديم
                  الاستشارات وصياغة الوثائق الوقفيـة تـأسيســـاً وتطـــــويراً{' '}
                </p>

                <div
                  className='numbersGrid bigNum mb-5'
                  style={{
                    gap: '3rem',
                  }}
                >
                  <div className='gridItem'>
                    <span>
                      68.000.000
                      <b>قيمة الأوقاف المستفيدة من المركز</b>
                    </span>
                  </div>
                  <div className='gridItem'>
                    <span>
                      +500
                      <b>ساعة استشارية</b>
                    </span>
                  </div>
                </div>

                <Link
                  href='/media-center/docs/0/1'
                  className='mainBtn'
                >
                  إقرأ المزيد
                </Link>
              </div>
            </Col>
            <Col md={1} />
            <Col
              md={5}
              className='d-flex align-items-center'
            >
              <ul className='footer__links'>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    استشارات مكتوبة
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    مقابلة في المركز
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    مقابلة خارج المركز
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    صياغة الوثائق الوقفية
                  </Link>
                </li>
                <li>
                  <Link
                    className='footer__link'
                    href='/'
                  >
                    إعداد اللوائح والأنظمة
                  </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default HomeCenters;
