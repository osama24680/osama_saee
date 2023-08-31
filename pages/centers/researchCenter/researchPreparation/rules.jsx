import { useContext } from 'react';

import CentersTemplate from 'src/templates/centers/CentersTemplate';

import StaticPagesContext from 'src/context/staticPages-context';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import SIDE_TABS from 'src/data/sideTabs.data.json';
import UPPER_TABS from 'src/data/upperTabs.data.json';

const Rules = () => {
  const pageName = 'researchPreparation';
  const tabName = 'rules';

  const pageData =
    useContext(StaticPagesContext)[`researchCenter_${pageName}_${tabName}`];

  const pageTitle = t.navbar.centers.researchesAndStudiesCenter;

  const sideTabs = SIDE_TABS.tabs;
  const tabsTitle = SIDE_TABS.title;

  const upperTabs = UPPER_TABS[pageName];

  return (
    <CentersTemplate
      parentTitle={tShared.home}
      pageData={pageData}
      pageTitle={pageTitle}
      mainTitle={t.main_title}
      sideTabs={sideTabs}
      upperTabs={upperTabs}
      tabsTitle={tabsTitle}
    />
  );
};

export default Rules;
