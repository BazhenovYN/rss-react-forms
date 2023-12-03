import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import JSLogo from '@/assets/svg/js_logo.svg?react';
import { useAppDispatch } from '@/app/store';
import Autocomplete from '@/components/Autocomplete';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import CountrySelect from '@/components/CountrySelect';
import Password from '@/components/Password';
import TextField from '@/components/TextField';
import { GENDER } from '@/constants/common';
import { saveSimpleFormData } from '@/store/historySlice';
import { getStoredDataWithValidation } from '@/utils/converter';

import styles from './SimpleForm.module.scss';

function SimpleForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setErrors({});
    try {
      const storedData = await getStoredDataWithValidation(formData);
      dispatch(saveSimpleFormData(storedData));
      navigate('/', { state: { IsNewData: true } });
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.map(({ path, message }) => {
          path && setErrors((prev) => ({ ...prev, [path]: message }));
        });
      } else {
        throw error;
      }
    }
  };

  const register = (name: string) => {
    return {
      name,
      errorText: errors[name],
    };
  };

  return (
    <>
      <h1>
        <JSLogo className={styles.logo} />
        Simple Form
      </h1>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <TextField label="Name" {...register('name')} />
        <TextField label="Age" type="number" min={0} {...register('age')} />
        <TextField label="Email" type="email" {...register('email')} />
        <Autocomplete label="Gender" options={GENDER} {...register('gender')} />
        <CountrySelect label="Country" {...register('country')} />
        <TextField label="Avatar" type="file" {...register('avatar')} />
        <Password label="Password" {...register('password')} />
        <TextField
          label="Confirm password"
          type="password"
          {...register('confirmPassword')}
        />
        <Checkbox
          label="I agree to Terms & Conditions"
          {...register('isAgree')}
        />
        <Button type="submit" className={styles.submit}>
          Submit
        </Button>
        <Link to="/">OK, I want to go back to the home page</Link>
      </form>
    </>
  );
}

export default SimpleForm;
