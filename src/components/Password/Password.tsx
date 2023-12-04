import { ChangeEvent, forwardRef, useState } from 'react';
import TextField from '@/components/TextField';

import styles from './Password.module.scss';

interface IProps {
  label: string;
  errorText?: string;
  onInputChange?: (value: string) => void;
  value?: string;
}

const PASSWORD_STRENGTH = {
  low: 'low',
  medium: 'medium',
  high: 'high',
};

const getPasswordStrength = (password: string) => {
  const isPasswordLong = password.length >= 8;
  const isPasswordContainsDigits = /[0-9]/.test(password);
  const isPasswordContainsUppercaseCharacter = /[A-Z]/.test(password);
  const isPasswordContainsLowercaseCharacter = /[a-z]/.test(password);
  const isPasswordContainsSpecialCharacter =
    /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password);
  const numberOfCriteria = [
    isPasswordLong,
    isPasswordContainsDigits,
    isPasswordContainsUppercaseCharacter,
    isPasswordContainsLowercaseCharacter,
    isPasswordContainsSpecialCharacter,
  ].filter(Boolean).length;
  if (numberOfCriteria === 5) {
    return PASSWORD_STRENGTH.high;
  } else if (numberOfCriteria >= 3) {
    return PASSWORD_STRENGTH.medium;
  }
  return PASSWORD_STRENGTH.low;
};

const Password = forwardRef<HTMLInputElement, IProps>(
  ({ label, errorText, value, onInputChange, ...rest }, ref) => {
    const [inputValue, setInputValue] = useState(value ?? '');

    const strength = getPasswordStrength(inputValue);

    const getStrengthClass = () => {
      if (strength === PASSWORD_STRENGTH.high) {
        return styles.high;
      } else if (strength === PASSWORD_STRENGTH.medium) {
        return styles.medium;
      }
      return styles.low;
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (onInputChange) {
        onInputChange(event.target.value);
      }
    };

    return (
      <div className={styles.input}>
        <TextField
          label={label}
          type="password"
          value={inputValue}
          onChange={handleInputChange}
          errorText={errorText}
          ref={ref}
          {...rest}
        />
        <div
          className={[styles.light, getStrengthClass()].join(' ').trimEnd()}
        />
      </div>
    );
  }
);

export default Password;
