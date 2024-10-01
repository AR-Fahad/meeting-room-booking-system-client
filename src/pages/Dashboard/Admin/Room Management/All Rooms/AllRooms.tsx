import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TRoom } from "@/interfaces/room.interface";
import { useGetAllRoomsQuery } from "@/redux/features/room/roomApi";
import EachRoom from "./EachRoom";
import Loader from "@/components/loader/Loader";

const AllRooms = () => {
  const { data: res, isFetching, isLoading } = useGetAllRoomsQuery(null);
  const rooms: TRoom[] = res?.data;

  return (
    <>
      {!isFetching && !isLoading && rooms ? (
        <div>
          <h3 className="text-3xl font-medium my-5 text-priColor">All Rooms</h3>
          <div>
            <Table className="w-full table-auto md:table-fixed">
              {rooms?.length !== 0 && (
                <TableCaption>A list of all rooms.</TableCaption>
              )}
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>Room Name</TableHead>
                  <TableHead>Room No</TableHead>
                  <TableHead>Floor No</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Price Per Slot</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              {rooms?.length === 0 ? (
                <TableCaption className="text-black text-opacity-50 font-bold text-xl lg:text-2xl mt-10">
                  No room found
                </TableCaption>
              ) : (
                <TableBody className="block md:table-row-group">
                  {rooms?.map((room) => (
                    <EachRoom key={room?._id} room={room} />
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

export default AllRooms;
