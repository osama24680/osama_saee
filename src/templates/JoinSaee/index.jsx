import JoinSaeeForm from 'src/organisms/JoinSaeeForm';

import Layout from 'src/organisms/Layout';

const JoinSaee = ({ parentTitle, pageTitle, mainTitle }) => {
  return (
    <Layout
      parentTitle={parentTitle}
      pageTitle={pageTitle}
      mainTitle={mainTitle}
    >
      <JoinSaeeForm
        endPoint={`https://api.saee.org.sa/pgenquiries/sharebooks/create?special[booktitle]&special[bookbrief]&name&special[phone]&email`}
      />
    </Layout>
  );
};

export default JoinSaee;
