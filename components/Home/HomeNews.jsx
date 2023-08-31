import { useRouter } from 'next/router';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import Link from 'next/link';
import slugify from 'src/Helper/slugify';
import stripHtml from 'src/Helper/stripHtml';
import useFetch from 'src/Helper/useFetch';
import SkeletonBlog from 'components/Skeleton/SkeletonBlog';

function HomeMedia() {
  const { data: blog } = useFetch('/pgarticles/news/1/1');
  const { data: blogs } = useFetch('/pgarticles/news/1/5');
  const router = useRouter();
  function newclick(url) {
    router.push(url);
  }

  return (
    <div className='home__media paddingTop'>
      <Container>
        <h3 className='mainTitle'>أخبار ومقالات</h3>
        <Row>
          <Col
            md={6}
            className='mt-md-0 mt-3'
          >
            <div className='home__media--blog'>
              {blog?.length > 0 && (
                <>
                  {blog.map(item => (
                    <Card
                      key={item.id}
                      onClick={() =>
                        newclick(
                          `/news/show/${item.id}/${slugify(item.title['ar'])}`
                        )
                      }
                    >
                      <Card.Img
                        variant='top'
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image_url}`}
                      />
                      <Card.Body>
                        <div className='blog-item__date'>
                          <span>{item.author && item.author.name}</span>
                          <span className='mx-2'>|</span>
                          <span>{item.publish_date}</span>
                        </div>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text className='mb-3'>
                          {stripHtml(item.content.content).substring(0, 150)}
                        </Card.Text>
                        <Link
                          className='mainBtn'
                          href={`/news/show/${item.id}/${slugify(
                            item.title['ar']
                          )}`}
                        >
                          اقـرأ المـزيد
                        </Link>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              )}

              {!blog?.length && (
                <>
                  {[1].map(key => (
                    <SkeletonBlog key={key} />
                  ))}
                </>
              )}
            </div>
          </Col>

          <Col md={6}>
            <div className='home__media--news'>
              {blog?.length > 0 && blogs?.length > 0 && (
                <>
                  {blogs.map(item => (
                    <Link
                      href={`/news/show/${item.id}/${slugify(item.title)}`}
                      key={item.id}
                      style={{
                        display: blog[0].id === item.id ? 'none' : 'block',
                      }}
                    >
                      <div className='news-item'>
                        <div className='news-item__img'>
                          <Image
                            alt=''
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.image_url}`}
                            fluid
                            layout='fill'
                          />
                        </div>
                        <div className='news-item__content'>
                          <div className='news-item__date'>
                            <span>{item.author && item.author.name}</span>
                            <span className='mx-2'>|</span>
                            <span>{item.publish_date}</span>
                          </div>
                          <h2>{item.title}</h2>
                          <p>
                            {stripHtml(item.content.content).substring(0, 150)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </>
              )}

              {!blogs?.length > 0 && (
                <>
                  {[1, 2, 3].map(key => (
                    <SkeletonBlog key={key} />
                  ))}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeMedia;
