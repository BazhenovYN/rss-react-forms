import { ObjectSchema, boolean, mixed, number, object, ref, string } from 'yup';
import { MAX_FILE_SIZE, GENDER, ALLOWED_FILE_TYPES } from './common';
import type { Gender, IForm } from '@/types';

export const schema: ObjectSchema<IForm> = object({
  name: string()
    .matches(/^[A-Z]/, 'The first letter must be capitalised')
    .required('Name is required'),
  age: number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .positive('Age must be valid')
    .required('Age is required'),
  email: string().email('Enter a valid email').required('E-mail is required'),
  gender: string<Gender>().oneOf(GENDER, 'Gender is required').required(),
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
    .oneOf([ref('password')], 'Passwords does not match')
    .required('Confirm password is required'),
  country: string().required('Country is required'),
  avatar: mixed<File>()
    .test(
      'fileSize',
      'File is too large',
      (value) => value && value.size <= MAX_FILE_SIZE
    )
    .test(
      'fileType',
      'Unsupported file type',
      (value) => value && ALLOWED_FILE_TYPES.includes(value.type)
    )
    .test(
      'emptyFile',
      'Avatar is required',
      (value) => value && value.size > 0 && value.name !== ''
    )
    .required('Avatar is required'),
  isAgree: boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});
