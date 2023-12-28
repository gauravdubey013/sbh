import FormLayout from "@/components/FormLayout";
import LoginForm from "@/components/LoginForm";
import React from "react";

const SignIn = () => {
  return (
    <div>
      {/* <LoginForm /> */}
      <FormLayout setForm={<LoginForm />} />
    </div>
  );
};

export default SignIn;
