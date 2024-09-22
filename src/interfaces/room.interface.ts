export type TRoom = {
  _id?: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  image: string[];
  isDeleted?: boolean;
};
