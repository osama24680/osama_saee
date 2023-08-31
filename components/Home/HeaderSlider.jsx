import Link from 'next/link';

export const HomeSlider = () => {
  return (
    <div className='header__content--text'>
      <h2>لخير يبقى ... للأجيال</h2>
      <p>
        ساعي مؤسسة وقفية غير ربحية، متخصصة في البحث العلمي في الوقف وتطوير
        إدارته، ونشر ثقافته
      </p>

      <Link
        href='/contact-us'
        className='headerBtn'
      >
        <span>اطلب إستشارة</span>
      </Link>
    </div>
  );
};

export default HomeSlider;
