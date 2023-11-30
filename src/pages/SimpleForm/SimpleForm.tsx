import { FormEvent, useState } from 'react';
import { ValidationError } from 'yup';
import { useAppDispatch } from '@/app/store';
import { GENDER } from '@/constants/common';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import CountrySelect from '@/components/CountrySelect';
import TextField from '@/components/TextField';
import { saveSimpleFormData } from '@/store/historySlice';
import { getStoredDataWithValidation } from '@/utils/converter';
import Autocomplete from '@/components/Autocomplete';

import styles from './SimpleForm.module.scss';

function SimpleForm() {
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setErrors({});
    try {
      const storedData = await getStoredDataWithValidation(formData);
      dispatch(saveSimpleFormData(storedData));
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(error.inner);
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
      <h1>Simple Form</h1>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <TextField label="Name" {...register('name')} />
        <TextField label="Age" type="number" min={0} {...register('age')} />
        <TextField label="Email" type="email" {...register('email')} />
        <Autocomplete label="Gender" options={GENDER} {...register('gender')} />
        <CountrySelect label="Country" {...register('country')} />
        <TextField label="Avatar" type="file" {...register('avatar')} />
        <TextField label="Password" type="password" {...register('password')} />
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
      </form>
    </>
  );
}

export default SimpleForm;
