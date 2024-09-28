/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, FieldValues } from "react-hook-form";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

type TRadioGroupInput = {
  label: string;
  name: string;
  control: Control<FieldValues, any>;
  options: { value: string; label: string }[]; // Array of options for the radio buttons
  defaultValue?: string;
  required?: boolean;
};

const RadioGroupInput = ({
  label,
  name,
  control,
  options,
  defaultValue,
  required,
}: TRadioGroupInput) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ""}
        rules={{
          required: required ? "This field is required" : false,
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <RadioGroup value={value} onChange={onChange}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  required={required}
                />
              ))}
            </RadioGroup>
          </>
        )}
      />
    </FormControl>
  );
};

export default RadioGroupInput;
