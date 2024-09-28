import Heading from "@/components/heading/Heading";
import logo from "../../assets/images/MBooking.png";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "@/components/Form Inputs/TextInput";
import PassInput from "@/components/Form Inputs/PassInput";
import PriButton from "@/components/buttons/PriButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { logout } from "@/redux/features/auth/authSlice";

const Register = () => {
  const [disabled, setDisabled] = useState(false);
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, register: reg } = useForm();
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      const loggedUser = verifyToken(token);
      if (!loggedUser) {
        dispatch(logout());
      } else {
        navigate("/");
      }
    }
  }, [token, navigate, dispatch]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisabled(true);
    const toastId = toast.loading("Registering an account");
    try {
      const { confirmPassword, ...mainData } = data;

      if (confirmPassword !== mainData.password) {
        throw new Error("Password and confirmation password both must match");
      }

      await register(mainData).unwrap();

      toast.success("Account registered successfully", { id: toastId });
      setDisabled(false);
      reset();
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(
        err?.data?.errorMessages[0]?.message ||
          err?.message ||
          "Something went wrong",
        {
          id: toastId,
        }
      );
      setDisabled(false);
    }
  };
  return (
    <div className="my-10">
      <Link to="/">
        <div className="h-16 w-28 mx-auto">
          <img src={logo} alt="" />
        </div>
      </Link>
      <div className="mt-10 p-5 border shadow-lg w-[90%] md:[75%] lg:w-[50%] mx-auto space-y-5 rounded-sm">
        <Heading text="Register an account" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextInput
            type="text"
            name="name"
            control={control}
            placeholder="Enter your name"
            label="Name"
            required
          />
          <TextInput
            type="email"
            name="email"
            control={control}
            placeholder="Enter your email"
            label="Email"
            required
          />
          <TextInput
            type="text"
            name="phone"
            control={control}
            placeholder="Enter your phone number"
            label="Phone"
            required
          />
          <TextInput
            type="text"
            name="address"
            control={control}
            placeholder="Enter your address"
            label="Address"
            required
          />

          <PassInput
            name="password"
            control={control}
            label="Password"
            placeholder="Enter the password"
          />
          <PassInput
            name="confirmPassword"
            label="Confirm Password"
            control={control}
            placeholder="Renter the password"
          />
          <div className="flex items-center gap-1">
            <input type="checkbox" id="terms" {...reg("terms")} required />
            <label htmlFor="terms">
              Accept our{" "}
              <span className="text-[#5059d6]">Terms & Condition</span>
            </label>
          </div>
          <PriButton w disabled={disabled} makeLoading={disabled}>
            {" "}
            {disabled ? "Registering..." : "Register"}
          </PriButton>
        </form>
        <p className="text-black text-opacity-70">
          Already have an account?{" "}
          <Link
            className="text-black font-medium hover:text-[#5059d6]"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
