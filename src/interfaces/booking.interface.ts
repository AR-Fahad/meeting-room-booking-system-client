import { TRoom } from "./room.interface";
import { TSlot } from "./slot.interface";
import { TUser } from "./user.interface";

export type TBooking = {
  _id?: string;
  room: TRoom;
  slots: TSlot[];
  user: TUser;
  date: string;
  totalAmount?: number;
  isConfirmed?: string;
  isDeleted?: boolean;
};
