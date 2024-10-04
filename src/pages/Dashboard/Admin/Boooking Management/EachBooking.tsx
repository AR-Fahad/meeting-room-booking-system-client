/* eslint-disable @typescript-eslint/no-explicit-any */
import { TBooking } from "@/interfaces/booking.interface";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import GhostButton from "@/components/buttons/GhostButton";
import PriButton from "@/components/buttons/PriButton";
import SelectInput from "@/components/Form Inputs/SelectInput";
import { TableCell, TableRow } from "@/components/ui/table";
import { TUser } from "@/interfaces/user.interface";
import {
  Dialog,
  DialogActions,
  Slide,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import {
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from "@/redux/features/booking/bookingApi";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "../../../../styles/toast/toast.css";
import { showError } from "@/utils/showError";
import { convertTo12HourFormat } from "@/utils/convert24hoursTo12hoursTime";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const options = [
  { value: "confirmed", label: "Confirmed" },
  { value: "unconfirmed", label: "Unconfirmed" },
  { value: "canceled", label: "Canceled" },
];

const EachBooking = ({ booking }: { booking: TBooking }) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, watch } = useForm();
  const [disabled, setDisable] = useState(false);
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

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
        const toastId = toast.loading("Deleting booking");
        try {
          await deleteBooking(booking?._id).unwrap();
          toast?.success("Booking deleted successfully", {
            id: toastId,
          });
        } catch (err: any) {
          showError(err, toastId);
        }
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (updateInfo) => {
    setDisable(true);
    const toastId = toast.loading("Updating status");
    const data = {
      updateInfo,
      id: booking?._id,
    };
    try {
      await updateBooking(data).unwrap();
      toast.success("Status updated", { id: toastId });
      setDisable(false);
      setOpen(false);
    } catch (err: any) {
      showError(err, toastId);
      setDisable(false);
    }
  };

  const dialogContainer = (
    <>
      <GhostButton
        disabled={booking?.isConfirmed === "canceled"}
        onClick={handleClickOpen}
        className="hover:text-priColor"
        sm
      >
        <MdEdit className="w-5 h-5" />
      </GhostButton>
      <Dialog
        open={open || disabled}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{ "& .MuiDialog-paper": { minWidth: "400px" } }}
      >
        <DialogActions>
          <GhostButton onClick={() => setOpen(false)}>X</GhostButton>
        </DialogActions>
        <DialogTitle>Change Status</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-5">
            <SelectInput
              label="Status"
              name="isConfirmed"
              control={control}
              options={options}
              defaultValue={booking?.isConfirmed}
              disabled={booking?.isConfirmed === "canceled" || disabled}
            />
            <div>
              <PriButton
                disabled={
                  disabled ||
                  booking?.isConfirmed === watch()?.isConfirmed ||
                  booking?.isConfirmed === "canceled"
                }
              >
                Save Changes
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
          <strong>Room Name:</strong> {booking?.room?.name}
        </div>
        <div className="mb-2">
          <strong>User Name:</strong> {(booking?.user as TUser)?.name}
        </div>
        <div className="mb-2">
          <strong>Date:</strong> {booking?.date}
        </div>
        <div className="mb-2">
          <strong>Time:</strong>{" "}
          {booking?.slots
            ?.map(
              (slot) =>
                `${convertTo12HourFormat(
                  slot?.startTime
                )}-${convertTo12HourFormat(slot?.endTime)}`
            )
            .join(", ")}
        </div>
        <div className="mb-2">
          <strong>Total Cost:</strong> ${booking?.totalAmount}
          <small
            className={`${booking?.isPaid ? "text-green-600" : "text-red-600"}`}
          >
            {booking?.isPaid ? "(Paid)" : "(Not Paid)"}
          </small>
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              booking?.isConfirmed === "confirmed"
                ? "text-green-600"
                : "text-orange-600"
            }`}
          >
            {booking?.isConfirmed}
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
        {booking?.room?.name}
      </TableCell>
      <TableCell className="hidden md:table-cell font-medium">
        {(booking?.user as TUser)?.name}
      </TableCell>
      <TableCell className="hidden md:table-cell">{booking?.date}</TableCell>
      <TableCell className="hidden md:table-cell">
        {booking?.slots
          ?.map(
            (slot) =>
              `${convertTo12HourFormat(
                slot?.startTime
              )}-${convertTo12HourFormat(slot?.endTime)}`
          )
          .join(", ")}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        ${booking?.totalAmount}
        <small
          className={`${booking?.isPaid ? "text-green-600" : "text-red-600"}`}
        >
          {booking?.isPaid ? "(Paid)" : "(Not Paid)"}
        </small>
      </TableCell>
      <TableCell
        className={`hidden md:table-cell ${
          booking?.isConfirmed === "confirmed"
            ? "text-green-600"
            : "text-orange-600"
        }`}
      >
        {booking?.isConfirmed}
      </TableCell>
      <TableCell className={`hidden md:table-cell text-center`}>
        <div className="text-center">
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

export default EachBooking;
