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

export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  avatar: string;
  country: string;
}

export interface LogData {
  id: number;
  creationDate: string;
  formName: string;
  formData: IFormData;
}
