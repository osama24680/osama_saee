import JoinSaee from 'src/templates/JoinSaee';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const joinSaee = () => {
  const parentTitle = tShared.home;
  const pageTitle = t.navbar.joinSaee.title;
  const mainTitle = t.main_title;

  return (
    <JoinSaee
      parentTitle={parentTitle}
      pageTitle={pageTitle}
      mainTitle={mainTitle}
    />
  );
};

export default joinSaee;
