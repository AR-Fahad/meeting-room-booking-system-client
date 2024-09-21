/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { Control, Controller, FieldValues } from "react-hook-form";

type TInput = {
  label?: string;
  placeholder?: string;
  type: "email" | "text";
  defaultValue?: string | number;
  control?: Control<FieldValues, any>;
  name: string;
  required?: boolean;
};

const TextInput = ({
  label,
  name,
  type,
  placeholder,
  required,
  control,
  defaultValue,
}: TInput) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            required={required}
            variant="standard"
            placeholder={placeholder}
            style={{ width: "100%" }}
          />
        )}
      />
    </div>
  );
};

export default TextInput;
