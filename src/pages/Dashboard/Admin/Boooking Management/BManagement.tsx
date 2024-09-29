/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/loader/Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TBooking } from "@/interfaces/booking.interface";

import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import EachBooking from "./EachBooking";

const BManagement = () => {
  const { data: res, isFetching, isLoading } = useGetAllBookingsQuery(null);
  const bookings: TBooking[] = res?.data;

  return (
    <>
      {!isFetching && !isLoading && bookings ? (
        <div>
          <h3 className="text-3xl font-medium my-5 text-priColor">
            All Bookings
          </h3>
          <div>
            <Table className="w-full table-auto md:table-fixed">
              {bookings?.length !== 0 && (
                <TableCaption>A list of all users bookings.</TableCaption>
              )}
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>Room Name</TableHead>
                  <TableHead>User Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              {bookings?.length === 0 ? (
                <TableCaption className="text-black text-opacity-50 font-bold text-xl lg:text-2xl mt-10">
                  No booking found
                </TableCaption>
              ) : (
                <TableBody className="block md:table-row-group">
                  {bookings.map((booking) => (
                    <EachBooking key={booking?._id} booking={booking} />
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default BManagement;
