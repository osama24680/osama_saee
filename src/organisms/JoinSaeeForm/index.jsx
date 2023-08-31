import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

import { TextFieldGroup } from 'src/molecules/TextFieldGroup';
import { FileFieldGroup } from 'src/molecules/FileFieldGroup';
import { SendButton } from 'src/molecules/SendButton';

import t from 'src/Locales/ar/translation.json';
import tForms from 'src/Locales/ar/forms';

import styles from './style.module.css';

const JoinSaeeForm = ({ endPoint }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [status, setStatus] = useState(false);

  const [cvDoc, setCvDoc] = useState('');
  const [indexDoc, setIndexDoc] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);

  const requestSchema = Yup.object().shape({
    bookTitle: Yup.string().min(2, t.forms.book.error).required(tForms.require),

    brief: Yup.string().min(3, t.forms.brief.error).required(tForms.require),

    name: Yup.string().min(3, t.forms.name.error).required(tForms.require),

    email: Yup.string().email(t.forms.email.error).required(tForms.require),

    phone: Yup.string().required(tForms.require),

    index: Yup.mixed().required(tForms.require),

    cv: Yup.mixed().required(tForms.require),
  });
  const router = useRouter();

  const formErrorsList = formErrors.map(formError => (
    <p key={formError}>{formError}</p>
  ));

  return (
    <Formik
      initialValues={{
        bookTitle: '',
        brief: '',
        name: '',
        phone: '',
        email: '',
        index: '',
        cv: '',
      }}
      validationSchema={requestSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setDisabledButton(true);

        const dataForm = new FormData();
        dataForm.append('special[booktitle]', values.bookTitle);
        dataForm.append('special[bookbrief]', values.brief);
        dataForm.append('name', values.name);
        dataForm.append('email', values.email);
        dataForm.append('special[phone]', values.phone);
        dataForm.append('special[index]', values.index);
        dataForm.append('special[cv]', values.cv);

        axios
          .post(`${endPoint}`, dataForm, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            if (res.status == 200) {
              setSubmitting(false);
              setStatus(true);
              setFormErrors([]);

              setTimeout(() => {
                setStatus(false);
                router.reload();
              }, 3000);
              resetForm();
              setCvDoc('');
              setIndexDoc('');
            }
          })
          .catch(error => {
            setDisabledButton(false);
            setSubmitting(false);
            setStatus(false);

            setFormErrors(
              error.response.data.errors.map(error => tForms.api_errors[error])
            );
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form
          className={styles.JoinSaeeForm}
          onSubmit={handleSubmit}
        >
          <TextFieldGroup
            label={t.forms.book.book_title}
            labelTarget={'bookTitle'}
            errors={errors.bookTitle}
            touched={touched.bookTitle}
            placeholder={t.forms.book.book_title_placeholder}
            name={'bookTitle'}
            value={values.bookTitle}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.forms.brief.brief_hint}
            labelTarget={'brief'}
            errors={errors.brief}
            touched={touched.brief}
            placeholder={t.forms.brief.brief_placeholder}
            name={'brief'}
            value={values.brief}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.forms.name.name}
            labelTarget={'name'}
            errors={errors.name}
            touched={touched.name}
            placeholder={t.forms.name.name}
            name={'name'}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.forms.phone}
            labelTarget={'phone'}
            errors={errors.phone}
            touched={touched.phone}
            placeholder={t.forms.phone}
            name={'phone'}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.forms.email.name}
            labelTarget={'email'}
            errors={errors.email}
            touched={touched.email}
            placeholder={t.forms.email.name}
            name={'email'}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FileFieldGroup
            label={t.index}
            labelTarget={'index'}
            id='index'
            name='index'
            onBlur={handleBlur}
            errors={errors.index}
            touched={touched.index}
            setFieldValue={setFieldValue}
            stateName={indexDoc}
            setStateName={setIndexDoc}
          />

          <FileFieldGroup
            label={t.forms.select.cv}
            labelTarget={'cv'}
            id='cv'
            name='cv'
            onBlur={handleBlur}
            errors={errors.cv}
            touched={touched.cv}
            setFieldValue={setFieldValue}
            stateName={cvDoc}
            setStateName={setCvDoc}
          />

          <SendButton
            isSubmitting={isSubmitting}
            disableState={disabledButton}
          />

          {status ? (
            <Alert
              variant='success'
              className='mt-3 text-center'
            >
              {tForms.success}
            </Alert>
          ) : null}

          {formErrors.length > 0 ? (
            <Alert
              variant='danger'
              className='mt-3  text-center'
            >
              {formErrorsList}
            </Alert>
          ) : null}
        </form>
      )}
    </Formik>
  );
};
export default JoinSaeeForm;
