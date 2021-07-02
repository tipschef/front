import {User} from "./user.model";

export interface BookPurchase {
  buy_date: Date
  title: string
  path: string
  price_euro: number
  creator: string
  book_id: number
}
