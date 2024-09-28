import baseApi from "@/redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlots: builder.query({
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
  }),
});

export const { useGetAllSlotsQuery } = slotApi;
