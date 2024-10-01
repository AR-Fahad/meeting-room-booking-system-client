/* eslint-disable @typescript-eslint/no-explicit-any */
import GhostButton from "@/components/buttons/GhostButton";
import { TableCell, TableRow } from "@/components/ui/table";
import { TRoom } from "@/interfaces/room.interface";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "../../../../../styles/toast/toast.css";
import { TransitionProps } from "@mui/material/transitions";
import PriButton from "@/components/buttons/PriButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/components/Form Inputs/TextInput";
import MultiSelect from "@/components/Form Inputs/MultiSelect";
import { amenities } from "@/constants/room.constants";
import {
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "@/redux/features/room/roomApi";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EachRoom = ({ room }: { room: TRoom }) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisable] = useState(false);
  const defaultValues = JSON.stringify({
    name: room?.name,
    roomNo: room?.roomNo,
    floorNo: room?.floorNo,
    capacity: room?.capacity,
    pricePerSlot: room?.pricePerSlot,
    amenities: room?.amenities?.map((amenity) => ({
      title: amenity,
      value: amenity,
    })),
  });

  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();
  const { control, handleSubmit, watch } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisable(true);
    const toastId = toast.loading("Updating room");
    const { amenities: options, ...restData } = data;

    const amenities = options?.map((option: any) => option.value);

    try {
      await updateRoom({
        updateInfo: { ...restData, amenities },
        id: room?._id,
      });
      toast.success("Room updated", { id: toastId });
      setDisable(false);
      setOpen(false);
    } catch (err: any) {
      toast.error(
        err?.data?.errorMessages[0]?.message ||
          err?.message ||
          "Something went wrong",
        {
          id: toastId,
        }
      );
      setDisable(false);
    }
  };

  const confirmDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
        container: "swal2-container",
        popup: "swal2-popup",
        title: "swal-title-small",
      },
    }).then(async (result) => {
      if (result?.isConfirmed) {
        const toastId = toast.loading("Deleting room");
        try {
          await deleteRoom(room?._id);
          toast?.success("Room deleted successfully", {
            id: toastId,
          });
        } catch (err: any) {
          toast.error(
            err?.data?.errorMessages[0]?.message ||
              err?.message ||
              "Something went wrong",
            {
              id: toastId,
            }
          );
        }
      }
    });
  };

  const dialogContainer = (
    <>
      <GhostButton
        onClick={() => setOpen(true)}
        className="hover:text-priColor"
        sm
      >
        <MdEdit className="w-5 h-5 " />
      </GhostButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "800px",
            maxHeight: "70vh",
            height: "100%",
            width: "100%",
          },
        }}
      >
        <DialogActions>
          <GhostButton onClick={() => setOpen(false)}>X</GhostButton>
        </DialogActions>
        <DialogTitle>Update Room</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <TextInput
                type="text"
                control={control}
                defaultValue={room?.name}
                name="name"
                label="Name"
                required
              />
              <TextInput
                type="number"
                control={control}
                defaultValue={room?.roomNo}
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
                defaultValue={room?.floorNo}
                integer
                min={1}
                required
              />
              <TextInput
                type="number"
                control={control}
                name="capacity"
                label="Capacity"
                defaultValue={room?.capacity}
                integer
                min={1}
                required
              />
              <TextInput
                type="number"
                control={control}
                name="pricePerSlot"
                label="Price Per Slot"
                defaultValue={room?.pricePerSlot}
                min={1}
                required
              />
              <MultiSelect
                control={control}
                name="amenities"
                label="Amenities"
                options={amenities}
                valuesWithTitles
                getOptionLabel={(option) => option?.title}
                defaultValue={room?.amenities?.map((amenity) => ({
                  title: amenity,
                  value: amenity,
                }))}
                required
              />
            </div>
            <div className="my-10">
              <PriButton
                disabled={JSON.stringify(watch()) === defaultValues || disabled}
              >
                Update Changes
              </PriButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
  return (
    <TableRow className="block mb-4 md:table-row lg:mb-0">
      {/* Mobile view */}
      <div className="md:hidden block p-4 border rounded-lg shadow-md bg-white">
        <div className="mb-2">
          <strong>Room Name:</strong> {room?.name}
        </div>
        <div className="mb-2">
          <strong>Room No:</strong> {room?.roomNo}
        </div>
        <div className="mb-2">
          <strong>Floor No:</strong> {room?.floorNo}
        </div>
        <div className="mb-2">
          <strong>Capacity:</strong> {room?.capacity}
        </div>
        <div className="mb-2">
          <strong>Price Per Slot:</strong> ${room?.pricePerSlot}
        </div>
        <div className="flex items-center gap-2">
          <strong>Action:</strong>{" "}
          <div>
            {dialogContainer}
            <GhostButton
              onClick={confirmDelete}
              className="hover:text-red-600"
              sm
            >
              <RiDeleteBin5Fill className="w-5 h-5" />
            </GhostButton>
          </div>
        </div>
      </div>
      {/* Desktop view */}
      <TableCell className="hidden md:table-cell font-medium">
        {room?.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">{room?.roomNo}</TableCell>
      <TableCell className="hidden md:table-cell">{room?.floorNo}</TableCell>
      <TableCell className="hidden md:table-cell">{room?.capacity}</TableCell>
      <TableCell className="hidden md:table-cell">
        ${room?.pricePerSlot}
      </TableCell>
      <TableCell className={`hidden md:table-cell text-center`}>
        <div>
          {dialogContainer}
          <GhostButton
            onClick={confirmDelete}
            className="hover:text-red-600"
            sm
          >
            <RiDeleteBin5Fill className="w-5 h-5" />
          </GhostButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EachRoom;
