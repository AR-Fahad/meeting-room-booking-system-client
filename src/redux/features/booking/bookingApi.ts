import baseApi from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (bookingInfo) => ({
        url: "/bookings",
        method: "POST",
        body: bookingInfo,
      }),
      invalidatesTags: ["userBookings", "bookings"],
    }),
    updateBooking: builder.mutation({
      query: ({ updateInfo, id }) => ({
        url: `/bookings/${id}`,
        method: "PUT",
        body: updateInfo,
      }),
      invalidatesTags: ["userBookings", "bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userBookings", "bookings"],
    }),
    getUserBookings: builder.query({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
      providesTags: [{ type: "userBookings" }],
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: [{ type: "bookings" }],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetUserBookingsQuery,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
