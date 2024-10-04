import Loader from "@/components/loader/Loader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TBooking } from "@/interfaces/booking.interface";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { convertTo12HourFormat } from "@/utils/convert24hoursTo12hoursTime";

const MyBookings = () => {
  const { data: res, isLoading } = useGetUserBookingsQuery(null);
  const bookings: TBooking[] = res?.data;

  // console.log(bookings);

  return (
    <>
      {!isLoading && bookings ? (
        <div>
          <h3 className="text-3xl font-medium my-5 text-priColor">
            My Bookings
          </h3>
          <div>
            <Table className="w-full table-auto md:table-fixed">
              {bookings?.length !== 0 && (
                <TableCaption>A list of your bookings.</TableCaption>
              )}
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>Room Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>

              {bookings?.length === 0 ? (
                <TableCaption className="text-black text-opacity-50 font-bold text-xl lg:text-2xl mt-10">
                  You have no bookings
                </TableCaption>
              ) : (
                <TableBody className="block md:table-row-group">
                  {bookings.map((booking) => (
                    <TableRow
                      key={booking?._id}
                      className="block mb-4 md:table-row lg:mb-0"
                    >
                      {/* Mobile view */}
                      <div className="md:hidden block p-4 border rounded-lg shadow-md bg-white">
                        <div className="mb-2">
                          <strong>Room Name:</strong> {booking?.room?.name}
                        </div>
                        <div className="mb-2">
                          <strong>Date:</strong> {booking?.date}
                        </div>
                        <div className="mb-2">
                          <strong>Time:</strong>{" "}
                          {booking?.slots
                            ?.map(
                              (slot) =>
                                `${convertTo12HourFormat(
                                  slot?.startTime
                                )}-${convertTo12HourFormat(slot?.endTime)}`
                            )
                            .join(", ")}
                        </div>
                        <div className="mb-2">
                          <strong>Total Cost:</strong> {booking?.totalAmount}
                        </div>
                        <div>
                          <strong>Status:</strong>{" "}
                          <span
                            className={`${
                              booking?.isConfirmed === "confirmed"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {booking?.isConfirmed}
                          </span>
                        </div>
                      </div>

                      {/* Desktop view */}
                      <TableCell className="hidden md:table-cell font-medium">
                        {booking?.room?.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {booking?.date}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {booking?.slots
                          ?.map(
                            (slot) =>
                              `${convertTo12HourFormat(
                                slot?.startTime
                              )}-${convertTo12HourFormat(slot?.endTime)}`
                          )
                          .join(", ")}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {booking?.totalAmount}
                      </TableCell>
                      <TableCell
                        className={`hidden md:table-cell text-right ${
                          booking?.isConfirmed === "confirmed"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {booking?.isConfirmed}
                      </TableCell>
                    </TableRow>
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

export default MyBookings;
