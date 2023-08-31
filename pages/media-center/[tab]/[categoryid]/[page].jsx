import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';

import Layout from 'src/organisms/Layout';

import Blogs from 'components/Blogs/Blogs';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const Media = () => {
  const router = useRouter();

  const tab = router.query.tab;
  const handleTitleName = () => {
    if (tab === 'projects') {
      return t.navbar.media.projects;
    } else if (tab === 'news') {
      return t.navbar.media.news;
    } else if (tab == 'books') {
      return 'المكتبة الوقفية';
    } else if (tab == 'magazines') {
      return 'مجلة واقف';
    } else if (tab == 'researches') {
      return t.navbar.centers.researchesAndStudiesCenter;
    } else if (tab == 'infos') {
      return 'مركز المعلومات';
    } else if (tab == 'media') {
      return 'مركز الإعلام والإتصال الوقفي';
    }
  };

  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={handleTitleName()}
    >
      <Helmet>
        <title>{`${handleTitleName()} - ${t.main_title}`}</title>
      </Helmet>

      <div className='media-center  mb-5'>
        <Blogs />
      </div>
    </Layout>
  );
};

export default Media;
