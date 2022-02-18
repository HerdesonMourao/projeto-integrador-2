import * as yup from 'yup';

enum RoleTypes {
  ADMIN = 'ADMIN',
  CLIENTE = "CLIENTE"
}

export interface CreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  whatsapp: string;
  avatar_logo?: string;
  role: RoleTypes;
};

export const createUserRequestSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().required().email('Email e um campo obrigatorio!'),
  whatsapp: yup.string().required(),
  avatar_logo: yup.string().nullable(),
  role: yup.string().oneOf([RoleTypes.ADMIN, RoleTypes.CLIENTE]).required()
});

export const updatedUserRequestSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required().email('Email e um campo obrigatorio!'),
  whatsapp: yup.string().required(),
  avatar_logo: yup.string().nullable(),
  role: yup.string().oneOf([RoleTypes.ADMIN, RoleTypes.CLIENTE]).required()
});