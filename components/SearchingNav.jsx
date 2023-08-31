import { Formik } from 'formik';
import { Container, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import SvgSearch from 'components/Icons/SvgSearch';
import { useRouter } from 'next/router';

import t from 'src/Locales/ar/translation.json';
import tForms from 'src/Locales/ar/forms';

export default function SearchingNav({ isScroll }) {
  const router = useRouter();
  const { term } = router.query;
  const searchSubscribeSchema = Yup.object().shape({
    search: Yup.string(t.forms.search.error).required(tForms.require),
  });

  return (
    <div className='searchContainer'>
      <Container className='d-flex justify-content-center align-items-center flex-wrap'>
        <h3>المكتبة الوقفية</h3>
        <Formik
          initialValues={{ search: term ? term : '' }}
          validationSchema={searchSubscribeSchema}
          onSubmit={values => {
            router.push(`/search/${values.search}/1`);
          }}
        >
          {({ values, errors, handleSubmit, handleChange, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Control
                name='search'
                value={values.search}
                onChange={handleChange}
                className='sub_input'
                placeholder={`ابحث عن كتب أو مواد مسموعة أو مقروءة`}
                isValid={touched.search && !errors.search}
                isInvalid={errors.search}
                style={{
                  padding: isScroll ? '0.5rem 2rem' : '1rem 2rem',
                }}
              />

              <button
                className=' headerBtn'
                type='submit'
              >
                <SvgSearch fill={'#fff'} />

                <span>ابحث</span>
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
