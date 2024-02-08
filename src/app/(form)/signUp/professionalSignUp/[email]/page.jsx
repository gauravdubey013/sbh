"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormLayout from "@/components/FormLayout";
import TermsConditions from "@/components/TermsConditions";
import { ImCancelCircle } from "react-icons/im";
import { tcPolicyProf } from "@/context/terms-conditions";

const professionalSignUp = ({ params }) => {
  const [tcClick, setTcClick] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const router = useRouter();

  const email = decodeURIComponent(params.email);

  const [profileImg, setProfileImg] = useState();
  const [resume, setResume] = useState();

  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");

  const [service, setService] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [sLOne, setSLOne] = useState("");
  const [sLTwo, setSLTwo] = useState("");
  const [workHistory, setWorkHistory] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    phoneE: "",
    dobE: "",
    sLOneE: "",
    sLTwoE: "",
  });
  const [condition, setCondition] = useState({
    phoneC: true,
  });

  var age;
  const handleDOB = (e) => {
    const inputValue = e.target.value;
    setDOB(inputValue);
    var today = new Date();
    var birthDate = new Date(inputValue);
    age = today.getFullYear() - birthDate.getFullYear();

    if (age <= 17) {
      setCondition({ emailC: false });
      setErrors({
        dobE: `${age} - Must be at least 18 years older to be registered`,
      });
    } else {
      setErrors({ dobE: "" });
    }
  };
  const handlePhone = (e) => {
    let inputValue = e.target.value.replace(/[^\d]/g, "").slice(0, 10);
    setPhone(inputValue);
    if (inputValue.trim() === "") {
      setCondition({ phoneC: true });
      setErrors({ phoneE: "" });
    } else {
      setCondition({ phoneC: false });
      if (inputValue.length < 10) {
        setErrors({ phoneE: "Number must be 10 digits and valid" });
      } else {
        setErrors({ phoneE: "" });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    data.set("email", email);
    data.set("profileImg", profileImg);
    data.set("resume", resume);
    data.set("gender", gender);
    data.set("dob", dob);
    data.set("service", service);
    data.set("address", address);
    data.set("zipCode", zipCode);
    data.set("phone", phone);
    data.set("bio", bio);
    data.set("skillLevel", skillLevel);
    data.set("sLOne", sLOne);
    data.set("sLTwo", sLTwo);
    data.set("workHistory", workHistory);

    if (age <= 17) {
      setErrors({
        dobE: `${age} - Must be at least 18 years older to be registered`,
      });
    } else if (phone.length < 10 || phone.length > 10) {
      setDisableBtn(false);
      setErrors({ phoneE: "Number must be 10 digits and valid" });
    } else {
      try {
        setDisableBtn(true);
        const res = await fetch("/api/auth/professional-register", {
          method: "POST",
          body: data,
        });

        if (res.status === 400) {
          setError("Register first!");
          setDisableBtn(true);
          router.push("/signUp");
        } else if (res.status === 401) {
          setError("User already exists!");
          setDisableBtn(false);
        } else if (res.status === 500) {
          setError("Img & resume file aren't supported!");
          setDisableBtn(false);
        } else if (res.status === 200) {
          setDisableBtn(true);
          setError("");
          router.push("/signIn");
        }
      } catch (error) {
        setDisableBtn(false);
        setError(error);
        console.error("Error", error);
      }
    }
  };

  return (
    <>
      <div className="w-full h-full relative">
        <div className="w-full h-full z-10">
          <FormLayout
            setForm={
              <>
                <div className="fontFam w-full h-auto flex flex-col justify-between gap-2 px-5 rounded-xl ease-in-out duration-300">
                  <div className="fontFam w-full h-auto text-[40px] md:text-[45px] lg:text-[40px] text-[#53c28b] text-center ease-in-out duration-300">
                    Professional Register
                  </div>
                  <form
                    action=""
                    method=""
                    onSubmit={handleSubmit}
                    className="w-full h-full flex flex-col gap-4"
                  >
                    <div className="w-full h-[20vh] overflow-hidden flex flex-col gap-3 items-center justify-between border-[1px] hover:border-[#53c28b] text-xl text-[#959ba7] hover:text-[#53c28b] rounded-3xl p-6 ease-in-out duration-200">
                      {/* </label> */}
                      Add Profile
                      <div className=" w-[80%] md:w-full h-[70%] flex items-center justify-center text-center py-3 md:py-0 md:px-10">
                        <input
                          type="file"
                          name="profileImg"
                          required
                          onChange={(e) => setProfileImg(e.target.files?.[0])}
                          accept=".jpg, .jpeg, .png"
                          className="allFormInput scale-110 w-full h-full border-none cursor-pointer"
                        />
                      </div>
                    </div>
                    <div
                      className={`w-full h-auto ${errors.dobE ? "-mb-2" : "mb-0"
                        }`}
                    >
                      <div className="flex gap-2">
                        <select
                          name="gender"
                          onChange={(e) => setGender(e.target.value)}
                          required
                          className="w-full h-[52px] ddl"
                        >
                          <option
                            value=""
                            disabled
                            selected
                            hidden
                            className=""
                          >
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">other?</option>
                        </select>

                        <input
                          type="date"
                          name="dob"
                          onChange={handleDOB}
                          required
                          placeholder="DOB"
                          className="allFormInput h-[52px]"
                        />
                      </div>
                      <div className="w-full h-auto overflow-hidden">
                        <span
                          className={`${errors.dobE
                            ? "flex text-red-500 animate-slideDown"
                            : "hidden"
                            }`}
                        >
                          {errors.dobE}
                        </span>
                      </div>
                    </div>
                    <select
                      name="service"
                      onChange={(e) => setService(e.target.value)}
                      placeholder="Freelancer Category"
                      required
                      className="w-full h-[52px] ddl"
                    >
                      <option value="" disabled selected hidden>
                        Select Service
                      </option>
                      <option value="web_development">Web Development</option>
                      <option value="graphic_design">Graphic Design</option>
                      <option value="writing">Writing</option>
                      <option value="personal_trainer">Personal Trainer</option>
                      <option value="nutritionist">Nutritionist</option>
                      <option value="yoga_instructor">Yoga Instructor</option>
                      <option value="health_coach">Health Coach</option>
                      <option value="mental_health_counselor">Mental Health Counselor</option>
                      <option value="event_planner">Event Planner</option>
                      <option value="dj_musician">DJ / Musician</option>
                      <option value="photographer_videographer">Photographer / Videographer</option>
                      <option value="party_entertainer">Party Entertainer</option>
                      <option value="wedding_planner">Wedding Planner</option>
                      <option value="gardener">Gardener</option>
                      <option value="interior_decorator">Interior Decorator</option>
                      <option value="painters">Painters</option>
                      <option value="electrician">Electrician</option>
                      <option value="house_cleaner">House Cleaner</option>
                      <option value="plumber">Plumber</option>
                      <option value="house_helper">House Helper</option>
                    </select>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="countryCode"
                        value="+91"
                        readOnly
                        className="w-[3rem] h-[52px] fontFam text-[#53c28b] text-xl rounded-sm bg-transparent border-b-[1px] border-b-[#53c28b] hover:shadow-md focus:shadow-md outline-none"
                      />
                      <div
                        className={`w-full h-auto ${condition.phoneC || errors.phoneE ? "-mb-2" : "mb-0"
                          }`}
                      >
                        <input
                          type="text"
                          name="phone"
                          maxlength="10"
                          value={phone}
                          onChange={handlePhone}
                          placeholder="Phone Number"
                          className="allFormInput h-[52px]"
                        />
                        <div className="w-full h-auto overflow-hidden">
                          <span
                            className={`${condition.phoneC == true
                              ? "flex animate-slideDown"
                              : "hidden"
                              }`}
                          >
                            Number must be 10 digits
                          </span>
                          <span
                            className={`${errors.phoneE
                              ? "flex text-red-500 animate-slideDown"
                              : "hidden"
                              }`}
                          >
                            {errors.phoneE}
                          </span>
                        </div>
                      </div>
                    </div>
                    <textarea
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                      rows={3}
                      required
                      className="allFormInput h-auto"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      value={zipCode}
                      onChange={(e) =>
                        setZipCode(e.target.value.replace(/[^\d]/g, ""))
                      }
                      placeholder="ZIP/Postal Code"
                      required
                      className="allFormInput h-[52px]"
                    />

                    <label className="text-base md:text-xl text-[#959ba7]">
                      Years of Experience -{" "}
                      <span className="text-[#53c28b] scale-110">
                        {skillLevel}
                      </span>
                    </label>
                    <input
                      type="range"
                      name="skillLevel"
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value ?? "0")}
                      step="1"
                      min="0"
                      max="5"
                      className="accent-[#53c28b]"
                    />
                    <textarea
                      name="workHistory"
                      onChange={(e) => setWorkHistory(e.target.value)}
                      placeholder="Write about your work history"
                      rows={3}
                      required
                      className="allFormInput h-auto"
                    ></textarea>
                    <textarea
                      name="bio"
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Bio / Introduction"
                      rows={3}
                      className="allFormInput h-auto"
                    ></textarea>
                    <label className="text-base md:text-xl text-[#959ba7]">
                      Add your resume
                    </label>
                    <input
                      type="file"
                      name="resume"
                      onChange={(e) => setResume(e.target.files?.[0])}
                      accept=".pdf, .doc, .docx, .ppt"
                      className="allFormInput h-[52px]"
                    />
                    <input
                      type="url"
                      name="sLOne"
                      onChange={(e) => setSLOne(e.target.value)}
                      placeholder="Social Link 1"
                      className="allFormInput h-[52px]"
                    />
                    <input
                      type="url"
                      name="sLTwo"
                      onChange={(e) => setSLTwo(e.target.value)}
                      placeholder="Social Link 2"
                      className="allFormInput h-[52px]"
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="termsAgree"
                        required
                        className="w-4 h-4 leading-tight bg-[#53c28b] rounded hover:ring-1 focus:ring-1 accent-[#53c28b]"
                      />
                      <span className="flex flex-row gap-1">
                        I agree to the
                        <span
                          className="hover:text-[#53c28b] hover:animate-pulse hover:no-underline underline cursor-pointer active:scale-90 ease-in-out duration-300"
                          onClick={() => setTcClick(!tcClick)}
                        >
                          Terms&Conditions!
                        </span>
                      </span>
                    </div>
                    {error && <span className="text-red-500">{error}</span>}
                    <button
                      disabled={disableBtn}
                      type="submit"
                      className={`allBtn w-[rem] h-[3rem] text-xl rounded-3xl mb-4 ${disableBtn
                        ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
                        : ""
                        }`}
                    >
                      {disableBtn ? (
                        <span className="animate-pulse">Registing...</span>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </form>
                </div>
              </>
            }
          />
        </div>
        <div
          className={` ${!tcClick ? "hidden" : "flex animate-slideDown"
            } w-full h-full z-20 top-0 absolute flex-col gap-2 items-center justify-center ease-in-out duration-300`}
        >
          <TermsConditions
            setHead="Privacy Policy for SkillBeHired Professionals/Freelancers"
            setDes="Welcome to SkillBeHired! This Privacy Policy outlines how your personal information is collected, used, and protected when you use our website and related services as a freelancer."
            setData={tcPolicyProf}
          />
          <ImCancelCircle
            size={30}
            color="#fff"
            onClick={() => setTcClick(!tcClick)}
            className="active:scale-75 animate-pulse hover:animate-none hover:fill-[#53c28b] duration-200 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default professionalSignUp;
