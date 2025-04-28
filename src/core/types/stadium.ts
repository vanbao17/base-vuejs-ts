export interface Stadium {
  id: string;
  name: string;
  address: string;
  time_start: number;
  time_end: number;
  image_portfolio: string;
  thumb: string;
  rate: number;
  like: boolean;
  phone: string;
  booking_day?: boolean;
  booking_month?: boolean;
}
export interface TypeStadium {
  id: number;
  name: string;
  image: string;
}
