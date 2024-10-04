/* eslint-disable @typescript-eslint/no-explicit-any */
import GhostButton from "@/components/buttons/GhostButton";
import PriButton from "@/components/buttons/PriButton";
import MUIDateInput from "@/components/Form Inputs/MUIDateInput";
import TimeRangePicker from "@/components/Form Inputs/TimeRangePicker";
import { TableCell, TableRow } from "@/components/ui/table";
import { TSlot } from "@/interfaces/slot.interface";
import {
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} from "@/redux/features/slot/slotApi";
import { convertTo12HourFormat } from "@/utils/convert24hoursTo12hoursTime";
import { showError } from "@/utils/showError";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
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

const EachSlot = ({ slot }: { slot: TSlot }) => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisable] = useState(false);
  const defaultValues = JSON.stringify({
    date: slot?.date,
    startTime: slot?.startTime,
    endTime: slot?.endTime,
  });
  const { control, watch, handleSubmit } = useForm();
  const [deleteSlot] = useDeleteSlotMutation();
  const [updateSlot] = useUpdateSlotMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisable(true);
    const toastId = toast.loading("Updating slot");
    const updateInfo = {
      ...data,
      room: slot?.room?._id,
    };
    try {
      await updateSlot({ slotId: slot?._id, updateInfo }).unwrap();
      toast.success("Slot updated", { id: toastId });
      setDisable(false);
      setOpen(false);
    } catch (err: any) {
      showError(err, toastId);
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
        const toastId = toast.loading("Deleting slot");
        try {
          await deleteSlot(slot?._id).unwrap();
          toast?.success("Slot deleted successfully", {
            id: toastId,
          });
        } catch (err: any) {
          showError(err, toastId);
        }
      }
    });
  };

  const dialogContainer = (
    <>
      <GhostButton
        onClick={() => setOpen(true)}
        disabled={slot?.isBooked}
        className="hover:text-priColor"
        sm
      >
        <MdEdit className="w-5 h-5 " />
      </GhostButton>
      <Dialog
        open={open || disabled}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "700px",
            maxHeight: "70vh",
            width: "100%",
          },
        }}
      >
        <DialogActions>
          <GhostButton onClick={() => setOpen(false)}>X</GhostButton>
        </DialogActions>
        <DialogTitle>Update Slot</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-5">
              <MUIDateInput
                defaultValue={slot?.date}
                name="date"
                label="Date"
                control={control}
                disable={disabled}
                required
              />

              <TimeRangePicker
                defaultValue={[slot?.startTime, slot?.endTime]}
                control={control}
                disable={disabled}
                required
                startName="startTime"
                endName="endTime"
              />
            </div>
            <div className="my-10">
              <PriButton
                disabled={
                  JSON.stringify(watch()) === defaultValues ||
                  disabled ||
                  slot?.isBooked
                }
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
          <strong>Room Name:</strong> {slot?.room?.name}
        </div>
        <div className="mb-2">
          <strong>Room No:</strong> {slot?.room?.roomNo}
        </div>
        <div className="mb-2">
          <strong>Date:</strong> {slot?.date}
        </div>
        <div className="mb-2">
          <strong>Period:</strong>{" "}
          {`${convertTo12HourFormat(slot?.startTime)}-${convertTo12HourFormat(
            slot?.endTime
          )}`}
        </div>
        <div className="mb-2">
          <strong>Price:</strong> ${slot?.room?.pricePerSlot}
        </div>
        <div className="mb-2">
          <strong>Status:</strong>{" "}
          <span
            className={`${slot?.isBooked ? "text-green-600" : "text-red-600"}`}
          >
            {slot?.isBooked ? "Booked" : "Not Booked"}
          </span>
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
        {slot?.room?.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {slot?.room?.roomNo}
      </TableCell>
      <TableCell className="hidden md:table-cell">{slot?.date}</TableCell>
      <TableCell className="hidden md:table-cell">
        {`${convertTo12HourFormat(slot?.startTime)}-${convertTo12HourFormat(
          slot?.endTime
        )}`}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        ${slot?.room?.pricePerSlot}
      </TableCell>
      <TableCell
        className={`hidden md:table-cell ${
          slot?.isBooked ? "text-green-600" : "text-red-600"
        }`}
      >
        {slot?.isBooked ? "Booked" : "Not Booked"}
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

export default EachSlot;
