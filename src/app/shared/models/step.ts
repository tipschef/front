export interface Step {
  id?: number;
  content?: string;
  order?: number;
  is_deleted?: boolean;
  created_date: Date;
}
