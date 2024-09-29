import Loader from "@/components/loader/Loader";
import { TUser } from "@/interfaces/user.interface";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import img from "../../../assets/images/profile.png";

const Profile = () => {
  const { data: res, isLoading, isFetching } = useGetUserQuery(null);

  const user: TUser = res?.data;

  return (
    <>
      {!isLoading && !isFetching && user ? (
        <div>
          <h3 className="text-3xl font-medium my-5 text-priColor">Profile</h3>
          <div className="my-5 bg-white border rounded-sm shadow-sm py-[15vh] px-2 md:px-5 lg:px-10 ">
            <div className="flex flex-col md:flex-row-reverse items-center justify-between">
              <div>
                <img
                  src={img}
                  className="w-32 mb-10 md:mb-0  md:w-48 lg:w-60 mx-auto"
                  alt=""
                />
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="font-medium">
                    <h3 className="text-xl text-black text-opacity-60">
                      USER NAME:
                    </h3>
                    <div className="pl-2">
                      <span className="text-lg">{user?.name}</span>
                    </div>
                  </div>
                  <div className="font-medium">
                    <h3 className="text-xl text-black text-opacity-60">
                      EMAIL:
                    </h3>
                    <div className="pl-2 ">
                      <span className="text-lg">{user?.email}</span>
                    </div>
                  </div>
                  <div className="font-medium">
                    <h3 className="text-xl text-black text-opacity-60">
                      PHONE:
                    </h3>
                    <div className="pl-2 ">
                      <span className="text-lg">{user?.phone}</span>
                    </div>
                  </div>
                  <div className="font-medium">
                    <h3 className="text-xl text-black text-opacity-60">
                      ROLE:
                    </h3>
                    <div className="pl-2">
                      <span className="text-lg">
                        {user?.role?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="font-medium">
                    <h3 className="text-xl text-black text-opacity-60">
                      ADDRESS
                    </h3>
                    <div className="pl-2 ">
                      <span className="text-lg">{user?.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
