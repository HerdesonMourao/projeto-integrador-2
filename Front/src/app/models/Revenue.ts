import { User } from "./User";

export interface Revenue {
  id: number;
  user_id: User;
  value: number;
  competence: string;
  is_activated: boolean;
  created_at: Date;
  userId: number;
}
