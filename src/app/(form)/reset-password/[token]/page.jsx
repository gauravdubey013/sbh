"use client";

import FormLayout from "@/components/FormLayout";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import React, { useEffect, useState } from "react";

const ResetPassword = ({ params }) => {
  // console.log(params.token);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: params.token,
          }),
        });

        if (res.status === 400) {
          setError("Token has expired or it is Invalid!");
          setVerified(true);
        }
        if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        setError("Try again later!");
        console.log("Error", error);
      }
    };
    verifyToken();
  }, [params.token]);
  return (
    <div>
      <FormLayout
        setVerified={!verified}
        setForm={
          <ResetPasswordForm
            setParams={params.token}
            setVerifiedToken={verified}
            setErrorProps={error}
            setUserProps={user}
          />
        }
      />
      {/* {error && <span className="text-red-500">{error}</span>} */}
    </div>
  );
};

export default ResetPassword;
