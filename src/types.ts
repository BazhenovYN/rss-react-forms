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
  passwords: string;
  gender: Gender;
  avatar: string;
  country: string;
}
