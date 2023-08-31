import { Spinner } from 'react-bootstrap';

import t from 'src/Locales/ar/translation.json';
import tForms from 'src/Locales/ar/forms';

import styles from './style.module.css';

export const SendButton = ({ isSubmitting, disableState }) => {
  return (
    <button
      className={styles.SendButton}
      type='submit'
      disabled={disableState}
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
  );
};
