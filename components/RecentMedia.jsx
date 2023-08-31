import slugify from 'src/Helper/slugify';
import { Image } from 'react-bootstrap';
import SkeletonElement from 'components/Skeleton/SkeletonElement';
import placeHolder from 'public/assets/images/defaultImage.png';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';
import t from 'src/Locales/ar/translation.json';

const fetchRecent = url =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(res => res.json());

const SideNav = () => {
  const router = useRouter();
  const { tab, id } = router.query;

  const { data: category } = useSWR(
    [
      tab === 'versions'
        ? `/lessons/${tab}/3?loadSections=1&loadAttachments=0`
        : `/pgarticles/${tab}/0/3`,
      tab,
    ],
    (url, tab) => fetchRecent(url, tab)
  );

  return (
    <div className='sideBar recentBar'>
      {category?.data && category?.data.length > 1 && (
        <div className='recentBar__title'>
          <h4>{t.navbar.media.recent}</h4>
        </div>
      )}

      <div className='recent'>
        {category?.data && category?.data.length > 0 ? (
          <>
            {category?.data.map((recent, index) => (
              <div
                className='recentBar__item'
                key={index}
                style={recent.id == id ? { display: 'none' } : null}
              >
                <Link
                  href={`/${tab}/show/${recent.id}/${slugify(recent.title)}`}
                >
                  <div className='img'>
                    {recent.image_url ? (
                      <Image
                        alt=''
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${recent.image_url}`}
                        fluid
                      />
                    ) : (
                      <Image
                        alt=''
                        src={placeHolder}
                        fluid
                      />
                    )}
                  </div>
                  <div className='text'>
                    <h6 style={{ fontSize: '13px' }}>{recent.title}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <>
            {[1, 2, 3, 4].map(index => (
              <li key={index}>
                <SkeletonElement type='text' />
              </li>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SideNav;
