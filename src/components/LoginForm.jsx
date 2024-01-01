"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

function LoginForm() {
  // Define state variables for form fields and validation errors
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "email: ",
      email,
      "\npassword: ",
      password,
      "\nconfirmPassword: "
    );

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      setError("Invalid email & password");
      if (res?.url) router.replace("/");
      else {
        setError("");
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newErrors = {};

  //   if (!email.trim()) {
  //     newErrors.email = "E-mail is required";
  //   }

  //   if (!password.trim()) {
  //     newErrors.password = "Password is required";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //   } else {
  //     console.log(
  //       "Form submitted with email:",
  //       email,
  //       "and password:",
  //       password
  //     );
  //   }
  // };
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        className="fontFam w-full h-full flex flex-col justify-between gap-2 px-5 rounded-xl ease-in-out duration-300"
      >
        <div className="fontFam w-full h-auto mb-16 sm:mb-0 text-[40px] md:text-[45px] lg:text-[60px] text-[#53c28b] text-center ease-in-out duration-300">
          Login
        </div>

        {/* <div className="w-full h-auto"> */}
        <div className="w-full h-auto flex gap-4 justify-center items-center">
          <button
            onClick={() => signIn("github")}
            className="w-[3rem] h-[3rem] active:scale-75 flex justify-center items-center hover:text-blue-400 text-2xl no-underline border-[1px] rounded-full hover:border-[#53c28b] ease-in-out duration-300 shadow-md"
          >
            <i className="fa fa-github hover:scale-110" />
          </button>
          <button
            onClick={() => signIn("google")}
            className="w-[3rem] h-[3rem] active:scale-75 flex justify-center items-center hover:text-red-500 text-2xl no-underline border-[1px] rounded-full hover:border-[#53c28b] ease-in-out duration-300 shadow-md"
          >
            <i className="fa fa-google-plus hover:scale-110" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 text-2xl">
          <span className="w-5 h-[1px] bg-[#8b8d93]"></span>
          <span className="text-[#8b8d93] font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-[#8b8d93]"></span>
        </div>

        <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
          <div className="h-16">
            <input
              type="email"
              placeholder="Enter E-mail"
              className={`allFormInput h-[52px]`}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {/* {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )} */}
          </div>
          <div className="h-16">
            <input
              type="text"
              placeholder="Enter Password"
              className={`allFormInput h-[52px] `}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* ${
                    errors.email
                      ? "border-red-500 placeholder:text-red-500"
                      : ""
                  }
                  ${
                    errors.password && "border-red-500 placeholder:text-red-500"
                  } */}
            {/* {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )} */}
          </div>
          <button
            type="submit"
            className="allBtn w-[rem] h-[3rem] text-xl rounded-3xl"
          >
            Login
          </button>
          <Link
            className="hover:text-[#53c28b] text-sm no-underline flex justify-end active:scale-90 duration-300 ease-in-out"
            href="/forget-password"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="flex gap-1 justify-center mb-1">
          New User?
          <Link
            className="cursor-pointer font-semibold hover:shadow-md focus:shadow-md hover:scale-105 active:scale-90 duration-300 ease-in-out"
            // text-[#fff]/80 hover:text-[#fff]
            href={"/signUp"}
          >
            <span className="underline underline-offset-2">Register</span>{" "}
            <span className="underline underline-offset-2">Now</span>
          </Link>
        </div>
        {/* </div> */}
      </form>
    </>
  );
}

export default LoginForm;
