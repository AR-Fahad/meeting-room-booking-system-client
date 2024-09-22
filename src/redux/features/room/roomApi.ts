import baseApi from "@/redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();

        if (queries) {
          for (const query in queries) {
            params.append(query, queries[query]);
          }
        }
        return {
          url: "/rooms",
          method: "GET",
          params,
        };
      },
      providesTags: [{ type: "rooms" }],
    }),
  }),
});

export const { useGetAllRoomsQuery } = roomApi;
