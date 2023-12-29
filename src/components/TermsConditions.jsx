import { tcpolicy } from "@/context/terms_conditions";
import React from "react";

const TermsConditions = () => {
  return (
    <>
      <div className="bdbg w-[90%] h-[90%] border-[1px] border-[#53c28b] shadow-2xl rounded-xl py-4 overflow-hidden">
        <div className="scrollDi overflow-y-scroll scroll-snap-type-x-mandatory w-full h-full p-2 md:px-4">
          <h2 className="text-center font-extrabold text-3xl text-[#53c28b] underline underline-offset-4 mb-4">
            Privacy Policy for SkillBeHired Users/Clients
          </h2>
          <span className="font-semibold text-xl">
            Welcome to SkillBeHired! This Privacy Policy outlines how your
            personal information is collected, used, and protected when you use
            our website and related services.
          </span>

          {/* wrap1 */}
          <div className="flex flex-col gap-1">
            {tcpolicy.map((tc) => (
              <div key={tc.id} className="w-full h-auto p-1 md:px-4">
                <div className="flex gap-1 text-lg">
                  <b>{tc.id}.</b>
                  <h4 className="font-semibold text-[#53c28b]">
                    <u>{tc.header}</u> :
                  </h4>
                </div>
                {/* wrap2 */}
                <div className="w-full h-auto p-1 md:px-4 flex flex-col gap-1">
                  {tc.description.map((des) => (
                    <div
                      key={des.count}
                      className="flex justify-start gap-1 text-md"
                    >
                      <b>{des.count}.</b>
                      <h6 className="font-semibold">{des.label} :</h6>
                      <p className="text-start"> {des.info}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
