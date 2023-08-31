import { useContext } from 'react';

import CentersTemplate from 'src/templates/centers/CentersTemplate';

import StaticPagesContext from 'src/context/staticPages-context';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import SIDE_TABS from 'src/data/sideTabs.data.json';

const About = () => {
  const pageData = useContext(StaticPagesContext).researchCenter_about;

  const pageTitle = t.navbar.centers.researchesAndStudiesCenter;

  const sideTabs = SIDE_TABS.tabs;
  const tabsTitle = SIDE_TABS.title;

  return (
    <CentersTemplate
      parentTitle={tShared.home}
      pageData={pageData}
      pageTitle={pageTitle}
      mainTitle={t.main_title}
      sideTabs={sideTabs}
      tabsTitle={tabsTitle}
    />
  );
};

export default About;
