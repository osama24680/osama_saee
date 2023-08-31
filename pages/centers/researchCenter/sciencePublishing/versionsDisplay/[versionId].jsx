import { useRouter } from 'next/router';

import VersionTemplate from 'src/templates/centers/researchCenter/sciencePublishing/versionsDisplay/VersionTemplate';

import useFetch from 'src/Helper/useFetch';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

const VersionPage = () => {
  const versionId = useRouter().query.versionId;

  const apiPage = 'lessons';
  const apiType = 'versions';

  const { data: versionData } = useFetch(
    `/${apiPage}/${apiType}/show/${versionId}/1/0?loadSections=1&loadAttachments=1`
  );

  return (
    <VersionTemplate
      parentTitle={tShared.home}
      mainTitle={t.main_title}
      pageData={versionData}
    />
  );
};

export default VersionPage;
