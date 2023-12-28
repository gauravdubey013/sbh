import ForgetPasswordForm from "@/components/ForgetPasswordForm";
import FormLayout from "@/components/FormLayout";
import React from "react";

const ForgetPassword = () => {
  return (
    <div>
      {/* <LoginForm /> */}
      <FormLayout setForm={<ForgetPasswordForm />} />
    </div>
  );
};

export default ForgetPassword;
