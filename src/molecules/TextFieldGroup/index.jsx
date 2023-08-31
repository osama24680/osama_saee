import styles from './style.module.css';

export const TextFieldGroup = ({
  errors,
  touched,
  placeholder,
  name,
  values,
  onChange,
  onBlur,
}) => {
  return (
    <div className={styles.TextFieldGroup}>
      <input
        className={errors && touched ? styles.input_error : styles.text_input}
        type={'text'}
        placeholder={placeholder}
        name={name}
        value={values}
        onChange={onChange}
        onBlur={onBlur}
      />

      {errors && touched && <p className={styles.error}>{errors}</p>}
    </div>
  );
};
