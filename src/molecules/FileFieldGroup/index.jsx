import styles from './style.module.css';
import t from 'src/Locales/ar/translation.json';

export const FileFieldGroup = ({
  labelTarget,
  id,
  name,
  onBlur,
  errors,
  touched,
  setFieldValue,
  stateName,
  setStateName,
}) => {
  return (
    <div className={styles.FileFieldGroup}>
      <div className={styles.container_box}>
        <input
          type='file'
          id={id}
          name={name}
          className={styles.file_input}
          onBlur={onBlur}
          onChange={e => {
            setFieldValue(`${name}`, e.currentTarget.files[0]);
            setStateName(e.currentTarget.files[0].name);
          }}
        />

        <label
          className={
            errors && touched ? styles.file_label_error : styles.file_label
          }
          for={labelTarget}
        >
          {stateName === ''
            ? t.forms.select.select_file_placeholder
            : stateName}
        </label>

        {errors && touched && <p className={styles.error}>{errors}</p>}
      </div>
    </div>
  );
};
