import { useRouter } from 'next/router';

import StudyTemplate from 'src/templates/centers/researchCenter/researchPreparation/studiesDisplay/StudyTemplate';

import useFetch from 'src/Helper/useFetch';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

import v from 'src/adapters/vocab.json';

const StudyPage = () => {
  const studyId = useRouter().query.studyId;

  const apiPage = v.pgArticles;
  const apiType = 'researches';

  const { data: studyData } = useFetch(
    `/${apiPage}/${apiType}/show/${studyId}/1/0?loadSections=1&loadAttachments=1`
  );

  return (
    <StudyTemplate
      parentTitle={tShared.home}
      mainTitle={t.main_title}
      pageData={studyData}
    />
  );
};

export default StudyPage;
