import { useRouter } from 'next/router';

import EncyclopediaTemplate from 'src/templates/centers/researchCenter/encyclopedias/encyclopediasDisplay/EncyclopediaTemplate';

import useFetch from 'src/Helper/useFetch';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import v from 'src/adapters/vocab.json';

const EncyclopediaPage = () => {
  const encyclopediaId = useRouter().query.encyclopediaId;

  const apiPage = v.pgArticles;
  const apiType = v.allEncyclopedias;

  const { data: encyclopediaData } = useFetch(
    `/${apiPage}/${apiType}/show/${encyclopediaId}/1/0?loadSections=1&loadAttachments=1`
  );

  return (
    <EncyclopediaTemplate
      parentTitle={tShared.home}
      mainTitle={t.main_title}
      pageData={encyclopediaData}
    />
  );
};

export default EncyclopediaPage;
