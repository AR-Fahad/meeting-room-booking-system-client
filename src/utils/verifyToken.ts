import { TAuth } from "@/interfaces/user.interface";
import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const decode: TAuth = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  // console.log("Cur: ", currentTime);
  // console.log("Exp: ", decode?.exp);
  if (decode) {
    if (currentTime > decode?.exp) {
      return null;
    } else {
      return decode;
    }
  } else {
    return null;
  }
};
