import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";

const MyBookings = () => {
  const { data: res, isLoading, isFetching } = useGetUserBookingsQuery(null);

  return (
    <div>
      <h3>This is My Bookings</h3>
    </div>
  );
};

export default MyBookings;
