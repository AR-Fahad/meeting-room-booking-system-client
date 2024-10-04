/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, FieldValues } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type TDatePickerInput = {
  label?: string;
  placeholder?: string;
  control: Control<FieldValues, unknown>;
  name: string;
  required?: boolean;
  disable?: boolean;
  availableDates?: (string | undefined)[] | null;
  defaultValue?: string;
};

const formatDate = (date: any): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

const MUIDateInput = ({
  label,
  name,
  control,
  required,
  placeholder,
  disable,
  availableDates,
  defaultValue,
}: TDatePickerInput) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue ? defaultValue : ""}
          render={({ field: { onChange, value, onBlur } }) => (
            <DatePicker
              disabled={disable}
              label={label}
              value={value ? dayjs(value) : null} // Convert string to Dayjs object
              onChange={(newDate) => {
                const selectedDate = newDate ? formatDate(newDate) : "";
                if (availableDates && !availableDates.includes(selectedDate)) {
                  onChange("");
                } else {
                  onChange(selectedDate);
                }
                // Update react-hook-form state
              }}
              format="YYYY-MM-DD" // Use this to format the date
              slotProps={{
                textField: {
                  fullWidth: true,
                  onBlur: onBlur,
                  placeholder: placeholder,
                  variant: "standard",
                  required: required,
                  disabled: disable,
                },
              }}
              shouldDisableDate={(date) => {
                const formattedDate = formatDate(date);
                if (
                  (availableDates && availableDates.includes(formattedDate)) ||
                  !availableDates
                ) {
                  return false;
                } else {
                  return true;
                }
                //   return !availableDates.includes(formattedDate); // Disable dates not in availableDates
              }}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default MUIDateInput;
