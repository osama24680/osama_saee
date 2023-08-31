import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

import ListView from 'src/atoms/ListView';
import GridView from 'src/atoms/GridView';
import CategoryButton from 'src/atoms/CategoryButton';

import GridCard from 'src/organisms/GridCard';

import CentersTemplate from 'src/templates/centers/CentersTemplate';

import useFetch from 'src/Helper/useFetch';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import SIDE_TABS from 'src/data/sideTabs.data.json';
import UPPER_TABS from 'src/data/upperTabs.data.json';

const VersionsDisplay = () => {
  const router = useRouter();

  const [SelectedPage, setSelectedPage] = useState(1);
  const [CategoryId, setCategoryId] = useState('');

  const pageName = 'sciencePublishing';

  const pageTitle = t.navbar.centers.researchesAndStudiesCenter;

  const sideTabs = SIDE_TABS.tabs;
  const tabsTitle = SIDE_TABS.title;

  const upperTabs = UPPER_TABS[pageName];

  const apiPage = 'lessons';
  const apiType = 'versions';
  const ItemsPerPage = 12;

  const fetchURL =
    CategoryId === ''
      ? `/${apiPage}/${apiType}/${ItemsPerPage}?loadSections=0&loadAttachments=0&page=${SelectedPage}`
      : `/course/sections/${apiType}/many_lessons/${CategoryId}/${ItemsPerPage}?loadSections=0&loadAttachments=0&page=${SelectedPage}`;

  const { data: itemsList, meta: paginationInfo } = useFetch(fetchURL);

  const { data: categories } = useFetch(`/course/sections/${apiType}/500`);

  const handlePageClick = pageId => {
    setSelectedPage(pageId.selected + 1);
  };

  const dynamicContent = itemsList?.map(item => (
    <GridCard
      key={item.id}
      href={`${router.asPath}/${item.id}`}
      imgSrc={item.image_url}
      imgAlt={item.title}
      title={item.title}
      buttonContent={t.btns.more}
    />
  ));

  const showAllCategories = [
    <CategoryButton
      key={0}
      active={CategoryId === ''}
      onClick={() => setCategoryId('')}
    >
      {t.btns.all}
    </CategoryButton>,
  ];

  const categoriesList = showAllCategories.concat(
    categories?.map(category => (
      <CategoryButton
        key={category.id}
        active={CategoryId === category.id}
        onClick={() => setCategoryId(category.id)}
      >
        {category.title}
      </CategoryButton>
    ))
  );

  return (
    <CentersTemplate
      parentTitle={tShared.home}
      pageTitle={pageTitle}
      mainTitle={t.main_title}
      sideTabs={sideTabs}
      upperTabs={upperTabs}
      tabsTitle={tabsTitle}
    >
      <GridView>{categoriesList}</GridView>

      <ListView>{dynamicContent}</ListView>

      {paginationInfo?.total > ItemsPerPage && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={paginationInfo?.last_page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      )}
    </CentersTemplate>
  );
};

export default VersionsDisplay;
