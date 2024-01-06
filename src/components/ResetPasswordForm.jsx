"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ResetPasswordForm(props) {
  // console.log(props.setParams);
  const router = useRouter();
  let tokenError = props.setErrorProps;
  let user = props.setUserProps;
  // let verifiedToken = props.setVerifiedToken;
  // let { setUserProps, setErrorProps, setVerifiedToken } = props;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");

  const [errors, setErrors] = useState({
    emailE: "",
    passwordE: "",
    confirmPasswordE: "",
  });
  const [condition, setCondition] = useState({ email: true, password: true });
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState("");

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handlePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.trim() === "") {
      setCondition({ password: true });
      setErrors({ passwordE: "" });
    } else {
      setCondition({ password: false });
      if (!/(?=.*[a-z])/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one lowercase letter.",
        });
        setDisableBtn(true);
      } else if (!/(?=.*[A-Z])/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one uppercase letter.",
        });
        setDisableBtn(true);
      } else if (!/(?=.*\d)/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one digit.",
        });
        setDisableBtn(true);
      } else if (!/(?=.*[@$!%*?&])/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one special character (@$!%*?&).",
        });
        setDisableBtn(true);
      } else if (inputValue.length < 8) {
        setErrors({
          passwordE: "Password must be at least 8 characters long.",
        });
        setDisableBtn(true);
      } else if (!passwordPattern.test(inputValue)) {
        setErrors({ passwordE: "Invalid password" });
        setDisableBtn(true);
      } else {
        setErrors({ passwordE: "" });
        setDisableBtn(false);
      }
    }
  };

  const handleConfirmPassword = (e) => {
    const cpswd = e.target.value;

    if (cpswd.trim() === "") {
      setErrors({ confirmPasswordE: "" });
    } else {
      if (cpswd !== password) {
        setErrors({ confirmPasswordE: "Mismatch password!" });
        setDisableBtn(true);
      } else {
        setErrors({ confirmPasswordE: "" });
        setDisableBtn(false);
      }
    }
    setConfirmPassword(cpswd);
  };

  useEffect(() => {
    if (tokenError.length > 0) {
      setDisableBtn(true);
    }
  });
  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("password: ", password, "\nConfimePasswrod: ", confirmPassword);

    if ((password.trim() && confirmPassword.trim()) === "") {
      setError("Please create the password");
    } else {
      setError("");
      try {
        setDisableBtn(true);
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.email,
            password,
          }),
        });

        if (res.status === 400) {
          setError("Something went wrong!");
          setDisableBtn(false);
        }
        if (res.status === 200) {
          setError("");
          setDisableBtn(true);
          router.push("/signIn");
        }
      } catch (error) {
        setError("Error: Something went wrong!");
        console.log("Error: ", error);
        setDisableBtn(false);
      }
    }
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="fontFam w-full h-full flex flex-col items-center justify-between gap-2 px-5 rounded-xl ease-in-out duration-300"
      >
        <div className="fontFam w-full h-auto text-[30px] md:text-[35px] lg:text-[50px] text-[#53c28b] text-center ease-in-out duration-300">
          Reset Password
        </div>

        <div className="w-full h-auto flex flex-col gap-4 overflow-hidden">
          <div
            className={`w-full h-auto ${
              condition.password || errors.passwordE ? "-mb-2" : "mb-0"
            }`}
          >
            <div className="flex">
              <input
                type={showPass}
                name="password"
                value={password}
                onChange={handlePassword}
                required
                placeholder="Enter Password"
                className="allFormInput h-[52px]"
              />
              <div className="w-auto h-auto border-[px] flex items-center justify-center gap-1 border-b-[1px] hover:border-[#53c28b] hover:text-[#53c28b] ease-in-out duration-200">
                {showPass === "text" ? (
                  <FaRegEyeSlash
                    size={20}
                    onClick={() => setShowPass("password")}
                    className="w-full h-full active:scale-75 text-[#53c28b]"
                  />
                ) : (
                  <FaRegEye
                    size={20}
                    onClick={() => setShowPass("text")}
                    className="w-full h-full active:scale-75"
                  />
                )}
              </div>
            </div>
            <div className="w-full h-auto overflow-hidden">
              <span
                className={`${
                  condition.password == true
                    ? "flex animate-slideDown"
                    : "hidden"
                }`}
              >
                Keep the strong password!, ex: StrongP@ssw0rd
              </span>
              {errors.passwordE && (
                <span className="text-red-500 animate-slideDown">
                  {errors.passwordE}
                </span>
              )}
            </div>
          </div>
          <div
            className={`w-full h-auto ${
              errors.confirmPasswordE ? "-mb-3" : "-mb-2"
            }`}
          >
            <div className="flex">
              <input
                type={showConfirmPass}
                name="confirmPassword"
                onChange={handleConfirmPassword}
                required
                placeholder="Confirm Password"
                className={`allFormInput h-[52px]`}
              />
              <div className="w-auto h-auto border-[px] flex items-center justify-center gap-1 border-b-[1px] hover:border-[#53c28b] hover:text-[#53c28b] ease-in-out duration-200">
                {showConfirmPass === "text" ? (
                  <FaRegEyeSlash
                    size={20}
                    onClick={() => setShowConfirmPass("password")}
                    className="w-full h-full active:scale-75 text-[#53c28b]"
                  />
                ) : (
                  <FaRegEye
                    size={20}
                    onClick={() => setShowConfirmPass("text")}
                    className="w-full h-full active:scale-75"
                  />
                )}
              </div>
            </div>
            <div className="w-full h-auto overflow-hidden">
              {errors.confirmPasswordE && (
                <span className="text-red-500 animate-slideDown">
                  {errors.confirmPasswordE}
                </span>
              )}
            </div>
          </div>

          {error && <span className="text-red-500 mb-1">{error}</span>}
          <button
            disabled={disableBtn}
            type="submit"
            className={`allBtn w-[rem] h-[3rem] text-xl rounded-3xl ${
              disableBtn
                ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                : ""
            }`}
          >
            Reset
          </button>
        </div>
        {tokenError && <span className="text-red-500">{tokenError}</span>}
        <div className="mb-2">Set it secretly!</div>
      </form>
    </>
  );
}
