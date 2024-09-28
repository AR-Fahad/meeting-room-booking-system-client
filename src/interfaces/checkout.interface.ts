import { TUser } from "./user.interface";

type TBookingInfo = {
  room: string;
  slots: string[];
  user: string;
  date: string;
  isConfirmed?: string;
};

export type TCheckout = {
  roomName: null | string;
  userInfo: null | TUser;
  bookingInfo: null | TBookingInfo;
  slotsTime: null | string;
  pricePerSlot: null | number;
  totalCost: null | number;
};
