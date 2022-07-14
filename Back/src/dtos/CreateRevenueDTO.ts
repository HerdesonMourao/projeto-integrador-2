import * as yup from 'yup';

export interface CreateRevenueDTO {
  user_id: number;
  value: number;
  competence: string;
}

export const createRevenueRequestSchema = yup.object({
  user_id: yup.number().required(),
  value: yup.number().required(),
  competence: yup.string().required()
})

export interface UpdateRevenueDTO {
  value: number;
  competence: string;
}

export const updateRevenueRequestSchema = yup.object({
  value: yup.number().required(),
  competence: yup.string().required()
})