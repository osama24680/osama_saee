import CentersTemplate from 'src/templates/centers/CentersTemplate';

import t from 'src/Locales/ar/translation.json';

import SIDE_TABS from 'src/data/sideTabs.data.json';
import UPPER_TABS from 'src/data/upperTabs.data.json';
import { ReserveTitleForm } from 'src/organisms/ReserveTitleForm';

const ReserveTitle = () => {
  const pageName = 'researchPriority';

  const pageTitle = t.navbar.centers.researchesAndStudiesCenter;

  const sideTabs = SIDE_TABS.tabs;
  const tabsTitle = SIDE_TABS.title;

  const upperTabs = UPPER_TABS[pageName];

  const dropDownOptions = [
    { value: null, key: `${t.forms.select.selected}` },
    { value: 'option 1', key: `${t.forms.select.selection1}` },
    { value: 'option 2', key: `${t.forms.select.selection2}` },
    { value: 'option 3', key: `${t.forms.select.selection3}` },
  ];
  return (
    <CentersTemplate
      parentTitle={t.navbar.home}
      pageTitle={pageTitle}
      mainTitle={t.main_title}
      sideTabs={sideTabs}
      upperTabs={upperTabs}
      tabsTitle={tabsTitle}
    >
      <ReserveTitleForm
        endPoint={`https://api.saee.org.sa/pgenquiries/reservesubject/create?special[researchsubject]=&name&special[phone]&email`}
        options={dropDownOptions}
      />{' '}
    </CentersTemplate>
  );
};

export default ReserveTitle;
