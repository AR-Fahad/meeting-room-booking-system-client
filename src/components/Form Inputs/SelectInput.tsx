/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, FieldValues } from "react-hook-form";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

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
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field: { onChange, value } }) => (
          <>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-standard-label">
                {label}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value || ""}
                fullWidth={true}
                onChange={onChange}
                disabled={disabled}
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
            </FormControl>
          </>
        )}
      />
    </div>
  );
};

export default SelectInput;
