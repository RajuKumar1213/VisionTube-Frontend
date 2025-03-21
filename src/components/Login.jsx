import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";
import authService from "../services/auth.service";
import { login } from "../redux/features/authSlice";
import spinner from "/spinner.svg";
import extractErrorMessage from "../utils/extractErrorMessage";
import { showTimedAlert } from "../redux/features/alertSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePasswordReset = (data) => {
    setError("");
    if (!data) {
      console.log("No data found");
    }
    const { confirmPassword, ...payload } = data;

    if (confirmPassword !== payload.password) {
      setError("Passwords do not match");
      return;
    }

    authService
      .forgetPassword(payload)
      .then(() => {
        setError("");
        setIsModalOpen(false);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleLogin = (data) => {
    setLoading(true);
    setError("");
    if (!data) {
      console.log("No data found");
    }
    authService
      .loginUser(data)
      .then((response) => {
        if (response.statusCode == 200) {
          const { accessToken, refreshToken, user } = response.data;

          // Temporarily store access token in localStorage
          localStorage.setItem("accessToken", accessToken); // This can be accessed in JavaScript for authentication

          // Securely store refresh token in HttpOnly cookie
          document.cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; path=/;`;

          dispatch(login(user));
          dispatch(
            showTimedAlert({ message: "Login successfully", type: "success" })
          );
          navigate("/");
          setLoading(false);
        }
      })
      .catch((error) => {
        dispatch(
          showTimedAlert({ message: extractErrorMessage(error), type: "error" })
        );
        setError(extractErrorMessage(error));
        // Extract the error message from the HTML string
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-secondary text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Email Input */}
          <div>
            <Input
              label="Email"
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
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <p
              onClick={handleModalToggle}
              className="cursor-pointer text-blue-500 text-xs mt-1"
            >
              Forget password
            </p>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full flex justify-center">
            {loading && <img src={spinner} alt="" className="w-6 mr-4 " />}
            Login
          </Button>
        </form>

        <form onSubmit={handleSubmit(handlePasswordReset)}>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

              {/* Modal Content */}
              <div className="bg-secondary text-white p-6 rounded-lg shadow-lg z-10 w-96">
                <h2 className="text-xl font-semibold text-gray-300 mb-4">
                  Reset Password
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Email */}
                <Input
                  label={"Email: "}
                  className="text-white"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
                <Input
                  label={"New password: "}
                  className="text-white"
                  placeholder="Enter new password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
                <Input
                  label={"Confirm new password: "}
                  className="text-white"
                  placeholder="Confirm new password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) => {
                      const { password } = getValues(); // Get the password value
                      return value === password || "Passwords do not match"; // Return error if passwords don't match
                    },
                  })}
                />

                {/* Display the error message for confirmPassword */}
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}

                <div className="flex justify-center">
                  <Button type="submit" className="mt-4">
                    Reset password
                  </Button>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleModalToggle}
                  className="absolute text-xl top-3 right-3 text-red-600 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Blur effect for the main page */}
          <div
            className={`fixed inset-0 ${
              isModalOpen ? "bg-black bg-opacity-50 backdrop-blur-md" : "hidden"
            }`}
          ></div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline transition duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
