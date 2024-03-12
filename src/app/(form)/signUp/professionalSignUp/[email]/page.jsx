"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormLayout from "@/components/FormLayout";
import TermsConditions from "@/components/TermsConditions";
import { tcPolicyProf } from "@/context/terms-conditions";
import { ImCancelCircle } from "react-icons/im";
import Image from "next/image";

const ProfessionalSignUp = ({ params }) => {
  const [tcClick, setTcClick] = useState(false);
  const router = useRouter();

  const email = decodeURIComponent(params.email);

  const [profileImg, setProfileImg] = useState(null);
  const [showProfileImg, setShowProfileImg] = useState(null);
  const [resume, setResume] = useState(null);

  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");

  const [service, setService] = useState("");
  const [upiId, setUpiId] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [skillLevel, setSkillLevel] = useState("0");
  const [sLOne, setSLOne] = useState("");
  const [sLTwo, setSLTwo] = useState("");
  const [workHistory, setWorkHistory] = useState("");

  const [disableBtn, setDisableBtn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    upiE: "",
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
  const upiPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;
  const handleUpi = (e) => {
    const input = e.target.value;
    setUpiId(input)
    if (input == "") {
      setErrors({ upiE: "" });
    } else if (!upiPattern.test(input)) {
      setErrors({ upiE: "Invaild UPI id, reference: sbh@icici" });
    } else {
      setErrors({ upiE: "" });
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
  const handleProFileImgChange = (e) => {
    const file = e.target.files?.[0]
    setProfileImg(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
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
    data.set("upiId", upiId);
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
    } else if (skillLevel == "") {
      setDisableBtn(false);
      setError("Provide your years of experience!");
    } else {
      try {
        setError("");
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
          setError("Something went wrong...");
          setDisableBtn(false);
        } else if (res.status === 200) {
          setDisableBtn(false);
          alert("Your Professional profile will be shown after being reviewed by an Admin.");
          setSuccess(true);
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
          <FormLayout page="form"
            setForm={
              <>
                <div className="w-full h-auto flex flex-col justify-between gap-2 px-5 rounded-xl ease-in-out duration-300">
                  <h2 className="w-full h-auto text-[40px] md:text-[45px] lg:text-[40px] text-[#53c28b] text-center ease-in-out duration-300">
                    Professional Register
                  </h2>
                  <form
                    action=""
                    method=""
                    onSubmit={handleSubmit}
                    className="w-full h-full flex flex-col gap-4"
                  >
                    <div className="w-full h-auto overflow-hidden flex flex-col gap-3 items-center justify-between border-[1px] hover:border-[#53c28b] text-xl hover:text-[#53c28b] rounded-3xl p-6 ease-in-out duration-200">
                      {/* </label> */}
                      Add Profile
                      <div className=" w-[80%] md:w-full h-auto flex items-center justify-center text-center py-3 md:py-0 md:px-10 z-10 bbg">
                        <input
                          type="file"
                          name="profileImg"
                          id="profileImgInput"
                          // required
                          onChange={handleProFileImgChange}
                          accept=".jpg, .jpeg, .png"
                          className="allFormInput scale-110 w-full h-full border-none cursor-pointer"
                        />
                      </div>
                      {(showProfileImg) && (
                        <>
                          <Image src={showProfileImg} alt="Profile" width={1000} height={1000} className="w-28 h-28 rounded-full shadow-2xl animate-fade-in-down z-0" />
                          <ImCancelCircle
                            size={30}
                            color="#fff"
                            onClick={() => {
                              setShowProfileImg(null);
                              document.getElementById('profileImgInput').value = null;
                            }}
                            className="cancelIcon animate-fade-in-down"
                          />
                        </>
                      )}
                    </div>
                    <div
                      className={`w-full h-auto ${errors.dobE ? "-mb-2" : "mb-0"
                        }`}
                    >
                      <div className="flex gap-2">
                        <select defaultValue="" onChange={(e) => setGender(e.target.value)}
                          name="gender"
                          required
                          className="w-full h-[52px] ddl"
                        >
                          <option value="" disabled hidden>
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
                      defaultValue=""
                      onChange={(e) => setService(e.target.value)}
                      required
                      className="w-full h-[52px] ddl"
                    >
                      <option value="" disabled hidden>
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
                    <div className="">
                      <input type="text" value={upiId} onChange={handleUpi} required placeholder='Enter UPI id' className='allFormInput h-[52px]' />
                      {errors.upiE && <span className="text-red-500 animate-slideDown">{errors.upiE}</span>}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="countryCode"
                        value="+91"
                        readOnly
                        className="w-[3rem] h-[52px] text-[#53c28b] text-xl rounded-sm bg-transparent border-b-[1px] border-b-[#53c28b] hover:shadow-md focus:shadow-md outline-none"
                      />
                      <div
                        className={`w-full h-auto ${condition.phoneC || errors.phoneE ? "-mb-2" : "mb-0"
                          }`}
                      >
                        <input
                          type="text"
                          name="phone"
                          maxLength="10"
                          value={phone}
                          onChange={handlePhone}
                          placeholder="Phone Number"
                          required
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
                        setZipCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
                      }
                      placeholder="ZIP/Postal Code"
                      required
                      className="allFormInput h-[52px]"
                    />

                    <label className="text-base md:text-xl">
                      Years of Experience - <span className="text-[#53c28b] scale-110">{skillLevel}</span>
                    </label>
                    <input
                      type="range"
                      name="skillLevel"
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(e.target.value || 0)}
                      step="1"
                      min="0"
                      max="10"
                      required
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
                    <label className="text-base md:text-xl">
                      Add your resume
                    </label>
                    <div className="w-full h-auto flex">
                      <input
                        type="file"
                        id="resumeInput"
                        name="resume"
                        onChange={(e) => setResume(e.target.files?.[0])}
                        accept=".pdf, .doc, .docx, .ppt"
                        className="allFormInput h-[52px]"
                      />
                      {(resume) && (
                        <ImCancelCircle
                          size={30}
                          color="#fff"
                          onClick={() => { document.getElementById('resumeInput').value = null; setResume(null) }}
                          className="cancelIcon"
                        />
                      )}
                    </div>
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
                        success ? "Registered" :
                          <span className="animate-pulse">Registering...</span>
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
            className="cancelIcon"
          />
        </div>
      </div>
    </>
  );
};

export default ProfessionalSignUp;
