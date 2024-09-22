import { Skeleton } from "../ui/skeleton";

const MRoomsSkeleton = () => {
  return (
    <div className="p-2 md:p-5 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((room) => (
        <div key={room}>
          <div className="p-2 md:p-3 lg:p-4 bg-white border rounded-md shadow-sm">
            <div className="h-24 md:h-36 lg:h-44 rounded-sm">
              <Skeleton className="h-full w-full"></Skeleton>
            </div>
            <div className="pt-3 pb-1 space-y-2">
              <div className="h-[42px] md:h-[50px] lg:h-[58px] flex items-center">
                <Skeleton className="h-[26px] w-[75%]"></Skeleton>
              </div>
              <div className="h-4 md:h-5">
                <Skeleton className="h-full w-[50%]"></Skeleton>
              </div>

              <div className="h-4 md:h-5">
                <Skeleton className="h-full w-[40%]"></Skeleton>
              </div>
              <div className="h-8 md:h-9">
                <Skeleton className="h-full w-full"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MRoomsSkeleton;
