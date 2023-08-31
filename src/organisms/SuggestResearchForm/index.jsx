import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';

import { TextFieldGroup } from 'src/molecules/TextFieldGroup';
import { SendButton } from 'src/molecules/SendButton';

import t from 'src/Locales/ar/centers/researchCenter/researchPriority/suggestResearch';
import tForms from 'src/Locales/ar/forms';

import styles from './style.module.css';
import { FileFieldGroup } from 'src/molecules/FileFieldGroup';

export const SuggestResearchForm = ({ endPoint }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [status, setStatus] = useState(false);

  const [cvDoc, setCvDoc] = useState(t.form.cv.title);
  const [disabledButton, setDisabledButton] = useState(false);

  const router = useRouter();

  const requestSchema = Yup.object().shape({
    name: Yup.string().min(3, t.form.name.error).required(tForms.require),

    phone: Yup.string().required(tForms.require),

    email: Yup.string().email(t.form.email.error).required(tForms.require),

    work: Yup.string().required(tForms.require),

    address: Yup.string().required(tForms.require),

    cv: Yup.mixed().required(tForms.require),

    researchTitle: Yup.string().required(tForms.require),

    researchField: Yup.string().required(tForms.require),

    researchType: Yup.string().required(tForms.require),

    researchLimits: Yup.string().required(tForms.require),

    researchImportance: Yup.string().required(tForms.require),
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
        work: '',
        address: '',
        cv: '',
        researchTitle: '',
        researchField: '',
        researchType: '',
        researchLimits: '',
        researchImportance: '',
        researcher: '',
      }}
      validationSchema={requestSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setDisabledButton(true);

        const dataForm = new FormData();
        dataForm.append('name', values.name);
        dataForm.append('email', values.email);
        dataForm.append('special[phone]', values.phone);
        dataForm.append('work', values.work);
        dataForm.append('address', values.address);
        dataForm.append('special[cv]', values.cv);
        dataForm.append('researchTitle', values.researchTitle);
        dataForm.append('researchField', values.researchField);
        dataForm.append('researchType', values.researchType);
        dataForm.append('researchLimits', values.researchLimits);
        dataForm.append('researchImportance', values.researchImportance);
        dataForm.append('researcher', values.researcher);

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

              setCvDoc(t.form.cv.title);
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
          <p>{t.intro}</p>

          <TextFieldGroup
            label={t.form.name.title}
            placeholder={t.form.name.title}
            labelTarget={'name'}
            errors={errors.name}
            touched={touched.name}
            name={'name'}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.phone.title}
            placeholder={t.form.phone.title}
            labelTarget={'phone'}
            errors={errors.phone}
            touched={touched.phone}
            name={'phone'}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.email.title}
            placeholder={t.form.email.title}
            labelTarget={'email'}
            errors={errors.email}
            touched={touched.email}
            name={'email'}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.work.title}
            placeholder={t.form.work.title}
            labelTarget={'work'}
            errors={errors.work}
            touched={touched.work}
            name={'work'}
            value={values.work}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.address.title}
            placeholder={t.form.address.title}
            labelTarget={'address'}
            errors={errors.address}
            touched={touched.address}
            name={'address'}
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FileFieldGroup
            label={t.form.cv.title}
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

          <TextFieldGroup
            label={t.form.researchTitle.title}
            placeholder={t.form.researchTitle.title}
            labelTarget={'researchTitle'}
            errors={errors.researchTitle}
            touched={touched.researchTitle}
            name={'researchTitle'}
            value={values.researchTitle}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.researchField.title}
            placeholder={t.form.researchField.title}
            labelTarget={'researchField'}
            errors={errors.researchField}
            touched={touched.researchField}
            name={'researchField'}
            value={values.researchField}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.researchType.title}
            placeholder={t.form.researchType.title}
            labelTarget={'researchType'}
            errors={errors.researchType}
            touched={touched.researchType}
            name={'researchType'}
            value={values.researchType}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.researchLimits.title}
            placeholder={t.form.researchLimits.title}
            labelTarget={'researchLimits'}
            errors={errors.researchLimits}
            touched={touched.researchLimits}
            name={'researchLimits'}
            value={values.researchLimits}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.researchImportance.title}
            placeholder={t.form.researchImportance.title}
            labelTarget={'researchImportance'}
            errors={errors.researchImportance}
            touched={touched.researchImportance}
            name={'researchImportance'}
            value={values.researchImportance}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldGroup
            label={t.form.researcher.title}
            placeholder={t.form.researcher.title}
            labelTarget={'researcher'}
            errors={errors.researcher}
            touched={touched.researcher}
            name={'researcher'}
            value={values.researcher}
            onChange={handleChange}
            onBlur={handleBlur}
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
