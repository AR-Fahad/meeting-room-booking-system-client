/* eslint-disable @typescript-eslint/no-explicit-any */
import SecButton from "@/components/buttons/SecButton";
import MUIDateInput from "@/components/Form Inputs/MUIDateInput";
import MultiSelect from "@/components/Form Inputs/MultiSelect";
import Loader from "@/components/loader/Loader";
import { TCheckout } from "@/interfaces/checkout.interface";
import { TSlot } from "@/interfaces/slot.interface";
import { TUser } from "@/interfaces/user.interface";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { setCheckout } from "@/redux/features/checkout/checkSlice";
import { useGetAvailableSlotsQuery } from "@/redux/features/slot/slotApi";
import { useAppDispatch } from "@/redux/hooks";
import { convertTo12HourFormat } from "@/utils/convert24hoursTo12hoursTime";
import { Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const RoomBooking = () => {
  const { id, name } = useParams();
  const dispatch = useAppDispatch();
  const method = useForm();
  const navigate = useNavigate();
  const {
    data: userRes,
    isLoading: isUserLoad,
    isFetching: isUserFetch,
  } = useGetUserQuery(null);
  const user: TUser = userRes?.data;

  const {
    data: slotRes,
    isLoading: isSlotLoad,
    isFetching: isSlotFetch,
  } = useGetAvailableSlotsQuery({
    roomId: id,
  });

  const {
    data: slotRes2,
    isLoading: isSlotLoad2,
    isFetching: isSlotFetch2,
  } = useGetAvailableSlotsQuery({
    roomId: id,
    date: method?.watch()?.date || "",
  });

  const slotsWithoutDate: TSlot[] = slotRes?.data;

  const availableDates: (string | undefined)[] | null =
    slotsWithoutDate && !isSlotFetch && !isSlotLoad
      ? slotsWithoutDate?.map((slot) => {
          return slot?.date;
        })
      : [];

  const slotsWithDate: TSlot[] = slotRes2?.data;

  if (
    (!isSlotFetch &&
      !isSlotLoad &&
      slotsWithoutDate &&
      !slotsWithoutDate?.length) ||
    (!isSlotFetch2 && !isSlotLoad2 && !slotsWithDate) ||
    (!isUserLoad && !isUserFetch && !user)
  ) {
    navigate("/meeting-rooms");
  }

  const multiOptions: any[] =
    !isSlotFetch &&
    !isSlotFetch2 &&
    slotsWithoutDate &&
    slotsWithDate &&
    method?.watch()?.date
      ? slotsWithDate?.map((slot) => ({
          title: `${convertTo12HourFormat(
            slot?.startTime
          )}-${convertTo12HourFormat(slot?.endTime)}`,
          value: slot?._id,
        }))
      : [];

  let checkout: TCheckout;

  if (
    !isSlotLoad2 &&
    !isUserLoad &&
    !isUserLoad &&
    !isSlotFetch &&
    !isSlotFetch2 &&
    !isUserFetch &&
    user &&
    slotsWithoutDate &&
    slotsWithDate &&
    method?.watch()?.slots?.length &&
    name
  ) {
    checkout = {
      roomName: name as string,
      userInfo: user,
      bookingInfo: {
        date: method?.watch()?.date,
        slots: method
          ?.watch()
          ?.slots?.map(({ value }: { value: any }) => value),
        room: id as string,
        user: user?._id as string,
      },
      slotsTime: method
        ?.watch()
        ?.slots?.map(({ title }: { title: any }) => title)
        ?.join(", "),
      pricePerSlot: slotsWithoutDate[0]?.room?.pricePerSlot,
      totalCost:
        method?.watch()?.slots?.length *
        slotsWithoutDate[0]?.room?.pricePerSlot,
    };
    // console.log(checkout);
  }

  return (
    <>
      {!isSlotLoad && !isSlotLoad2 && !isUserLoad ? (
        <div className="mt-5">
          <h3 className="font-semibold text-3xl text-center">Booking</h3>
          <p className="text-center">
            <small className="font-medium">{name}</small>
          </p>

          <div className="my-10 flex flex-col md:flex-row justify-between">
            <div className="flex-1 p-5">
              <div className="">
                <h3 className="text-xl font-semibold">User Information</h3>
                <div className="p-3 flex flex-col gap-2">
                  <p>
                    <span className="font-medium">Name:</span> {user?.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {user?.phone}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {user?.address}
                  </p>
                </div>
              </div>
            </div>
            <Divider orientation="vertical" variant="middle" flexItem />
            <div className="flex-1 p-5">
              <div>
                <h3 className="text-xl font-semibold">Booking Information</h3>
                <div className="p-3 flex flex-col gap-5">
                  <MUIDateInput
                    name="date"
                    label="Available Date"
                    availableDates={availableDates}
                    disable={!availableDates?.length}
                    control={method.control}
                  />

                  <MultiSelect
                    getOptionLabel={(options) => options.title}
                    options={multiOptions}
                    control={method.control}
                    valuesWithTitles={true}
                    name="slots"
                    label="Select Available Time"
                    disable={
                      (!method.watch()?.date && !multiOptions?.length) ||
                      isSlotFetch2
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mb-10">
            <SecButton
              onClick={() => {
                dispatch(setCheckout(checkout));
                navigate("/checkout");
              }}
              disabled={
                !method?.watch()?.slots?.length || !method?.watch()?.date
              }
            >
              Proceed To Checkout
            </SecButton>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default RoomBooking;
