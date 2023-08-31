import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

import { TextFieldGroup } from 'src/molecules/TextFieldGroup';
import { SelectFieldGroup } from 'src/molecules/SelectFieldGroup';
import { FileFieldGroup } from 'src/molecules/FileFieldGroup';
import { SendButton } from 'src/molecules/SendButton';

import t from 'src/Locales/ar/translation.json';
import tForms from 'src/Locales/ar/forms';

import styles from './style.module.css';

export const ReserveTitleForm = ({ endPoint, options }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [status, setStatus] = useState(false);

  const [cvDoc, setCvDoc] = useState(t.forms.select.cv);
  const [planDoc, setPlanDoc] = useState(t.forms.select.plan_placeholder);
  const [disabledButton, setDisabledButton] = useState(false);

  const router = useRouter();

  const requestSchema = Yup.object().shape({
    name: Yup.string().min(3, t.forms.name.error).required(tForms.require),

    email: Yup.string().email(t.forms.email.error).required(tForms.require),

    phone: Yup.string().required(tForms.require),

    selectOption: Yup.string().required(tForms.require),

    cv: Yup.mixed().required(tForms.require),

    plan: Yup.mixed().required(tForms.require),
  });

  const formErrorsList = formErrors.map(formError => (
    <p key={formError}>{formError}</p>
  ));

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        selectOption: '',
        plan: '',
        cv: '',
      }}
      validationSchema={requestSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setDisabledButton(true);

        const dataForm = new FormData();
        dataForm.append('name', values.name);
        dataForm.append('email', values.email);
        dataForm.append('special[phone]', values.phone);
        dataForm.append('special[researchsubject]', values.selectOption);
        dataForm.append('special[plan]', values.plan);
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
              setCvDoc(t.forms.select.cv);
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
          className={styles.ReserveTitle}
          onSubmit={handleSubmit}
        >
          <div className={styles.box}>
            <SelectFieldGroup
              label={t.forms.select.name}
              labelTarget={'special[researchsubject]'}
              id={'selectOption'}
              name={'selectOption'}
              value={values.selectOption}
              errors={errors.selectOption}
              touched={touched.selectOption}
              onChange={handleChange}
              onBlur={handleBlur}
              options={options}
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
              label={t.forms.select.plan}
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

          <div className={styles.box}>
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
