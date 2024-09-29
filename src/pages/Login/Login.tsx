import PassInput from "@/components/Form Inputs/PassInput";
import TextInput from "@/components/Form Inputs/TextInput";
import Heading from "@/components/heading/Heading";
import logo from "../../assets/images/MBooking.png";
import PriButton from "@/components/buttons/PriButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, setUser } from "@/redux/features/auth/authSlice";
import { useEffect, useState } from "react";

const Login = () => {
  const { token } = useAppSelector((state) => state?.auth);
  const [disabled, setDisabled] = useState(false);
  const { reset, handleSubmit, control } = useForm();
  const [login] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      const loggedUser = verifyToken(token);
      if (!loggedUser) {
        dispatch(logout());
      } else {
        navigate(from);
      }
    }
  }, [token, navigate, dispatch, from]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setDisabled(true);
    const toastId = toast.loading("Logging in");
    try {
      const res: { token: string } = await login(data).unwrap();
      const user = verifyToken(res?.token);
      dispatch(setUser({ user, token: res?.token }));
      toast.success("Logged in", { id: toastId });
      setDisabled(false);
      reset();
      navigate(from);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // console.log(err);
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
      <div className="mt-10 p-5 border shadow-lg w-[90%] md:[70%] lg:w-[50%] mx-auto space-y-5 rounded-sm">
        <Heading text="Login to your account" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextInput
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
            label="Email"
            required
          />

          <PassInput
            name="password"
            label="Password"
            control={control}
            placeholder="Enter your password"
            forget
          />
          <PriButton disabled={disabled} className="w-full">
            Login
          </PriButton>
        </form>
        <p className="text-black text-opacity-70">
          Don't have an account?{" "}
          <Link
            className="font-medium text-black hover:text-[#5059d6]"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
