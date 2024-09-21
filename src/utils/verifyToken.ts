import { TUser } from "@/interfaces/user.interface";
import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decode = jwtDecode(token);
  //   console.log(decode);
  return decode as TUser;
};
