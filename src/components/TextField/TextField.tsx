import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './TextField.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorText?: string;
};

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ className, label, errorText, ...rest }, ref) => {
    const classes = [styles.input, className, errorText ? styles.error : '']
      .join(' ')
      .trimEnd();
    return (
      <div className={styles['text-field']}>
        <label>
          {label} <input ref={ref} className={classes} {...rest} />
        </label>
        <div className={styles['error-message']}>{errorText}</div>
      </div>
    );
  }
);

export default TextField;
