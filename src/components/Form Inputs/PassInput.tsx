/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

type TPass = {
  name: string;
  placeholder: string;
  control?: Control<FieldValues, any>;
  label: string;
  disable?: boolean;
  forget?: boolean;
};

const PassInput = ({
  name,
  label,
  placeholder,
  forget,
  disable,
  control,
}: TPass) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <Controller
        name={name}
        defaultValue=""
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type={showPassword ? "text" : "password"}
            label={label}
            style={{ width: "100%" }}
            placeholder={placeholder}
            variant="standard"
            disabled={disable}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      {forget && (
        <a className="hover:text-[#5059d6] text-sm mt-1" href="">
          Forgot password?
        </a>
      )}
    </div>
  );
};

export default PassInput;
