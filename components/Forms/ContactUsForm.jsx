import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

import t from 'src/Locales/ar/translation.json';
import tForms from 'src/Locales/ar/forms';

function ContactUsForm() {
  const [formError, setformError] = useState(false);
  const [status, setStatus] = useState(false);

  const requestSchema = Yup.object().shape({
    name: Yup.string().min(3, t.forms.name.error).required(tForms.require),

    email: Yup.string().email(t.forms.email.error).required(tForms.require),

    phone: Yup.string().required(tForms.require),

    subject: Yup.string().required(tForms.require),

    message: Yup.string()
      .min(30, t.forms.message.error)
      .required(tForms.require),
  });

  return (
    <div className='contactUs__form joinUs__jobForm'>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        }}
        validationSchema={requestSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const dataForm = new FormData();
          dataForm.append('name', values.name);
          dataForm.append('email', values.email);
          dataForm.append('message', values.message);
          dataForm.append('special[phone]', values.phone);
          dataForm.append('special[subject]', values.subject);

          axios
            .post(
              `${process.env.NEXT_PUBLIC_API_URL}/pgenquiries/consults/createmail`,
              dataForm,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            )
            .then(res => {
              if (res.status == 200) {
                setSubmitting(false);
                setStatus(true);
                setformError(false);

                setTimeout(() => {
                  setStatus(false);
                }, 3000);
                resetForm();
              }
            })
            .catch(() => {
              setSubmitting(false);
              setStatus(false);
              setformError(true);
            });
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className='formStyle'
          >
            <Form.Group>
              <Form.Control
                name='name'
                value={values.name}
                onChange={handleChange}
                placeholder={t.forms.name.name}
                isValid={touched.name && !errors.name}
                isInvalid={errors.name}
              />

              {errors.name && (
                <Form.Control.Feedback type='invalid'>
                  {errors.name}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                name='email'
                value={values.email}
                onChange={handleChange}
                placeholder={t.forms.email.name}
                isValid={touched.email && !errors.email}
                isInvalid={errors.email}
              />

              {errors.email && (
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                name='phone'
                value={values.phone}
                onChange={handleChange}
                placeholder={t.forms.phone}
                isValid={touched.phone && !errors.phone}
                isInvalid={errors.phone}
              />

              {errors.phone && (
                <Form.Control.Feedback type='invalid'>
                  {errors.phone}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                name='subject'
                value={values.subject}
                onChange={handleChange}
                placeholder={t.forms.subject.name}
                isValid={touched.subject && !errors.subject}
                isInvalid={errors.subject}
              />

              {errors.subject && (
                <Form.Control.Feedback type='invalid'>
                  {errors.subject}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Control
                as='textarea'
                rows={13}
                name='message'
                value={values.message}
                onChange={handleChange}
                placeholder={t.forms.message.name}
                isValid={touched.message && !errors.message}
                isInvalid={errors.message}
              />

              {errors.message && (
                <Form.Control.Feedback type='invalid'>
                  {errors.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <div className='sent_btn d-flex justify-content-center align-content-center my-5'>
              <button
                type='submit'
                className='w-100 mainBtn'
              >
                {isSubmitting ? (
                  <>
                    <span className='mx-2'>{tForms.sending}</span>

                    <Spinner
                      as='span'
                      animation='grow'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  </>
                ) : (
                  <span>{t.btns.send_req}</span>
                )}
              </button>
            </div>

            {status ? (
              <Alert
                variant='success'
                className='mt-3 text-center'
              >
                {tForms.success}
              </Alert>
            ) : null}

            {formError ? (
              <Alert
                variant='danger'
                className='mt-3  text-center'
              >
                {t.forms.errror_msg}
              </Alert>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactUsForm;
