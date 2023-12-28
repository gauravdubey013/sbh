import FormLayout from "@/components/FormLayout";
import ProfessionalRegistrationForm from "@/components/ProfessionalRegistrationForm";
import React from "react";

const professionalSignUp = () => {
  return (
    <div>
      <FormLayout setForm={<ProfessionalRegistrationForm />} />
    </div>
  );
};

export default professionalSignUp;
