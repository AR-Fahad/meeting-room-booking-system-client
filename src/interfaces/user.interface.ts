export type TAuth = {
  email: string;
  role: string;
  iat: number;
  exp: number;
} | null;

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
};
