import {User} from "./user.model";

export interface Comment {
  content: string;
  id: number;
  recipe_id: number;
  created_date: Date;
  user: User;
}
