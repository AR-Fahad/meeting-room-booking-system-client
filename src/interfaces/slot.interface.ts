import { TRoom } from "./room.interface";

export type TSlot = {
  _id?: string;
  room: TRoom;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
};
