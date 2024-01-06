"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import FormLayout from "@/components/FormLayout";
import TermsConditions from "@/components/TermsConditions";
import { ImCancelCircle } from "react-icons/im";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { tcPolicyUser } from "@/context/terms-conditions";

const SignUp = () => {
  const [tcClick, setTcClick] = useState(false);
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState("password");
  const [showConfirmPass, setShowConfirmPass] = useState("password");

  const [profChecked, setProfChecked] = useState(false);
  const [profCheckValue, setProfCheckValue] = useState("null");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    emailE: "",
    passwordE: "",
    confirmPasswordE: "",
  });
  const [condition, setCondition] = useState({ email: true, password: true });
  const [disableBtn, setDisableBtn] = useState(false);

  const handleFirstname = (e) => {
    let inputValue = e.target.value.replace(/[^a-z]/gi, "");
    // setFirstname((prev) => ({ ...prev, inputValue }));
    setFirstname(inputValue);
  };
  const handleLastname = (e) => {
    let inputValue = e.target.value.replace(/[^a-z]/gi, "");
    // setFirstname((prev) => ({ ...prev, inputValue }));
    setLastname(inputValue);
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleEmail = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    if (inputValue.trim() === "") {
      setCondition({ email: true });
      setErrors({ emailE: "" });
    } else {
      setCondition({ email: false });
      if (!emailPattern.test(inputValue)) {
        setErrors({ emailE: "Invalid email" });
      } else {
        setErrors({ emailE: "" });
      }
    }
    // setEmail((prevUser) => ({ ...prevUser, inputValue }));
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handlePassword = (e) => {
    const inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.trim() === "") {
      setCondition({ password: true });
      setErrors({ passwordE: "" });
    } else {
      setCondition({ password: false });
      setErrors({ passwordE: "" });

      if (!/(?=.*[a-z])/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one lowercase letter.",
        });
      } else if (!/(?=.*[A-Z])/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one uppercase letter.",
        });
      } else if (!/(?=.*\d)/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one digit.",
        });
      } else if (!/(?=.*[@$!%*?&])/.test(inputValue)) {
        setErrors({
          passwordE: "Include at least one special character (@$!%*?&).",
        });
      } else if (inputValue.length < 8) {
        setErrors({
          passwordE: "Password must be at least 8 characters long.",
        });
      } else if (!passwordPattern.test(inputValue)) {
        setErrors({ passwordE: "Invalid password" });
      } else {
        setErrors({ passwordE: "" });
      }
    }
  };

  const handleConfirmPassword = (e) => {
    const cpswd = e.target.value;

    if (cpswd.trim() === "") {
      setErrors({ confirmPasswordE: "" });
    } else {
      if (cpswd !== password) {
        setErrors({ confirmPasswordE: "Mismatch password!" });
      } else {
        setErrors({ confirmPasswordE: "" });
      }
    }
    setConfirmPassword(cpswd);
  };

  const handleProCheck = () => {
    setProfChecked(!profChecked);
    !profChecked
      ? setProfCheckValue("Professional")
      : setProfCheckValue("null");
    // console.log(profCheckValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "firstname: ",
      firstname,
      "\nlastname: ",
      lastname,
      "\nemail: ",
      email,
      "\npassword: ",
      password,
      "\nconfirmPassword: ",
      confirmPassword,
      "\nprofCheckValue: ",
      profCheckValue
    );

    if (!emailPattern.test(email)) {
      setErrors({
        emailE: "Please provide valid email!",
      });
    } else if (!passwordPattern.test(password)) {
      setErrors({ passwordE: "Please recreate the strong password!" });
    } else if (password != confirmPassword) {
      setErrors({ confirmPasswordE: "Mismatch password!" });
    } else {
      try {
        setDisableBtn(true);
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            password,
            profCheckValue,
          }),
        });

        if (res.status === 400) {
          setError("User already exists!");
          setDisableBtn(false);
        }
        if (res.status === 200) {
          setDisableBtn(true);
          setError("");
          profChecked
            ? router.push(`/signUp/professionalSignUp/${email}`)
            : router.push("/signIn");
        }
      } catch (error) {
        setDisableBtn(false);
        setError(error);
        console.log("Error", error);
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
                <div className="fontFam w-full h-auto flex flex-col justify-between gap-1 px-5 rounded-xl ease-in-out duration-300">
                  <div className="fontFam w-full h-auto text-[40px] md:text-[45px] lg:text-[60px] text-[#53c28b] text-center ease-in-out duration-300">
                    Register
                  </div>
                  <div className="w-full h-auto flex gap-4 justify-center items-center">
                    <button
                      onClick={() => signIn("github")}
                      className="w-[3rem] h-[3rem] active:scale-75 flex justify-center items-center hover:text-blue-400 text-2xl no-underline border-[1px] rounded-full hover:border-[#53c28b] ease-in-out duration-300 shadow-md"
                    >
                      <i className="fa fa-github hover:scale-110" />
                    </button>
                    <button
                      onClick={() => signIn("google")}
                      className="w-[3rem] h-[3rem] active:scale-75 flex justify-center items-center hover:text-red-500 text-2xl no-underline border-[1px] rounded-full hover:border-[#53c28b] ease-in-out duration-300 shadow-md"
                    >
                      <i className="fa fa-google-plus hover:scale-110" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-2xl">
                    <span className="w-5 h-[1px] bg-[#8b8d93]"></span>
                    <span className="text-[#8b8d93] font-semibold">OR</span>
                    <span className="w-5 h-[1px] bg-[#8b8d93]"></span>
                  </div>

                  <form
                    // action=""
                    // method="post"
                    onSubmit={handleSubmit}
                    className="w-full h-full flex flex-col gap-4"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={handleFirstname}
                        required
                        placeholder="Enter FirstName"
                        className="allFormInput h-[52px]"
                      />
                      <input
                        type="text"
                        name="lastname"
                        value={lastname}
                        onChange={handleLastname}
                        required
                        placeholder="Enter LastName"
                        className="allFormInput h-[52px]"
                      />
                    </div>
                    <div
                      className={`w-full h-auto ${
                        condition.email || errors.emailE ? "-mb-2" : "mb-0"
                      }`}
                    >
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                        required
                        placeholder="Enter E-mail"
                        className="allFormInput h-[52px]"
                      />
                      <div className="w-full h-auto overflow-hidden">
                        <span
                          className={`${
                            condition.email == true
                              ? "flex animate-slideDown"
                              : "hidden"
                          }`}
                        >
                          Must be valid, ex: abc@gmail.com
                        </span>
                        {errors.emailE && (
                          <span className="text-red-500 animate-slideDown">
                            {errors.emailE}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`w-full h-auto ${
                        condition.password || errors.passwordE
                          ? "-mb-2"
                          : "mb-0"
                      }`}
                    >
                      <div className="flex">
                        <input
                          type={showPass}
                          name="password"
                          value={password}
                          onChange={handlePassword}
                          required
                          placeholder="Enter Password"
                          className="allFormInput h-[52px]"
                        />
                        <div className="w-auto h-auto border-[px] flex items-center justify-center gap-1 border-b-[1px] hover:border-[#53c28b] hover:text-[#53c28b] ease-in-out duration-200">
                          {showPass === "text" ? (
                            <FaRegEyeSlash
                              size={20}
                              onClick={() => setShowPass("password")}
                              className="w-full h-full active:scale-75 text-[#53c28b]"
                            />
                          ) : (
                            <FaRegEye
                              size={20}
                              onClick={() => setShowPass("text")}
                              className="w-full h-full active:scale-75"
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-full h-auto overflow-hidden">
                        <span
                          className={`${
                            condition.password == true
                              ? "flex animate-slideDown"
                              : "hidden"
                          }`}
                        >
                          keep the strong password!, ex: StrongP@ssw0rd
                        </span>
                        {errors.passwordE && (
                          <span className="text-red-500 animate-slideDown">
                            {errors.passwordE}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`w-full h-auto ${
                        errors.confirmPasswordE ? "-mb-3" : "-mb-2"
                      }`}
                    >
                      <div className="flex">
                        <input
                          type={showConfirmPass}
                          name="confirmPassword"
                          onChange={handleConfirmPassword}
                          required
                          placeholder="Confirm Password"
                          className={`allFormInput h-[52px]`}
                        />
                        <div className="w-auto h-auto border-[px] flex items-center justify-center gap-1 border-b-[1px] hover:border-[#53c28b] hover:text-[#53c28b] ease-in-out duration-200">
                          {showConfirmPass === "text" ? (
                            <FaRegEyeSlash
                              size={20}
                              onClick={() => setShowConfirmPass("password")}
                              className="w-full h-full active:scale-75 text-[#53c28b]"
                            />
                          ) : (
                            <FaRegEye
                              size={20}
                              onClick={() => setShowConfirmPass("text")}
                              className="w-full h-full active:scale-75"
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-full h-auto overflow-hidden">
                        {errors.confirmPasswordE && (
                          <span className="text-red-500 animate-slideDown">
                            {errors.confirmPasswordE}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="professionalCheckbox"
                        // checked={profChecked}
                        onChange={handleProCheck}
                        className="w-4 h-4 leading-tight checked:bg-[#53c28b] bg-[#53c28b] rounded hover:ring-1 focus:ring-1 accent-[#53c28b]"
                      />{" "}
                      Would you like to be a professional?
                    </div>

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
                      className={`allBtn w-[rem] h-[3rem] text-xl rounded-3xl ${
                        disableBtn
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
                    <div className="flex gap-1 justify-center mb-2">
                      Already have account?{" "}
                      <Link
                        className="cursor-pointer font-semibold hover:shadow-md focus:shadow-md hover:scale-105 active:scale-90 duration-300 ease-in-out"
                        href={"/signIn"}
                      >
                        <span className="underline underline-offset-2">
                          Login
                        </span>{" "}
                        <span className="underline underline-offset-2">
                          Here
                        </span>
                      </Link>
                    </div>
                  </form>
                </div>
              </>
            }
          />
        </div>
        <div
          className={` ${
            !tcClick ? "hidden" : "flex animate-slideDown"
          } w-full h-full z-20 top-0 absolute flex-col gap-2 items-center justify-center ease-in-out duration-300`}
        >
          <TermsConditions
            setHead="Privacy Policy for SkillBeHired Users/Clients"
            setDes="Welcome to SkillBeHired! This Privacy Policy outlines how your
            personal information is collected, used, and protected when you use
            our website and related services."
            setData={tcPolicyUser}
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

export default SignUp;
