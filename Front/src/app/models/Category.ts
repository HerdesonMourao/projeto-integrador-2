import { User } from "./User"

export interface Category {
  id: number;
  user_id: User;
  name: string;
  is_activated: boolean;
  created_at: Date;
  userId: number;
}
