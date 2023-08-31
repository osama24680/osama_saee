import HomeLayout from 'src/organisms/HomeLayout';

import HomeAbout from 'components/Home/HomeAbout';
import HomeCenters from 'components/Home/HomeCenters';
import HomeNews from 'components/Home/HomeNews';
import HomePartners from 'components/Home/HomePartners';
import HomeStore from 'components/Home/HomeStore';
import SearchingNav from 'components/SearchingNav';

const Home = () => {
  return (
    <HomeLayout>
      <SearchingNav />

      <HomeAbout />

      <HomeNews />

      <HomeCenters />

      <HomeStore />

      <HomePartners />
    </HomeLayout>
  );
};

export default Home;
