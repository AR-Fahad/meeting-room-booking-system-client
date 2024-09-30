/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

type TInput = {
  label?: string;
  placeholder?: string;
  type: "email" | "text" | "number";
  defaultValue?: string | number;
  control?: Control<FieldValues, any>;
  min?: number;
  max?: number;
  name: string;
  disable?: boolean;
  required?: boolean;
  integer?: boolean;
};

const TextInput = ({
  label,
  name,
  type,
  placeholder,
  required,
  control,
  disable,
  min,
  max,
  defaultValue,
  integer,
}: TInput) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field: { onChange, ...restFields } }) => (
          <TextField
            {...restFields}
            onChange={(e) => {
              const newValue = e?.target?.value;
              const numericValue = Number(newValue);
              if (type === "number") {
                if (
                  (!Number.isInteger(numericValue) && integer) ||
                  (max && max < numericValue) ||
                  (min && min > numericValue)
                ) {
                  onChange("");
                } else {
                  onChange(numericValue);
                }
              } else {
                onChange(newValue);
              }
            }}
            label={label}
            type={type}
            required={required}
            variant="standard"
            disabled={disable}
            placeholder={placeholder}
            style={{ width: "100%" }}
          />
        )}
      />
    </div>
  );
};

export default TextInput;
