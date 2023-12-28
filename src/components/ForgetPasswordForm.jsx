"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ForgetPasswordForm() {
  // Define state variables for form fields and validation errors
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("email: ", email);

    try {
      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 400) {
        setError("This e-mail doesn't exists");
      }
      if (res.status === 200) {
        setError("");
        router.push("/signIn");
      }
    } catch (error) {
      setError(error);
      console.log("Error", error);
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
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <span className="text-red-500">{error}</span>}
          </div>

          <button
            type="submit"
            className="allBtn w-[rem] h-[3rem] text-xl rounded-3xl"
          >
            Send E-mail
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
