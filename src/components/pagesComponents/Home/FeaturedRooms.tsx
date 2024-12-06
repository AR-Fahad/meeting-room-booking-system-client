import PriButton from "@/components/buttons/PriButton";
import SecButton from "@/components/buttons/SecButton";
import Heading from "@/components/heading/Heading";
import MRoomsSkeleton from "@/components/Skeleton/MRoomsSkeleton";
import { TRoom } from "@/interfaces/room.interface";
import { useGetAllRoomsQuery } from "@/redux/features/room/roomApi";
import { Link } from "react-router-dom";

const FeaturedRooms = () => {
  const { data: res, isLoading } = useGetAllRoomsQuery({ limit: 4 });
  const data: TRoom[] = res?.data;

  return (
    <div>
      <Heading>Featured Rooms</Heading>
      <div className="mt-5">
        {isLoading && !data ? (
          <MRoomsSkeleton limit={4} />
        ) : (
          <>
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
                          <SecButton className="w-full">Show Details</SecButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <Link to="meeting-rooms">
                <PriButton>Show All Rooms</PriButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedRooms;
