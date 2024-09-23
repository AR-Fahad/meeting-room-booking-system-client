import PriButton from "@/components/buttons/PriButton";
import MRDetailsSkeleton from "@/components/Skeleton/MRDetailsSkeleton";
import { TRoom } from "@/interfaces/room.interface";
import { useGetRoomQuery } from "@/redux/features/room/roomApi";
import { useEffect, useState } from "react";
import { MdAddToHomeScreen } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";

const MRoomDetails = () => {
  const { id } = useParams();
  const { data: res, isLoading, isFetching } = useGetRoomQuery(id);
  const navigate = useNavigate();
  const [img, setImg] = useState("");

  const room: TRoom = res?.data;

  if (!isLoading && !isFetching && !room) {
    navigate("/meeting-rooms");
  }

  useEffect(() => {
    if (room && !img) {
      setImg(room?.image[0]);
    }
  }, [room, img]);

  return (
    <div>
      <div className="px-5 md:px-10 lg:px-14 py-5 flex items-center text-sm">
        <Link
          className="text-black text-opacity-50 flex items-center gap-[2px] hover:text-priColor hover:underline"
          to="/meeting-rooms"
        >
          <MdAddToHomeScreen className="h-5" /> All Meeting Rooms
        </Link>
        {!isLoading && !isFetching && room ? (
          <p>
            /<span className="font-medium">{room?.name}</span>
          </p>
        ) : (
          <></>
        )}
      </div>
      {!isFetching && !isLoading ? (
        <>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 lg:gap-5">
            <div>
              <div className="p-2 bg-slate-50 h-60 w-full md:h-72 lg:h-80 lg:w-[85%] mx-auto shadow-xl border overflow-hidden">
                <img
                  src={img}
                  className="h-full w-full transition-transform duration-300 ease-in-out transform hover:scale-[1.08] hover:shadow-xl hover:border"
                  alt=""
                />
              </div>
              <div className="flex justify-center items-center gap-3 mt-5">
                {room?.image?.map((i) => (
                  <button
                    onClick={() => setImg(i)}
                    className={`border-[1.5px] ${
                      i === img
                        ? "border-priColor scale-110"
                        : "border-gray-300 opacity-50 hover:opacity-100"
                    }`}
                    key={i}
                  >
                    <img src={i} className="h-9 w-14" alt="" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold pt-4">{room?.name}</h3>
              <div className="w-full h-48 flex items-center">
                <div className="space-y-5">
                  <div className="flex gap-20">
                    <div>
                      <h3 className=" underline">Room No:</h3>
                      <span className="font-semibold">{room?.roomNo}</span>
                    </div>
                    <div>
                      <h3 className=" underline">Floor No:</h3>
                      <span className="font-semibold">{room?.floorNo}</span>
                    </div>
                  </div>
                  <div className="flex gap-20">
                    <div>
                      <h3 className=" underline">Capacity:</h3>
                      <span className="font-semibold">{room?.capacity}</span>
                    </div>
                    <div>
                      <h3 className="underline">Price Per Slot:</h3>
                      <span className="font-bold">${room?.pricePerSlot}</span>
                    </div>
                  </div>
                </div>
              </div>
              <PriButton>Book Now</PriButton>
            </div>
          </div>
          <div className="p-3 md:p-5 lg:p-10">
            <h3 className="text-xl font-semibold">Room Amenities</h3>

            {room?.amenities?.map((amenity) => (
              <li className="list-disc" key={amenity}>
                {amenity}
              </li>
            ))}
          </div>
        </>
      ) : (
        <MRDetailsSkeleton />
      )}
    </div>
  );
};

export default MRoomDetails;
