import FormLayout from "@/components/FormLayout";
import RegistrationForm from "@/components/RegistrationForm";
import React from "react";

const SignUp = () => {
  return (
    <div>
      {/* <RegistrationForm /> */}
      <FormLayout setForm={<RegistrationForm />} />
    </div>
  );
};

export default SignUp;
