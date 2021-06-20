export interface User {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
  likes?: number;
  followers?: number;
  subscribers?: number;
  recipes?: number;
  description?: string;
  profile_url?: string;
  background_url?: string;
  following?: boolean;
  is_partner?: boolean;
}
