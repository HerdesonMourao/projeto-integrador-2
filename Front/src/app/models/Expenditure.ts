import { Category } from "./Category";
import { PaymentMethodType } from "./constants/PaymentMethodType"
import { User } from "./User";

export interface Expenditure {
  id: number;
  user_id: User;
  description: string;
  value: number;
  expense_date: Date;
  category: Category;
  payment_method: PaymentMethodType;
  number_installments: number;
  isPaid: boolean;
  is_activated: boolean;
  created_at: Date;
  userId: number;
  categoryId: number;
}
