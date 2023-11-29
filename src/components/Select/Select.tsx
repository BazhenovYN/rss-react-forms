import { forwardRef, SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  items: string[];
  errorText?: string;
};

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ className, label, items, errorText, ...rest }, ref) => {
    const classes = [styles.select, className].join(' ').trimEnd();
    return (
      <div className={styles['select-field']}>
        <label>
          {label}
          <select
            ref={ref}
            className={classes}
            defaultValue={'empty'}
            {...rest}
          >
            <option value="empty" disabled hidden></option>
            {items.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        {errorText && (
          <div className={styles['error-message']}>{errorText}</div>
        )}
      </div>
    );
  }
);

export default Select;
