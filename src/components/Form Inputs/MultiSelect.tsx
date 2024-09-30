/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Control, FieldValues } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type TAutocompleteInput = {
  label: string;
  placeholder?: string;
  control: Control<FieldValues, any>;
  name: string;
  options: { title: string; value: string | number }[]; // Array of options to display
  getOptionLabel: (option: any) => string; // Function to get option label
  required?: boolean;
  valuesWithTitles?: boolean;
  defaultValue?: { title: string; value: string | number }[];
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
  required,
  valuesWithTitles,
  defaultValue,
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
              disabled={disable}
              value={value || []}
              onChange={(_, newValue) => {
                const uniqueValues = Array.from(new Set(newValue));
                if (!valuesWithTitles) {
                  const mainValues = uniqueValues?.map((data) => data?.value);
                  onChange(mainValues);
                } else {
                  onChange(uniqueValues);
                }
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
                  required={required && value?.length === 0}
                  placeholder={placeholder}
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
