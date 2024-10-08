import baseApi from "@/redux/api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRoom: builder.mutation({
      query: (roomInfo) => {
        return {
          url: "/rooms",
          method: "POST",
          body: roomInfo,
        };
      },
      invalidatesTags: ["rooms", "room"],
    }),
    updateRoom: builder.mutation({
      query: ({ updateInfo, id }) => {
        return {
          url: `/rooms/${id}`,
          method: "PUT",
          body: updateInfo,
        };
      },
      invalidatesTags: ["rooms", "room"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["rooms", "room"],
    }),
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
    getRoom: builder.query({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "room" }],
    }),
  }),
});

export const {
  useGetAllRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
