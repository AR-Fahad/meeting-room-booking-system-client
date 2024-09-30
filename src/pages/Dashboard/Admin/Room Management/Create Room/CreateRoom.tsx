/* eslint-disable @typescript-eslint/no-explicit-any */
import PriButton from "@/components/buttons/PriButton";
import ImagesUpload from "@/components/Form Inputs/ImagesUpload";
import MultiSelect from "@/components/Form Inputs/MultiSelect";
import TextInput from "@/components/Form Inputs/TextInput";
import { useCreateRoomMutation } from "@/redux/features/room/roomApi";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const options = [
  "Adequate Seating",
  "Table Space",
  "Projector & Screen",
  "Whiteboard & Markers",
  "Video Conferencing Facilities",
  "On-Site Support Staff",
  "Audio & visual Equipment",
  "Wi-Fi access",
  "Power Outlets",
  "Natural Light",
  "Temperature Control",
  "Flip Charts",
  "Storage Space",
  "Water and Coffee Station",
  "Emergency Exit",
].map((option) => ({
  title: option,
  value: option,
}));

const CreateRoom = () => {
  const { control, handleSubmit, reset } = useForm();
  const [btnDisable, setBtnDisable] = useState(false);
  const [createRoom] = useCreateRoomMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setBtnDisable(true);
    const toastId = toast.loading("Creating room");
    const { amenities, imagesFile, ...restData } = data;
    try {
      const image = await Promise.all(
        imagesFile.map(async (imageFile: any) => {
          const file = imageFile.file;
          const url = await uploadImageToCloudinary(file);
          return url;
        })
      ).catch((err) => {
        if (err) {
          throw Error(err);
        }
      });
      const roomInfo = {
        ...restData,
        amenities: amenities?.map((amenity: any) => amenity?.value),
        image,
      };
      await createRoom(roomInfo);
      reset();
      toast.success("Room created successfully", { id: toastId });
      setBtnDisable(false);
    } catch (err: any) {
      toast.error(
        err?.data?.errorMessages[0]?.message ||
          err?.message ||
          "Something went wrong",
        {
          id: toastId,
        }
      );
      setBtnDisable(false);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-medium my-5 text-priColor">Create Room</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextInput
            type="text"
            control={control}
            name="name"
            label="Name"
            required
          />
          <TextInput
            type="number"
            control={control}
            name="roomNo"
            label="Room No"
            integer
            min={1}
            required
          />
          <TextInput
            type="number"
            control={control}
            name="floorNo"
            label="Floor No"
            integer
            min={1}
            required
          />
          <TextInput
            type="number"
            control={control}
            name="capacity"
            label="Capacity"
            integer
            min={1}
            required
          />
          <TextInput
            type="number"
            control={control}
            name="pricePerSlot"
            label="Price Per Slot"
            min={1}
            required
          />
          <MultiSelect
            control={control}
            name="amenities"
            label="Amenities"
            options={options}
            valuesWithTitles
            getOptionLabel={(option) => option?.title}
            required
          />
          <div className="md:col-span-2">
            <ImagesUpload
              label="Upload Images"
              control={control}
              name="imagesFile"
              required
              maxNumber={4}
            />
          </div>
        </div>
        <div className="my-10">
          <PriButton disabled={btnDisable}>Create Booking</PriButton>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
