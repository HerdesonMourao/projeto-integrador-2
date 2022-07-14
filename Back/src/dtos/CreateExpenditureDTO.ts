import * as yup from 'yup';

enum PaymentMethodTypes {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  MONEY = 'MONEY'
}

export interface CreateExpenditureDTO {
  user_id: number;
  description: string;
  value: number;
  expense_date: Date;
  Category: number;
  payment_method: PaymentMethodTypes;
  number_installments: number;
  isPaid: boolean;
}

export const createExpenditureRequestSchema = yup.object({
  user_id: yup.number().required(),
  description: yup.string().required(),
  value: yup.number().required(),
  expense_date: yup.date().required(),
  Category: yup.number().required(),
  payment_method: yup
  .string()
  .oneOf([PaymentMethodTypes.CREDIT_CARD, PaymentMethodTypes.DEBIT_CARD, PaymentMethodTypes.MONEY])
  .required(),
  number_installments: yup.number().required(),
  isPaid: yup.boolean().required()
})

export interface UpdateExpenditureDTO {
  description: string;
  value: number;
  expense_date: Date;
  Category: number;
  payment_method: PaymentMethodTypes;
  number_installments: number;
  isPaid: boolean;
}

export const updateExpenditureRequestSchema = yup.object({
  description: yup.string().required(),
  value: yup.number().required(),
  expense_date: yup.date().required(),
  Category: yup.number().required(),
  payment_method: yup
  .string()
  .oneOf([PaymentMethodTypes.CREDIT_CARD, PaymentMethodTypes.DEBIT_CARD, PaymentMethodTypes.MONEY])
  .required(),
  number_installments: yup.number().required(),
  isPaid: yup.boolean().required()
})