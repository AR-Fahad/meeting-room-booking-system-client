import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
        headers.delete("authorization");
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["rooms"],
});

export default baseApi;
