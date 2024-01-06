"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ForgetPasswordForm() {
  // Define state variables for form fields and validation emailError
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [condition, setCondition] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handelEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    if (inputValue.trim() === "") {
      setCondition(true);
      setEmailError("");
    } else {
      setCondition(false);
      if (!emailPattern.test(inputValue)) {
        setEmailError("Please provide valid email!");
      } else {
        setEmailError("");
      }
    }
    // setEmail((prevUser) => ({ ...prevUser, inputValue }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("email: ", email);
    if (!emailPattern.test(email)) {
      setCondition(false);
      setDisableBtn(false);
      setEmailError("Please provide valid email!");
    } else {
      try {
        setDisableBtn(true);
        const res = await fetch("/api/auth/forget-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
          }),
        });

        if (res.status === 400) {
          setDisableBtn(false);
          setError("This e-mail doesn't exists");
        }
        if (res.status === 200) {
          setDisableBtn(true);
          setError("");
          router.push("/signIn");
        }
      } catch (error) {
        setDisableBtn(false);
        setError(error);
        console.log("Error", error);
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
          Forget Password
        </div>

        <div className="w-full h-auto flex flex-col gap-4 overflow-hidden">
          <div className="h-16">
            <input
              type="email"
              placeholder="Enter E-mail"
              className={`allFormInput h-[52px]`}
              value={email}
              onChange={handelEmail}
            />
            <div className="w-full h-auto overflow-hidden">
              <span
                className={`${
                  condition == true ? "flex animate-slideDown" : "hidden"
                }`}
              >
                Please provide registered email, ex: abc@gmail.com
              </span>
              {emailError && (
                <span className="text-red-500 animate-slideDown">
                  {emailError}
                </span>
              )}
              {error && (
                <span className="text-red-500 animate-slideDown">{error}</span>
              )}
            </div>
          </div>
          <button
            disabled={disableBtn}
            type="submit"
            className={`allBtn w-[rem] h-[3rem] text-xl rounded-3xl mb-4 ${
              disableBtn
                ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                : ""
            }`}
          >
            {disableBtn ? (
              <span className="animate-pulse">Sending E-mail...</span>
            ) : (
              "Send E-mail"
            )}
          </button>
        </div>
        <div className="flex gap-1 justify-center mb-1">
          Remember Password?
          <Link
            className="cursor-pointer font-semibold hover:shadow-md focus:shadow-md hover:scale-105 active:scale-90 duration-300 ease-in-out"
            // text-[#fff]/80 hover:text-[#fff]
            href={"/signIn"}
          >
            <span className="underline underline-offset-2">Login</span>{" "}
            <span className="underline underline-offset-2">Here</span>
          </Link>
        </div>
      </form>
    </>
  );
}
