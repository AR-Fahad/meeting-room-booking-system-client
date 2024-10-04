import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TSlot } from "@/interfaces/slot.interface";
import { useGetAllSlotsQuery } from "@/redux/features/slot/slotApi";
import EachSlot from "./EachSlot";
import Loader from "@/components/loader/Loader";

const AllSlots = () => {
  const { data: res, isLoading } = useGetAllSlotsQuery(null);
  const slots: TSlot[] = res?.data;

  return (
    <>
      {!isLoading && slots ? (
        <div>
          <h3 className="text-3xl font-medium my-5 text-priColor">All Slots</h3>
          <div>
            <Table className="w-full table-auto md:table-fixed">
              {slots?.length !== 0 && (
                <TableCaption>A list of all slots.</TableCaption>
              )}
              <TableHeader className="hidden md:table-header-group">
                <TableRow>
                  <TableHead>Room Name</TableHead>
                  <TableHead>Room No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              {slots?.length === 0 ? (
                <TableCaption className="text-black text-opacity-50 font-bold text-xl lg:text-2xl mt-10">
                  No slot found
                </TableCaption>
              ) : (
                <TableBody className="block md:table-row-group">
                  {slots?.map((slot) => (
                    <EachSlot key={slot?._id} slot={slot} />
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

export default AllSlots;
