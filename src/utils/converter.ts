import { schema } from '@/constants/validateSchema';
import { IForm, IFormData } from '@/types';

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target?.result as string);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

export async function getStoredDataWithValidation(
  formData: FormData
): Promise<IFormData> {
  const data = Object.fromEntries(formData.entries());
  const validatedResult = await schema.validate(data, {
    abortEarly: false,
  });
  return getStoredData(validatedResult);
}

export async function getStoredData(data: IForm): Promise<IFormData> {
  const avatarBase64 = await fileToBase64(data.avatar);
  return {
    name: data.name,
    age: data.age,
    email: data.email,
    password: data.password,
    gender: data.gender,
    country: data.country,
    avatar: avatarBase64,
  };
}
