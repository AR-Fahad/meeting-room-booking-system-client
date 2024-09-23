import { Skeleton } from "../ui/skeleton";

const MRDetailsSkeleton = () => {
  return (
    <>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 lg:gap-5">
        <div>
          <div className="p-2 bg-slate-50 h-60 w-full md:h-72 lg:h-80 lg:w-[85%] mx-auto shadow-xl border overflow-hidden">
            <Skeleton className="h-full w-full"></Skeleton>
          </div>
          <div className="flex justify-center items-center gap-3 mt-5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                className={`${i === 1 ? "h-[37px] w-[62px]" : "h-9 w-14"}`}
              ></Skeleton>
            ))}
          </div>
        </div>
        <div className="pt-2 md:pt-4">
          <div>
            <div>
              <Skeleton className="h-8 w-60"></Skeleton>
            </div>
            <div className="w-full h-48 flex items-center">
              <div className="space-y-5">
                <div className="flex gap-20">
                  <div className="space-y-1">
                    <div>
                      <Skeleton className="h-6 w-20"></Skeleton>
                    </div>
                    <Skeleton className="h-6 w-12"></Skeleton>
                  </div>
                  <div className="space-y-1">
                    <div>
                      <Skeleton className="h-6 w-20"></Skeleton>
                    </div>
                    <Skeleton className="h-6 w-12"></Skeleton>
                  </div>
                </div>
                <div className="flex gap-20">
                  <div className="space-y-1">
                    <div>
                      <Skeleton className="h-6 w-20"></Skeleton>
                    </div>
                    <Skeleton className="h-6 w-12"></Skeleton>
                  </div>
                  <div className="space-y-1">
                    <div>
                      <Skeleton className="h-6 w-24"></Skeleton>
                    </div>
                    <Skeleton className="h-6 w-12"></Skeleton>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Skeleton className="h-8 md:h-9 w-24"></Skeleton>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 md:p-5 lg:p-10 space-y-2">
        <div>
          <Skeleton className="h-7 w-36"></Skeleton>
        </div>

        <div>
          <Skeleton className="h-5 w-[30%]"></Skeleton>
        </div>
        <div>
          <Skeleton className="h-5 w-[30%]"></Skeleton>
        </div>
        <div>
          <Skeleton className="h-5 w-[30%]"></Skeleton>
        </div>
        <div>
          <Skeleton className="h-5 w-[30%]"></Skeleton>
        </div>
        <div>
          <Skeleton className="h-5 w-[30%]"></Skeleton>
        </div>
      </div>
    </>
  );
};

export default MRDetailsSkeleton;
