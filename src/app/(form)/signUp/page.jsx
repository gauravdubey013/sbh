"use client";

import FormLayout from "@/components/FormLayout";
import RegistrationForm from "@/components/RegistrationForm";
import TermsConditions from "@/components/TermsConditions";
import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

const SignUp = () => {
  const [tcClick, setTcClick] = useState(true);
  return (
    <>
      <div className="w-full h-full relative">
        <div className="w-full h-full z-10">
          {/* <RegistrationForm /> */}
          <FormLayout
            setForm={
              <RegistrationForm
                tcClickProps={tcClick}
                // setTcClickProps={setTcClick()}
              />
            }
          />
        </div>
        <div
          className={` ${
            !tcClick ? "hidden" : "flex animate-slideDown"
          } w-full h-full z-20 top-0 absolute flex-col gap-2 items-center justify-center ease-in-out duration-300`}
        >
          <TermsConditions />
          <ImCancelCircle
            size={30}
            color="#53c28b"
            onClick={() => setTcClick(!tcClick)}
            className="active:scale-75 duration-200"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
