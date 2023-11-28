import { ObjectSchema, boolean, number, object, ref, string } from 'yup';
import { gender } from './common';
import type { Gender, IForm } from '@/types';

export const schema: ObjectSchema<IForm> = object({
  name: string()
    .matches(/^[A-Z]/, 'The first letter must be capitalised')
    .required('Name is required'),
  age: number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required('Age is required')
    .positive('Age must be valid'),
  email: string().email('Enter a valid email').required('E-mail is required'),
  gender: string<Gender>()
    .oneOf(gender, 'Gender must be valid')
    .required('Gender is required'),
  password: string()
    .matches(/[0-9]/, 'Password must have at least 1 digit character')
    .matches(/[a-z]/, 'Password must have at least 1 lowercase character')
    .matches(/[A-Z]/, 'Password must have at least 1 uppercase character')
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      'Password must have at least 1 special character'
    )
    .required('Password is required'),
  confirmPassword: string()
    .required('Confirm password is required')
    .oneOf([ref('password')], 'Passwords does not match'),
  country: string().required('Country is required'),
  avatar: string().required('Avatar is required'),
  isAgree: boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});
