export interface Discussion {
  discussion_id?: number;
  user_id: number;
  interlocutor_id: number;
  interlocutor_username: string;
  interlocutor_profile: string;
  last_read_date: Date;
  last_message_date: Date;
  seen?: boolean;
}
