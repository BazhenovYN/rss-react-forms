import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '@/app/store';
import Logo from '@/assets/svg/react-hook-form.svg?react';
import Autocomplete from '@/components/Autocomplete';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import CountrySelect from '@/components/CountrySelect';
import TextField from '@/components/TextField';
import { GENDER } from '@/constants/common';
import { schema } from '@/constants/validateSchema';
import { saveComplexFormData } from '@/store/historySlice';
import { IForm } from '@/types';
import { getStoredData } from '@/utils/converter';

import styles from './ComplexForm.module.scss';

function ComplexForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: IForm) => {
    const storedData = await getStoredData(data);
    dispatch(saveComplexFormData(storedData));
    navigate('/', { state: { IsNewData: true } });
  };

  return (
    <>
      <h1>
        <Logo className={styles.logo} />
        Complex Form
      </h1>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={styles.form}
        noValidate
      >
        <TextField
          label="Name"
          {...register('name')}
          errorText={errors.name?.message}
        />
        <TextField
          label="Age"
          type="number"
          min={0}
          {...register('age')}
          errorText={errors.age?.message}
        />
        <TextField
          label="Email"
          type="email"
          {...register('email')}
          errorText={errors.email?.message}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Autocomplete
              label="Gender"
              options={GENDER}
              value={field.value}
              onInputChange={field.onChange}
              errorText={errors.gender?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <CountrySelect
              label="Country"
              value={field.value}
              onInputChange={field.onChange}
              errorText={errors.country?.message}
            />
          )}
        />
        <TextField
          label="Avatar"
          type="file"
          {...register('avatar')}
          errorText={errors.avatar?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
          errorText={errors.password?.message}
        />
        <TextField
          label="Confirm password"
          type="password"
          {...register('confirmPassword')}
          errorText={errors.confirmPassword?.message}
        />
        <Checkbox
          label="I agree to Terms & Conditions"
          {...register('isAgree')}
          errorText={errors.isAgree?.message}
        />
        <Button type="submit" className={styles.submit}>
          Submit
        </Button>
        <Link to="/">OK, I want to go back to the home page</Link>
      </form>
    </>
  );
}

export default ComplexForm;
