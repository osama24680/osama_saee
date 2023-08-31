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

export const SuggestEncyclopediaForm = ({ endPoint }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [status, setStatus] = useState(false);

  const [planDoc, setPlanDoc] = useState(t.forms.select.plan_placeholder);
  const [disabledButton, setDisabledButton] = useState(false);

  const requestSchema = Yup.object().shape({
    encyclopediaName: Yup.string()
      .min(2, t.forms.encyclopedia.error)
      .required(tForms.require),

    brief: Yup.string().min(3, t.forms.brief.error).required(tForms.require),

    name: Yup.string().min(3, t.forms.name.error).required(tForms.require),

    email: Yup.string().email(t.forms.email.error).required(tForms.require),

    phone: Yup.string().required(tForms.require),

    plan: Yup.mixed().required(tForms.require),
  });

  const router = useRouter();

  const formErrorsList = formErrors.map(formError => (
    <p key={formError}>{formError}</p>
  ));

  return (
    <Formik
      initialValues={{
        encyclopediaName: '',
        brief: '',
        name: '',
        phone: '',
        email: '',
        plan: '',
      }}
      validationSchema={requestSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setDisabledButton(true);

        const dataForm = new FormData();
        dataForm.append('special[encyclopediabrief]', values.encyclopediaName);
        dataForm.append('special[encyclopediabrief]', values.brief);
        dataForm.append('name', values.name);
        dataForm.append('email', values.email);
        dataForm.append('special[phone]', values.phone);
        dataForm.append('special[plan]', values.plan);

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
              setPlanDoc(t.forms.select.plan_placeholder);
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
          className={styles.SuggestEncyclopediaForm}
          onSubmit={handleSubmit}
        >
          <div className={styles.box}>
            <TextFieldGroup
              label={t.forms.encyclopedia.name}
              labelTarget={'encyclopediaName'}
              errors={errors.encyclopediaName}
              touched={touched.encyclopediaName}
              placeholder={t.forms.encyclopedia.placeholder}
              name={'encyclopediaName'}
              value={values.encyclopediaName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className={styles.box}>
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
          </div>

          <div className={styles.box}>
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
          </div>

          <div className={styles.box}>
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
          </div>

          <div className={styles.box}>
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
          </div>

          <div className={styles.box}>
            <FileFieldGroup
              label={t.forms.encyclopedia.plan}
              labelTarget={'plan'}
              id='plan'
              name='plan'
              onBlur={handleBlur}
              errors={errors.plan}
              touched={touched.plan}
              setFieldValue={setFieldValue}
              stateName={planDoc}
              setStateName={setPlanDoc}
            />
          </div>

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
