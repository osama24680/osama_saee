import { Container } from 'react-bootstrap';

import { A11y, Autoplay, Navigation, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import SkeletonBlog from 'components/Skeleton/SkeletonBlog';
import Image from 'next/image';
import useFetch from 'src/Helper/useFetch';
import t from 'src/Locales/ar/translation.json';

function HomePartners() {
  const { data } = useFetch('/pgarticles/partner/1/10');

  return (
    <div className=' home__partners'>
      <Container>
        <h4>شركاؤنا</h4>
        <Swiper
          modules={[Pagination, A11y, Navigation, Autoplay]}
          spaceBetween={40}
          slidesPerView={4}
          pagination={{ clickable: true }}
          className='swiper-news'
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {data && data?.length > 0 && (
            <>
              {data.map(partner => (
                <SwiperSlide key={partner.id}>
                  <a
                    href={partner.content['ar']}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${partner.image_url}`}
                      loading='lazy'
                      width={200}
                      height={200}
                      alt='Partener'
                    />
                  </a>
                </SwiperSlide>
              ))}
            </>
          )}

          {!data && (
            <>
              {[...Array(4).keys()].map(index => (
                <SwiperSlide key={index}>
                  <SkeletonBlog />
                </SwiperSlide>
              ))}
            </>
          )}

          {data && data.length === 0 && (
            <h3 className='text-center'>{t.noData}</h3>
          )}
        </Swiper>
      </Container>
    </div>
  );
}

export default HomePartners;
