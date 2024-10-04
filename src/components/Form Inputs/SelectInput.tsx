/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, FieldValues } from "react-hook-form";
import { MenuItem, Select, InputLabel } from "@mui/material";

type TSelectInput = {
  label: string;
  name: string;
  control: Control<FieldValues, unknown>;
  options: { value: string | number | undefined; label: string }[];
  defaultValue?: string | number;
  disabled?: boolean;
  required?: boolean;
};

const SelectInput = ({
  label,
  name,
  control,
  options,
  defaultValue,
  required,
  disabled,
}: TSelectInput) => {
  return (
    <div>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field: { onChange, value } }) => (
          <>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              variant="standard"
              value={value || ""}
              fullWidth={true}
              onChange={onChange}
              disabled={disabled}
              label={label}
              required={required}
            >
              {!defaultValue && (
                <MenuItem disabled value="">
                  <em>Select {label}</em>
                </MenuItem>
              )}
              {options.map((option) => (
                <MenuItem key={option?.value as string} value={option?.value}>
                  {option?.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      />
    </div>
  );
};

export default SelectInput;
