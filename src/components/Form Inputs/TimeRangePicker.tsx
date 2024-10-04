import { Control, FieldValues, Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type TTimeRangePicker = {
  labelStart?: string;
  labelEnd?: string;
  placeholderStart?: string;
  placeholderEnd?: string;
  control: Control<FieldValues, unknown>;
  startName: string;
  endName: string;
  disable?: boolean;
  defaultValue?: string[];
  required?: boolean;
};

const TimeRangePicker = ({
  labelStart = "Start Time",
  labelEnd = "End Time",
  startName,
  endName,
  control,
  required,
  disable,
  defaultValue,
  placeholderStart = "Select start time",
  placeholderEnd = "Select end time",
}: TTimeRangePicker) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Start Time Picker */}
        <div className="flex gap-5 items-center">
          <div className="flex-1">
            <Controller
              name={startName}
              control={control}
              defaultValue={defaultValue ? defaultValue[0] : ""}
              render={({ field: { onChange, value, onBlur } }) => (
                <TimePicker
                  label={labelStart}
                  disabled={disable}
                  value={value ? dayjs(value) : null}
                  onChange={(newTime) => {
                    const formattedTime = newTime
                      ? newTime.format("HH:mm")
                      : "";
                    onChange(formattedTime);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      onBlur: onBlur,
                      placeholder: placeholderStart,
                      variant: "standard",
                      required: required,
                      disabled: disable,
                    },
                  }}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name={endName}
              control={control}
              defaultValue={defaultValue ? defaultValue[1] : ""}
              render={({ field: { onChange, value, onBlur } }) => (
                <TimePicker
                  label={labelEnd}
                  disabled={disable}
                  value={value ? dayjs(value) : null}
                  onChange={(newTime) => {
                    const formattedTime = newTime
                      ? newTime.format("HH:mm")
                      : "";
                    onChange(formattedTime);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      onBlur: onBlur,
                      placeholder: placeholderEnd,
                      variant: "standard",
                      required: required,
                      disabled: disable,
                    },
                  }}
                />
              )}
            />
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default TimeRangePicker;
