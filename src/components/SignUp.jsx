import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import spinner from "/spinner.svg";
import extractErrorMessage from "../utils/extractErrorMessage";
import { showTimedAlert } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = (data) => {
    setLoading(true);
    setError("");
    if (!data) {
      console.log("No data found");
    }
    authService
      .createUser(data)
      .then((response) => {
        if (response.statusCode == 200) {
          dispatch(
            showTimedAlert({
              message: "Signup successfully, please login to continue",
              type: "success",
             })
          );
          navigate("/login");
        }
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        dispatch(
          showTimedAlert({
            message: extractErrorMessage(error),
            type: "error",
            duration: 5000,
          })
        );
        setError(extractErrorMessage(error));
        setLoading(false);
      });

    // Your signup logic here
  };

  const [showModal, setShowModal] = useState(false);

  const handleGoogleSignIn = () => {
    setShowModal(true); // Open modal
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const selectGoogleAccount = (account) => {
    console.log(`Selected Google account: ${account}`);
    setShowModal(false); // Close mdal after selection
  };

  return (
    <div className="w-full min-h-96 flex flex-col items-center justify-center ">
      <div className=" flex flex-col bg-secondary shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-300 mb-6 text-center">
          Sign Up to VisionTube
        </h1>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        {/* Email Input */}
        <form onSubmit={handleSubmit(handleSignup)}>
          <Input
            label={"Full name :"}
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name is required",
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>
          )}
          <Input
            label={"Username :"}
            type="text"
            placeholder="Enter your full name"
            {...register("username", {
              required: "Username is required and should be unique",
              minLength: {
                value: 3,
                message: "Username should be at least 3 characters long",
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.username?.message}
            </p>
          )}

          <Input
            label={"Email :"}
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm ">{errors?.email?.message}</p>
          )}

          <Input
            label={"Password :"}
            type="password"
            placeholder="Enter your email"
            {...register("password", {
              required: "password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm ">{errors?.email?.message}</p>
          )}

          <Input
            label={"Profile Image :"}
            type="file"
            placeholder="Enter your full name"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
            {...register("avatar", {
              required: "Profile image is required",
            })}
          />
          {errors.avatar && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.avatar?.message}
            </p>
          )}
          <Input
            label={"Cover Image (Optional) :"}
            type="file"
            placeholder="Enter your full name"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
            {...register("coverImage", {
              required: false,
            })}
          />
          {errors.coverImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coverImage.message}
            </p>
          )}
          <div className="w-full  mt-6 ">
            {
              <Button
                type="submit"
                className="mx-auto w-full flex justify-center"
              >
                {loading && <img src={spinner} alt="" className="w-6 mr-4 " />}
                Sign up
              </Button>
            }
          </div>
        </form>
        <p className="text-center my-4 text-gray-500">or</p>

        {/* Sign Up with Google */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center"
        >
          {" "}
          <GoogleIcon /> <span className="ml-2">Sign up with google</span>
        </Button>
      </div>

      {/* Google Account Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-secondary rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Choose a Google Account
            </h2>
            <ul className="space-y-4">
              <li
                className="p-3 border rounded-md shadow-sm hover:bg-primary cursor-pointer"
                onClick={() => selectGoogleAccount("user1@gmail.com")}
              >
                user1@gmail.com
              </li>
              <li
                className="p-3 border rounded-md shadow-sm hover:bg-primary cursor-pointer"
                onClick={() => selectGoogleAccount("user2@gmail.com")}
              >
                user2@gmail.com
              </li>
              <li
                className="p-3 border rounded-md shadow-sm hover:bg-primary hover:text-gray-100 cursor-pointer"
                onClick={() => selectGoogleAccount("user3@gmail.com")}
              >
                user3@gmail.com
              </li>
            </ul>
            <Button
              className=" mt-6 w-full"
              onClick={closeModal}
              color="primary"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
