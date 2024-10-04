/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

export const showError = (err: any, toastId: string | number) => {
  toast.error(
    err?.data?.errorMessages[0]?.message ||
      err?.message ||
      "Something went wrong",
    {
      id: toastId,
    }
  );
};
