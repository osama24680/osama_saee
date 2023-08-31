import { useContext } from 'react';

import CentersTemplate from 'src/templates/centers/CentersTemplate';

import StaticPagesContext from 'src/context/staticPages-context';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import v from 'src/adapters/vocab.json';

import SIDE_TABS from 'src/data/sideTabs.data.json';
import UPPER_TABS from 'src/data/upperTabs.data.json';

import useFetch from 'src/Helper/useFetch';

const ResearchTopics = () => {
  const pageName = 'researchPriority';
  const tabName = 'researchTopics';

  const pageData =
    useContext(StaticPagesContext)[`researchCenter_${pageName}_${tabName}`];

  const pageTitle = t.navbar.centers.researchesAndStudiesCenter;

  const sideTabs = SIDE_TABS.tabs;
  const tabsTitle = SIDE_TABS.title;

  const upperTabs = UPPER_TABS[pageName];

  const apiPage = v.pgArticles;
  const apiType = v.researchSubjects;

  const { data: itemsList } = useFetch(`/${apiPage}/${apiType}/0/1000`);

  const dynamicContent = itemsList?.map((item, i) => (
    <p key={item.id}>
      {i + 1}&nbsp;-&nbsp;{item.title.ar}
    </p>
  ));

  return (
    <CentersTemplate
      parentTitle={tShared.home}
      pageData={pageData}
      pageTitle={pageTitle}
      mainTitle={t.main_title}
      sideTabs={sideTabs}
      upperTabs={upperTabs}
      tabsTitle={tabsTitle}
    >
      {dynamicContent}
    </CentersTemplate>
  );
};

export default ResearchTopics;
