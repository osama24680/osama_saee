import useSWR from 'swr';
import SkeletonElement from 'components/Skeleton/SkeletonElement';
import { useRouter } from 'next/router';
import Link from 'next/link';
import t from 'src/Locales/ar/translation.json';
const categoryFetcher = url =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(data => data.json());

const SideNav = () => {
  const router = useRouter();
  const { tab, categoryid } = router.query;

  const { data: category } = useSWR(
    [
      `/${
        tab == 'employees' ? 'pgemployeecategories' : 'pgarticlecategories'
      }/${tab}/0/10`,
      tab,
    ],
    (url, tab) => categoryFetcher(url, tab)
  );

  return (
    <div className='sideBar'>
      <h4>{t.navbar.media.categores}</h4>

      <div>
        <ul className='arrow-ul'>
          <li className={categoryid == 0 ? 'active' : ''}>
            <Link
              href={`${
                tab == undefined ? `/employees/0/1` : `/media-center/${tab}/0/1`
              }`}
            >
              {t.btns.all}
            </Link>
          </li>
          {category?.data.length > 0 && (
            <>
              {category.data.map((cate, index) => (
                <li
                  key={index}
                  className={cate.id == categoryid ? 'active' : ''}
                >
                  <Link
                    href={`${
                      tab == undefined
                        ? `/employees/${cate.id}/1`
                        : `/media-center/${tab}/${cate.id}/1`
                    }`}
                  >
                    {cate.title}
                  </Link>
                </li>
              ))}
            </>
          )}
          {!category?.data && (
            <>
              {[1, 2, 3, 4].map(index => (
                <li key={index}>
                  <SkeletonElement type='text' />
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
