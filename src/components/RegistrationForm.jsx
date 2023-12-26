// const firstname = e.target[0].value;
//     const lastname = e.target[1].value;
//     const email = e.target[2].value;
//     const password = e.target[3].value;
//     const confirmpassword = e.target[4].value;

"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RegistrationForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profChecked, setProfChecked] = useState(false);
  const [profCheckValue, setProfCheckValue] = useState("null");

  const [error, setError] = useState("");

  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus == "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleProCheck = () => {
    setProfChecked(!profChecked);
    !profChecked
      ? setProfCheckValue("Professional")
      : setProfCheckValue("null");
    // console.log(profCheckValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(
    //   "firstname: ",
    //   firstname,
    //   "\nlastname: ",
    //   lastname,
    //   "\nemail: ",
    //   email,
    //   "\npassword: ",
    //   password,
    //   "\nconfirmPassword: ",
    //   confirmPassword,
    //   "\nprofCheckValue: ",
    //   profCheckValue
    // );

    confirmPassword !== password
      ? setError("Mismatch password!")
      : setError("");

    // if (password == confirmPassword) {
    //   profChecked
    //     ? router.push("/signUp/professionalSignUp")
    //     : router.push("/signIn")
    // }

    try {
      const res = await fetch("/api/register", {
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
      }
      if (res.status === 200) {
        setError("");
        if (password == confirmPassword) {
          profChecked
            ? router.push("/signUp/professionalSignUp")
            : router.push("/signIn");
        }
      }
    } catch (error) {
      setError(error);
      console.log("Error", error);
    }
  };
  if (sessionStatus === "loadomg") {
    return <Loading />;
  }

  return (
    sessionStatus !== "authenticated" && (
      <>
        <div className="w-full h-[80vh] md:h-[77vh] flex justify-center items-center animate-fade-in-down">
          <div className="w-[95%] md:w-[85%] xl:w-[75%] h-[90%] border-[1px] border-solid border-[#53c28b]/90 rounded-2xl shadow-lg flex flex-rol ease-in-out duration-300">
            <div className="w-[50%] h-full hidden sm:flex justify-center items-cent rounded-xl ease-in-out duration-300">
              <Image
                src="/assets/authImg.png"
                alt="authImg"
                width={400}
                height={400}
                className="contactImg w-auto h-auto object-contain animate-[moveCon_2s_infinite_ease_alternate]"
              />
            </div>
            <div className="scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory w-full sm:w-[50%] h-full">
              <div className="fontFam w-full h-auto flex flex-col justify-between gap-2 px-5 rounded-xl ease-in-out duration-300">
                <div className="fontFam w-full h-auto text-[40px] md:text-[45px] lg:text-[60px] text-[#53c28b] text-center ease-in-out duration-300">
                  Register
                </div>
                <div className="w-full h-auto flex gap-4 justify-center items-center">
                  <Link
                    href="#"
                    className="w-[3rem] h-[3rem] active:scale-75 flex justify-center items-center text-2xl no-underline border-[1px] rounded-full hover:border-[#53c28b] ease-in-out duration-300 shadow-md"
                  >
                    <i className="fa fa-github hover:scale-110" />
                  </Link>
                  <Link
                    href="#"
                    className="w-[3rem] h-[3rem] active:scale-75 flex justify-center items-center hover:text-red-500 text-2xl no-underline border-[1px] rounded-full hover:border-[#53c28b] ease-in-out duration-300 shadow-md"
                  >
                    <i className="fa fa-google-plus hover:scale-110" />
                  </Link>
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
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                      placeholder="Enter FirstName"
                      className="allFormInput h-[52px]"
                    />
                    <input
                      type="text"
                      name="lastname"
                      onChange={(e) => setLastname(e.target.value)}
                      required
                      placeholder="Enter LastName"
                      className="allFormInput h-[52px]"
                    />
                  </div>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter E-mail"
                    className="allFormInput h-[52px]"
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter Password"
                    className="allFormInput h-[52px]"
                  />
                  <input
                    type="password"
                    name="email"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm Password"
                    className={`allFormInput h-[52px]
                  ${error ? "border-red-500 text-red-500" : ""}`}
                  />
                  {error && <span className="text-red-500">{error}</span>}

                  {/* Professional form check */}
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
                    I agree to the terms and conditions!
                  </div>
                  <button
                    type="submit"
                    className="allBtn w-[7rem] h-[3rem] text-xl rounded-3xl"
                  >
                    Register
                  </button>
                </form>
                <div className="lg:flex gap-1 justify-center mb-2">
                  Already have account?{" "}
                  <Link
                    className="cursor-pointer font-semibold hover:shadow-md focus:shadow-md hover:scale-105 duration-500"
                    // text-[#fff]/80 hover:text-[#fff]
                    href={"/signIn"}
                  >
                    <span className="underline underline-offset-2">SignIn</span>{" "}
                    <span className="underline underline-offset-2">Here</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default RegistrationForm;
