import { Field } from 'formik';
import styles from './style.module.css';

export const SelectFieldGroup = ({
  options,
  errors,
  touched,
  id,
  name,
  values,
  onChange,
  onBlur,
}) => {
  return (
    <div className={styles.SelectFieldGroup}>
      <Field
        className={errors && touched ? styles.input_error : styles.select_input}
        aria-label='Default select example'
        as='select'
        id={id}
        name={name}
        value={values}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map(option => {
          return (
            <option
              className={styles.option}
              key={option.key}
              value={option.key}
            >
              {option.key}
            </option>
          );
        })}
      </Field>
      <span className={styles.cover}></span>

      {errors && touched && <p className={styles.error}>{errors}</p>}
    </div>
  );
};
