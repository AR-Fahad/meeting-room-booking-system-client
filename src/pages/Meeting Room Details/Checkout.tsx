/* eslint-disable @typescript-eslint/no-explicit-any */
import PriButton from "@/components/buttons/PriButton";
import RadioGroupInput from "@/components/Form Inputs/RadioGroupInput";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { clearCheckout } from "@/redux/features/checkout/checkSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FormLabel } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const paymentMethod = [
  { value: "stripe", label: "Stripe" },
  { value: "aamarPay", label: "aamarPay" },
  { value: "later", label: "Later" },
];

const Checkout = () => {
  const [btnOn, setBtnOn] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [createBooking] = useCreateBookingMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const {
    userInfo,
    bookingInfo,
    slotsTime,
    roomName,
    pricePerSlot,
    totalCost,
  } = useAppSelector((state) => state?.checkout);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { payment } = data;
    setBtnOn(true);

    try {
      if (payment === "aamarPay") {
        toast.info("aamarPay payment system implement soon");
        setBtnOn(false);
        return;
      }
      if (payment === "stripe") {
        if (!stripe || !elements) {
          toast.error("Something went wrong");
          setBtnOn(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
          toast.error("Card element not found.");
          setBtnOn(false);
          return;
        }

        const { error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

        if (error) {
          toast.error(error?.message || "An error occurred");
          setBtnOn(false);
          return;
        }
        await createBooking({ ...bookingInfo, isConfirmed: "confirmed" });
        toast.success("Booking successful (confirmed)");
        setBtnOn(false);
        dispatch(clearCheckout());
      }

      if (payment === "later") {
        await createBooking({ ...bookingInfo, isConfirmed: "unconfirmed" });
        toast.success("Booking successful (unconfirmed)");
        setBtnOn(false);
        dispatch(clearCheckout());
      }
    } catch (err: any) {
      // console.log(err);
      toast.error(
        err?.data?.errorMessages[0]?.message ||
          err?.message ||
          "Something went wrong"
      );
      setBtnOn(false);
    }
  };

  useEffect(() => {
    if (
      !userInfo &&
      !bookingInfo &&
      !pricePerSlot &&
      !totalCost &&
      !slotsTime &&
      !roomName
    ) {
      navigate("/meeting-rooms");
    }
  }, [
    userInfo,
    bookingInfo,
    pricePerSlot,
    totalCost,
    slotsTime,
    roomName,
    navigate,
  ]);

  return (
    <div className="w-[95%] md:w-[70%] mx-auto">
      <h3 className="font-semibold text-3xl text-center my-5">Checkout</h3>
      <div className="grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold">User Info</h3>
          <div className="space-y-2 p-3">
            <p>
              <span className="font-medium">Name:</span> {userInfo?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {userInfo?.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {userInfo?.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {userInfo?.address}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Booking Info</h3>
          <div className="space-y-2 p-3">
            <p>
              <span className="font-medium">Room:</span> {roomName}
            </p>
            <p>
              <span className="font-medium">Date:</span> {bookingInfo?.date}
            </p>
            <p>
              <span className="font-medium">Time:</span> {slotsTime}
            </p>
            <p>
              <span className="font-medium">Price Per Slot:</span> $
              {pricePerSlot}
            </p>
            <p>
              <span className="font-medium">Total Cost:</span> ${totalCost}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-10 mt-5">
        <h3 className="text-xl font-semibold">Payment Method</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="p-3 space-y-2">
          <div>
            <RadioGroupInput
              name="payment"
              label="Select Payment Method"
              control={control}
              options={paymentMethod}
              required
            />
          </div>
          {watch().payment === "stripe" && (
            <div>
              <FormLabel component="legend">Provide Card Info</FormLabel>
              <div className="p-3">
                <CardElement
                  id="card-container"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <div>
            <PriButton makeLoading={btnOn} disabled={btnOn}>
              {btnOn ? "Confirm Booking..." : "Confirm Payment"}
            </PriButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
