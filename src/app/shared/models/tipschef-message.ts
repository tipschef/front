export interface TipschefMessage {
  receiver_id: number;
  sender_id: number;
  content: string;
  date_create?: Date;
}
