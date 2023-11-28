import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorText?: string;
};

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, label, errorText, ...rest }, ref) => {
    const classes = [styles.input, className].join(' ').trimEnd();
    return (
      <div className={styles['text-field']}>
        <label>
          <input
            type="checkbox"
            ref={ref}
            className={classes}
            value={'true'}
            {...rest}
          />
          {label}
        </label>
        {errorText && (
          <div className={styles['error-message']}>{errorText}</div>
        )}
      </div>
    );
  }
);

export default Checkbox;
