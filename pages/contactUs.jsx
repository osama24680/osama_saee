import Layout from 'src/organisms/Layout';

import ContactUsForm from 'components/Forms/ContactUsForm';

import t from 'src/Locales/ar/translation.json';
import tShared from 'src/Locales/ar/shared.json';

function ContactUs() {
  return (
    <Layout
      parentTitle={tShared.home}
      pageTitle={t.navbar.contact_us}
    >
      <ContactUsForm />
    </Layout>
  );
}

export default ContactUs;
