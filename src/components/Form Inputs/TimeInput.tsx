import { Control, FieldValues, Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type TTimePickerInput = {
  label?: string;
  placeholder?: string;
  control: Control<FieldValues, unknown>;
  name: string;
  disable?: boolean;
  required?: boolean;
};

const TimeInput = ({
  label,
  name,
  control,
  required,
  disable,
  placeholder,
}: TTimePickerInput) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue="" // Default value
          render={({ field: { onChange, value, onBlur } }) => (
            <TimePicker
              label={label}
              value={value ? dayjs(value) : null} // Convert string to Dayjs object
              onChange={(newTime) => {
                const formattedTime = newTime ? newTime.format("HH:mm") : "";
                onChange(formattedTime); // Update react-hook-form state
              }}
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
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
};

export default TimeInput;
