import * as yup from 'yup';

export interface CreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  whatsapp: string;
  avatar_logo?: string;
};

export const createUserRequestSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required().email('Email e um campo obrigatorio!'),
  whatsapp: yup.string().required(),
  avatar_logo: yup.string()
});