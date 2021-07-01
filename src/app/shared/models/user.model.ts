export interface User {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  likes?: number;
  followers?: number;
  subscribers?: number;
  recipes?: number;
  description?: string;
  profile_url?: string;
  profile_picture?: string;
  background_url?: string;
  following?: boolean;
  is_partner?: boolean;
}
