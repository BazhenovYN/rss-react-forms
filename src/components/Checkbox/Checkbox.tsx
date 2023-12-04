import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorText?: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, errorText, ...rest }, ref) => {
    return (
      <div className={styles['checkbox']}>
        <label className={styles.container}>
          <input type="checkbox" ref={ref} value={'true'} {...rest} />
          <span className={styles.checkmark} />
          {label}
        </label>
        <div className={styles['error-message']}>{errorText}</div>
      </div>
    );
  }
);

export default Checkbox;
