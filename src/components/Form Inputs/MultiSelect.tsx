/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, FieldValues } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type TAutocompleteInput = {
  label: string;
  placeholder?: string;
  control: Control<FieldValues, any>;
  name: string;
  options: any[]; // Array of options to display
  getOptionLabel: (option: any) => string; // Function to get option label
  required?: boolean;
  defaultValue?: any[];
  disable?: boolean;
};

const MultiSelect = ({
  label,
  placeholder,
  control,
  name,
  options,
  getOptionLabel,
  disable,
  required = false,
  defaultValue = [],
}: TAutocompleteInput) => {
  //   const mappedOptions = options.map((op) => op?.value);
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || []}
        render={({ field: { onChange, value, onBlur } }) => {
          const availableOptions = options.filter(
            (option) => !value.includes(option)
          );
          return (
            <Autocomplete
              multiple
              options={availableOptions}
              getOptionLabel={getOptionLabel}
              value={value || []}
              onChange={(_, newValue) => {
                const uniqueValues = Array.from(new Set(newValue));
                onChange(uniqueValues); // Update the form value
              }}
              onBlur={onBlur}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant="standard"
                  placeholder={placeholder}
                  required={required}
                  disabled={disable}
                />
              )}
            />
          );
        }}
      />
    </div>
  );
};

export default MultiSelect;
