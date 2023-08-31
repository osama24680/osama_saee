import CentersTemplate from 'src/templates/centers/CentersTemplate';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import SIDE_TABS from 'src/data/sideTabs.data.json';
import UPPER_TABS from 'src/data/upperTabs.data.json';
import { SuggestEncyclopediaForm } from 'src/organisms/SuggestEncyclopediaForm';

const SuggestEncyclopedia = () => {
  const pageName = 'encyclopedias';

  const pageTitle = t.navbar.centers.researchesAndStudiesCenter;

  const sideTabs = SIDE_TABS.tabs;
  const tabsTitle = SIDE_TABS.title;

  const upperTabs = UPPER_TABS[pageName];

  return (
    <CentersTemplate
      parentTitle={tShared.home}
      pageTitle={pageTitle}
      mainTitle={t.main_title}
      sideTabs={sideTabs}
      upperTabs={upperTabs}
      tabsTitle={tabsTitle}
    >
      <SuggestEncyclopediaForm
        endPoint={`https://api.saee.org.sa/pgenquiries/encyclopedias/create?special[encyclopediabrief]&special[encyclopediabrief]&name&special[phone]&email`}
      />
    </CentersTemplate>
  );
};

export default SuggestEncyclopedia;
