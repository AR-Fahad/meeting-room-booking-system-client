import baseApi from "@/redux/api/baseApi";
const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (slotInfo) => {
        return {
          url: "/slots",
          method: "POST",
          body: slotInfo,
        };
      },
      invalidatesTags: ["slots", "allSlots"],
    }),
    updateSlot: builder.mutation({
      query: ({ slotId, updateInfo }) => {
        return {
          url: `/slots/${slotId}`,
          method: "PUT",
          body: updateInfo,
        };
      },
      invalidatesTags: ["slots", "allSlots"],
    }),
    deleteSlot: builder.mutation({
      query: (slotId) => {
        return {
          url: `/slots/${slotId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["slots", "allSlots"],
    }),
    getAvailableSlots: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();

        if (queries) {
          for (const query in queries) {
            params.append(query, queries[query]);
          }
        }
        return {
          url: "/slots/availability",
          method: "GET",
          params,
        };
      },
      providesTags: [{ type: "slots" }],
    }),
    getAllSlots: builder.query({
      query: (queries) => {
        const params = new URLSearchParams();

        if (queries) {
          for (const query in queries) {
            params.append(query, queries[query]);
          }
        }
        return {
          url: "/slots",
          method: "GET",
          params,
        };
      },
      providesTags: [{ type: "allSlots" }],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useCreateSlotMutation,
  useGetAllSlotsQuery,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} = slotApi;
