import { schema } from '@/constants/validateSchema';
import { IFormData } from '@/types';

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
  console.log(data);
  const validatedResult = await schema.validate(data, {
    abortEarly: false,
  });
  const avatarBase64 = await fileToBase64(validatedResult.avatar);
  return {
    name: validatedResult.name,
    age: validatedResult.age,
    email: validatedResult.email,
    password: validatedResult.password,
    gender: validatedResult.gender,
    country: validatedResult.country,
    avatar: avatarBase64,
  };
}
