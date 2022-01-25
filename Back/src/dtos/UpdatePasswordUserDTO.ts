import * as yup from 'yup';

export interface UpdatePasswordUserDTO {
  password: string;
};

export const updatePassworddUserRequestSchema = yup.object({
  password: yup.string().required()
});