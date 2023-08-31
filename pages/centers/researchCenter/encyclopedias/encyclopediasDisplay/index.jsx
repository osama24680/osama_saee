import { useState } from 'react';
import { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';

import CentersTemplate from 'src/templates/centers/CentersTemplate';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import v from 'src/adapters/vocab.json';

import SIDE_TABS from 'src/data/sideTabs.data.json';
import UPPER_TABS from 'src/data/upperTabs.data.json';

import useFetch from 'src/Helper/useFetch';
import ListView from 'src/atoms/ListView';
import GridCard from 'src/organisms/GridCard';

const EncyclopediasDisplay = () => {
  const router = useRouter();

  const [SelectedPage, setSelectedPage] = useState(1);

  const pageName = 'encyclopedias';

  const pageTitle = t.navbar.centers.researchesAndStudiesCenter;

  const sideTabs = SIDE_TABS.tabs;
  const tabsTitle = SIDE_TABS.title;

  const upperTabs = UPPER_TABS[pageName];

  const apiPage = v.pgArticles;
  const apiType = v.allEncyclopedias;
  const ItemsPerPage = 12;

  const { data: itemsList, meta: paginationInfo } = useFetch(
    `/${apiPage}/${apiType}/0/${ItemsPerPage}?page=${SelectedPage}`
  );

  const handlePageClick = pageId => {
    setSelectedPage(pageId.selected + 1);
  };

  const dynamicContent = itemsList?.map(item => (
    <GridCard
      key={item.id}
      href={`${router.asPath}/${item.id}`}
      imgSrc={item.image_url}
      imgAlt={item.title.ar}
      title={item.title.ar}
      buttonContent={t.btns.more}
    />
  ));

  return (
    <CentersTemplate
      parentTitle={tShared.home}
      pageTitle={pageTitle}
      mainTitle={t.main_title}
      sideTabs={sideTabs}
      upperTabs={upperTabs}
      tabsTitle={tabsTitle}
    >
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

export default EncyclopediasDisplay;
