export type Gender = 'Male' | 'Female' | 'Other';

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
  avatar: File;
  country: string;
  isAgree: boolean;
}

export interface IStoreData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  avatar: string;
  country: string;
}
