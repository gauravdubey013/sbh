import FormLayout from "@/components/FormLayout";
import LoginForm from "@/components/LoginForm";
import React from "react";

const SignIn = () => {
  return (
    <div>
      {/* <LoginForm /> */}
      <FormLayout page="form" setForm={<LoginForm />} />
    </div>
  );
};

export default SignIn;
