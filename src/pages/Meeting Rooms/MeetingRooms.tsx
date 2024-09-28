import SecButton from "@/components/buttons/SecButton";
import FilterForm from "@/components/Meeting Rooms/FilterForm";
import { TRoom } from "@/interfaces/room.interface";
import { useGetAllRoomsQuery } from "@/redux/features/room/roomApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useForm } from "react-hook-form";
import MRoomsSkeleton from "@/components/Skeleton/MRoomsSkeleton";

const MeetingRooms = () => {
  const methods = useForm();

  const [queries, setQueries] = useState({
    searchTerm: "",
    max: "",
    min: "",
    maxCap: "",
    minCap: "",
    sort: "",
  });

  const { data: res, isLoading, isFetching } = useGetAllRoomsQuery(queries);

  const data: TRoom[] = res?.data;

  return (
    <div>
      {/* Search Bar */}
      <div className="flex flex-row-reverse items-center px-1 py-5 md:p-5">
        <div className="flex-1">
          <input
            id="search"
            type="text"
            defaultValue=""
            onChange={(e) =>
              setQueries({ ...queries, searchTerm: e?.target?.value })
            }
            className="mt-1 block w-full px-3 py-1 md:py-2 border-gray-300 rounded-md shadow-sm focus:ring-priColor focus:border-priColor border-[1.5px] focus:outline-none  text-sm md:text-base"
            placeholder="Search..."
          />
        </div>
        <FilterForm
          methods={methods}
          setQueries={setQueries}
          queries={queries}
        />
      </div>
      {!isLoading && !isFetching ? (
        <>
          {data?.length === 0 ? (
            <div className="min-h-[50vh] flex justify-center items-center">
              <h3 className="text-black text-opacity-50 font-bold text-xl lg:text-2xl mt-10">
                There is no room available
              </h3>
            </div>
          ) : (
            <div className="min-h-screen">
              <div className="p-2 md:p-5 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
                {data?.map((room) => (
                  <div key={room?._id} className="group">
                    <div className="p-2 md:p-3 lg:p-4 bg-white border rounded-md shadow-sm lg:group-hover:shadow-xl">
                      <div className="overflow-hidden h-24 md:h-36 lg:h-44 rounded-sm">
                        <img
                          className="h-full w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                          src={room?.image[0]}
                          alt=""
                        />
                      </div>
                      <div className="pt-3 pb-1 space-y-2">
                        <div className="h-[42px] md:h-[50px] lg:h-[58px] flex items-center">
                          <h3 className="font-bold text-sm md:text-base lg:text-lg">
                            {room?.name}
                          </h3>
                        </div>
                        <p className="text-xs md:text-sm">
                          Price per slot:{" "}
                          <span className="font-medium">
                            ${room?.pricePerSlot}
                          </span>
                        </p>
                        <p className="text-xs md:text-sm">
                          Capacity:{" "}
                          <span className="font-medium">{room?.capacity}</span>
                        </p>
                        <div>
                          <Link to={`/meeting-rooms/${room?._id}`}>
                            <SecButton w>Show Details</SecButton>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <MRoomsSkeleton />
      )}

      {/* for pagination  */}
      <div className="my-10 flex items-end justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default MeetingRooms;
