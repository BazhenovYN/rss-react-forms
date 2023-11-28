export type Gender = 'male' | 'female' | 'other';

export interface ICountryType {
  code: string;
  label: string;
  phone: string;
}

export interface IForm {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
  avatar: string;
  country: string;
  isAgree: boolean;
}
