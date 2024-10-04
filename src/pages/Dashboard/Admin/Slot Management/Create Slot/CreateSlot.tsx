/* eslint-disable @typescript-eslint/no-explicit-any */
import PriButton from "@/components/buttons/PriButton";
import MUIDateInput from "@/components/Form Inputs/MUIDateInput";
import SelectInput from "@/components/Form Inputs/SelectInput";
import TimeRangePicker from "@/components/Form Inputs/TimeRangePicker";
import { TRoom } from "@/interfaces/room.interface";
import { useGetAllRoomsQuery } from "@/redux/features/room/roomApi";
import { useCreateSlotMutation } from "@/redux/features/slot/slotApi";
import { showError } from "@/utils/showError";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateSlot = () => {
  const { control, handleSubmit, reset } = useForm();
  const [btnDisable, setBtnDisable] = useState(false);
  const { data: res, isFetching, isLoading } = useGetAllRoomsQuery(null);
  const [createSlot] = useCreateSlotMutation();
  const rooms: TRoom[] = res?.data;

  const roomOptions = rooms
    ? rooms?.map((room) => ({
        label: `${room?.name} (Room: ${room?.roomNo}, Floor: ${room?.floorNo}, Capacity: ${room?.capacity})`,
        value: room?._id,
      }))
    : [];
  const durationOptions = [30, 60, 90, 120].map((duration) => ({
    label: `${duration} minutes`,
    value: duration,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setBtnDisable(true);
    const toastId = toast.loading("Creating slot");
    try {
      await createSlot(data).unwrap();
      reset();
      toast.success("Slot created successfully", { id: toastId });
      setBtnDisable(false);
    } catch (err: any) {
      showError(err, toastId);
      setBtnDisable(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-medium my-5 text-priColor">Create Slot</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SelectInput
            label="Room"
            name="room"
            control={control}
            options={roomOptions}
            disabled={isFetching || isLoading || btnDisable}
            required
          />
          <SelectInput
            label="Duration Per Slot"
            name="durationPerSlot"
            control={control}
            options={durationOptions}
            disabled={isFetching || isLoading || btnDisable}
            required
          />

          <MUIDateInput
            name="date"
            disable={btnDisable}
            label="Date"
            control={control}
            required
          />

          <TimeRangePicker
            control={control}
            disable={btnDisable}
            required
            startName="startTime"
            endName="endTime"
          />
        </div>
        <div className="my-10">
          <PriButton disabled={btnDisable}>Create Slot</PriButton>
        </div>
      </form>
    </div>
  );
};

export default CreateSlot;
