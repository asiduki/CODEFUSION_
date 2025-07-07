import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import styles from "./Register.module.css";  // Importing the new CSS module

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const username = watch("username");
  const password = watch("password");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:5000/user/register`,
        data
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error while sending data", error);
      if (error.response && error.response.status === 409) {
        setUsernameError("Username already exists");
      }
    }
  };

  useEffect(() => {
    if (username) {
      setUsernameError("");
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "Username is required",
                validate: {
                  lowercase: (value) =>
                    /^[a-z0-9]+$/.test(value) ||
                    "Username must be lowercase without spaces and special characters",
                },
              })}
              className={styles.input}
              placeholder="Username"
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
            {usernameError && (
              <p className={styles.error}>{usernameError}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={styles.input}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleButton}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={styles.input}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.toggleButton}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={`${styles.button} ${isSubmitting ? "bg-gray-600" : "bg-black"}`}
            >
              {isSubmitting ? "Loading" : "Submit"}
            </button>
          </div>
        </form>
        <p className={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
