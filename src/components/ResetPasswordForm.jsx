"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ResetPasswordForm(props) {
  // console.log(props.setParams);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  let tokenError = props.setErrorProps;
  let user = props.setUserProps;
  let {} = props;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("password: ", password, "\nConfimePasswrod: ", confirmPassword);

    if (password != confirmPassword) {
      setError("Password mismatch!");
    } else {
      setError("");

      try {
        const res = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.email,
            password,
          }),
        });

        if (res.status === 400) {
          setError("Something went wrong!");
        }
        if (res.status === 200) {
          setError("");
          router.push("/signIn");
        }
      } catch (error) {
        setError("Error: Something went wrong!");
        console.log("Error: ", error);
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
          <div className="h-16">
            <input
              type="text"
              placeholder="Enter Password"
              className={`allFormInput h-[52px]`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="h-auto">
            <input
              type="text"
              placeholder="Confirm Password"
              className={`allFormInput h-[52px]`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <span className="text-red-500">{error}</span>}
          </div>

          <button
            type="submit"
            disabled={tokenError.length > 0}
            className="allBtn w-[rem] h-[3rem] text-xl rounded-3xl"
          >
            Reset Password
          </button>
        </div>
        {tokenError && <span className="text-red-500">{tokenError}</span>}
        <div className="mb-2">Set it secretly!</div>
      </form>
    </>
  );
}
