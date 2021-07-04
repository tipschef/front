export interface UserAdmin {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  is_partner: boolean;
  is_highlighted: boolean;
  bank_information_is_filled: boolean;
}
