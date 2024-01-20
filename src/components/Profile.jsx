"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { GiBackup } from "react-icons/gi";
import { RiContactsBookFill } from "react-icons/ri";
import { BsChatLeftTextFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

import Loading from "@/app/loading";

export const calculateAge = (birthdate) => {
  const today = new Date();
  const birthdateDate = new Date(birthdate);

  let age = today.getFullYear() - birthdateDate.getFullYear();

  // Check if the birthday has occurred this year
  if (
    today.getMonth() < birthdateDate.getMonth() ||
    (today.getMonth() === birthdateDate.getMonth() &&
      today.getDate() < birthdateDate.getDate())
  ) {
    age--;
  }

  return age;
};

const Profile = (props) => {
  // const { setEmail } = props;
  const email = props.setEmail;
  const router = useRouter();
  const { data: session, status: sessionStuser } = useSession();

  const [userData, setUserData] = useState(null);
  const [editToggle, setEditToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [contactToggle, setContactToggle] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userInfo = async () => {
      try {
        const res = await fetch("/api/auth/user-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
          }),
        });

        if (res.status === 400) {
          setError("User data isn't in the database!");
          console.log("Error: ", error);
        }
        if (res.status === 200) {
          setError("");
          const data = await res.json();
          setUserData(data);
        }
      } catch (error) {
        setError("Something went wrong!");
        console.log("Error", error);
      }
    };

    // if (!userData) {
    userInfo();
    // }
  }, [email, userData, error]);

  // Optional chaining to avoid undefined errors
  const user = userData?.user;
  let prof;
  if (user?.role == "professional") {
    prof = userData?.prof;
  } else prof = null;
  const age = prof ? calculateAge(prof?.dob) : "";

  const handleSignOutAndRedirect = async () => {
    try {
      await signOut();
      router.push(`/signUp/professionalSignUp/${email}`);
    } catch (error) {
      console.error("Error during signOut:", error);
    }
  };

  if (user === undefined || prof === undefined) {
    return <Loading />;
  }
  // console.log(session?.user?.email);
  return (
    <>
      <div className="w-full h-full min-h-[78vh] flex flex-col shadow-xl overflow-y-scroll animate-fade-in-down relative z-10">
        <div
          className={`w-full h-auto px-4 py-2 md:py-0 flex justify-between ${
            !editToggle ? "absolute" : "fixed"
          } z-50`}
        >
          <div
            className="flex text-lg items-center justify-center cursor-pointer hover:text-[#53c28b] active:scale-75 ease-in-out duration-300"
            onClick={() => router.back()}
          >
            <IoMdArrowRoundBack size={25} />
            Back
          </div>
          {prof?.email === session?.user?.email && (
            <div
              className="flex gap-1 items-center justify-center cursor-pointer hover:text-[#53c28b] active:scale-75 ease-in-out duration-300 active:translate-y-2"
              onClick={() => setEditToggle(!editToggle)}
            >
              {!editToggle ? <FaUserEdit size={25} /> : <MdCancel size={25} />}
            </div>
          )}
        </div>
        {prof?.email === session?.user?.email && (
          <>
            <div
              className={` ${
                !editToggle
                  ? "hidden opacity-0 animate-fade-in-up absolute"
                  : "opacity-100 animate-fade-in-down fixed"
              } w-full h-full bg-[00000055] backdrop-blur-sm flex items-cente justify-center z-40`}
            >
              {/*  h-[150vh] -translate-y-32 mt-40*/}
              <div className="w-[90%] sm:w-[85%] md:w-[70%] lg:w-[50%] h-[73vh] ease-in-out duration-300 fixed mt-14 bbg border border-[#53c28b] shadow-lg rounded-3xl p-4 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 md:p-2 borde rounded-3xl">
                  <span className="text-3xl text-[#53c28b]">Edit</span>
                  <div className="w-full h-auto scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory overflow-hidden">
                    <EditProfile prof={prof ?? "NaN"} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {user?.role == "professional" && (
          <>
            <div
              className={`${
                socialToggle
                  ? "opacity-100 animate-fade-in-down"
                  : "opacity-0 animate-fade-in-up -top-[100%]"
              } w-full md:w-[34.5%] h-[51vh] md:h-[70.5%] bbg shadow-2xl border border-[#53c28b] rounded-b-3xl flex items-end justify-center absolute z-0`}
            >
              <div className="w-full flex flex-col gap-1 items-center justify-center p-2">
                <Link
                  href={prof?.sLOne ?? "https://sbh.vercel.app/"}
                  target="_blank"
                  className="allBtn w-[80%] h-[2.3rem] text-md rounded-3xl"
                >
                  Link One
                  {/* {prof?.sLOne ?? "sbh"} */}
                </Link>
                <Link
                  href={prof?.sLTwo ?? "https://sbh.vercel.app/"}
                  target="_blank"
                  className="allBtn w-[80%] h-[2.3rem] text-md rounded-3xl"
                >
                  Link Two
                  {/* {prof?.sLTwo ?? "sbh"} */}
                </Link>
              </div>
            </div>
            <div
              className={` ${
                contactToggle
                  ? "opacity-100 animate-fade-in-down"
                  : "opacity-0 animate-fade-in-up -top-[100%]"
              } w-full md:w-[32.5%] h-[51vh] md:h-[70.5%] md:left-[34.4%] bbg shadow-2xl border border-[#53c28b] rounded-b-3xl flex items-end justify-center absolute z-0`}
            >
              <div className="w-full flex flex-col gap-1 items-center justify-center p-2">
                <div className="w-[80%] h-[2.3rem] text-md flex gap-1 items-center justify-center">
                  <span className="cursor-pointer text-[#53c28b]">Email :</span>
                  <span className="cursor-pointer">
                    {prof?.email ?? "sbh@skillbehired.com"}
                  </span>
                </div>
                <div className="w-[80%] h-[2.3rem] text-md flex gap-1 items-center justify-center">
                  <span className="cursor-pointer text-[#53c28b]">
                    Phone no. :
                  </span>
                  <span className="cursor-pointer">
                    {prof?.phone ?? "00000000000"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="w-full h-full bg-[#53c28b] shadow-lg pb-3 rounded-b-3xl overflow-hidden z-10">
          {/*  */}
          <div className="flex rounded-b-3xl bbg space-y-5 flex-col items-center py-7">
            <div className="w-32 h-32 bbg border-[0.5px] border-[#53c28b] shadow-lg rounded-full animate-fade-in-down overflow-hidden">
              <Image
                src={
                  user?.signInWith == "google" || user?.signInWith == "gitHub"
                    ? session?.authUser?.image ??
                      "/assets/loading3d360Rotate.gif"
                    : prof?.profileImgPath ?? "/assets/loading3d360Rotate.gif"
                }
                alt={"userProfile"}
                priority={true}
                width={800}
                height={800}
                className="w-full h-full shadow-md z-10"
              />
            </div>
            <div className="flex gap-1 text-xl">
              <span className="text-[#53c28b] capitalize">{user?.role} :</span>
              <span className="text-xl">
                {user?.name}
                <span className="font-light">, {age}</span>
              </span>
            </div>
            {user?.role == "professional" && (
              <div className="flex flex-col items-center justify-center px-4">
                <div className="flex flex-row gap-1">
                  <span className="text-[#53c28b]">Service :</span>
                  <span> {prof?.service ?? "none"}</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-[#53c28b]">Year of Experience :</span>
                  <span>{prof?.skillLevel ?? "none"}</span>
                </div>
              </div>
            )}
          </div>
          <div
            className={`${
              user?.role != "user" ? "hidden" : "flex"
            } w-full h-10 mt-3 flex gap-1 items-center justify-center text-md md:text-lg text-[#000] px-3`}
          >
            <span className="text-lg">
              Want to be a Professional / Freelancer..?
            </span>
            <button
              role="userToProfessional"
              className="allBtn w-auto h-auto py-1 px-3 rounded-xl"
              onClick={handleSignOutAndRedirect}
            >
              Yes
            </button>
          </div>
          {user?.role == "professional" && (
            <div
              className={`grid px-7 py-2 -mb-3 text-[#000] items-center justify-around grid-cols-3 gap-4 divide-x divide-solid divide-zinc-950`}
            >
              <div
                className="col-span-1 flex flex-col items-center text-lg font-medium cursor-pointer hover:text-xl active:translate-y-1 duration-200"
                onClick={() => {
                  setSocialToggle(!socialToggle);
                  contactToggle ? setContactToggle(!contactToggle) : "";
                }}
              >
                <GiBackup size={25} />
                <span>Social Links</span>
              </div>
              <div
                className="col-span-1 px-3 flex flex-col items-center text-lg font-medium cursor-pointer hover:text-xl active:translate-y-1 duration-200"
                onClick={() => {
                  setContactToggle(!contactToggle);
                  socialToggle ? setSocialToggle(!socialToggle) : "";
                }}
              >
                <RiContactsBookFill size={25} />
                <span>Contact</span>
              </div>
              <div
                onClick={() => {
                  // setContactToggle(!contactToggle);
                  socialToggle ? setSocialToggle(!socialToggle) : "";
                  contactToggle ? setContactToggle(!contactToggle) : "";
                }}
                className="col-span-1 px-3 flex flex-col items-center text-lg font-medium cursor-pointer hover:text-xl active:translate-y-1 duration-200"
              >
                <BsChatLeftTextFill size={25} />
                <span>Chat</span>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-auto mt-2 p-4">
          {user?.role == "professional" ? (
            <div className="w-full h-full rounded-3xl border border-[#53c28b] text-md flex flex-col gap-1 p-2 sm:p-4 md:px-6">
              <div className="w-full h-auto flex gap-1 items-start justify-start md:justify-between">
                <span className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                  Work History
                </span>
                :
                <span className="w-auto md:w-[80%] h-auto">
                  {prof?.workHistory ?? "NaN"}
                </span>
              </div>
              <div className="w-full h-auto flex gap-1 items-start justify-start md:justify-between">
                <span className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                  Gender
                </span>
                :
                <span className="w-auto md:w-[80%] h-auto">
                  {prof?.gender ?? "NaN"}
                </span>
              </div>
              <div className="flex gap-1 items-start justify-start md:justify-between">
                <span className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                  Date-of-birth
                </span>
                :
                <span className="w-auto md:w-[80%] h-auto">
                  {prof?.dob ?? "NaN"}
                </span>
              </div>
              <div className="flex gap-1 items-start justify-start md:justify-between">
                <span className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                  Zip
                </span>
                :
                <span className="w-auto md:w-[80%] h-auto">
                  {prof?.zipCode ?? "NaN"}
                </span>
              </div>
              <div className="flex gap-1 items-start justify-start md:justify-between">
                <span className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                  Address
                </span>
                :
                <span className="w-auto md:w-[80%] h-auto">
                  {prof?.address ?? "NaN"}
                </span>
              </div>
              <div className="flex gap-1 items-start justify-start md:justify-between">
                <span className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                  Bio
                </span>
                :
                <span className="w-auto md:w-[80%] h-auto">
                  {prof?.bio ?? "NaN"}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-auto h-auto rounded-3xl border border-[#53c28b] p-4 overflow-hidden">
              <Image
                // /assets/pfpbanner.gif
                src="/assets/profilebanner.gif"
                priority={true}
                width={800}
                height={800}
                className="w-full h-[35vh] shadow-md z-10 rounded-3xl"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

export const EditProfile = (props) => {
  const { prof } = props;
  const [profEdit, setProfEdit] = useState({
    phone: "",
    skillLevel: "",
    workHistory: "",
    zipCode: "",
    address: "",
    bio: "",
    sLOne: "",
    sLTwo: "",
  });
  const [condition, setCondition] = useState({
    phoneC: true,
  });
  const [errors, setErrors] = useState({
    phoneE: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handlePhone = (e) => {
    let inputValue = e.target.value.replace(/[^\d]/g, "").slice(0, 10);
    setProfEdit((prev) => ({
      ...prev,
      phone: inputValue,
    }));
    if (inputValue.trim() === "") {
      setCondition({ phoneC: true });
      setErrors({ phoneE: "" });
    } else {
      setCondition({ phoneC: false });
      if (inputValue.length !== 10) {
        setErrors({ phoneE: "Number must be 10 digits and valid" });
      } else {
        setErrors({ phoneE: "" });
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfEdit({
      ...profEdit,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("email", prof?.email);
    // data.set("profileImg", profileImg);
    // data.set("resume", resume);
    data.set("phone", profEdit.phone);
    data.set("skillLevel", profEdit.skillLevel);
    data.set("workHistory", profEdit.workHistory);
    data.set("zipCode", profEdit.zipCode);
    data.set("address", profEdit.address);
    data.set("bio", profEdit.bio);
    data.set("sLOne", profEdit.sLOne);
    data.set("sLTwo", profEdit.sLTwo);

    if (profEdit.phone.trim() !== "" && profEdit.phone.length !== 10) {
      setDisableBtn(false);
      setCondition({ phoneC: false });
      setErrors({ phoneE: "Number must be 10 digits and valid" });
      setError("Number must be 10 digits and valid");
    } else {
      setError("");
      setDisableBtn(true);
      setSuccess(false);
      try {
        const res = await fetch("/api/auth/professional-update", {
          method: "POST",
          body: data,
        });
        if (res.status === 400) {
          setError("Invalid user! try again later");
          setDisableBtn(false);
          setSuccess(false);
        } else if (res.status === 500) {
          setError("Img & resume file aren't supported!");
          setDisableBtn(false);
        } else if (res.status === 200) {
          setError("");
          setSuccess(true);
          setProfEdit({
            phone: "",
            skillLevel: "",
            workHistory: "",
            zipCode: "",
            address: "",
            bio: "",
            sLOne: "",
            sLTwo: "",
          });
        }
        setDisableBtn(false);
      } catch (error) {
        setDisableBtn(false);
        setError(error);
        console.error("Error", error);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto flex flex-col gap-2"
      >
        <div className="flex flex-row gap-1">
          <input
            type="text"
            name="countryCode"
            value="+91"
            // readOnly
            disabled
            className="w-[2.5rem] h-[52px] fontFam text-[#53c28b] text-xl rounded-sm bg-transparent border-b-[1px] border-b-[#53c28b] hover:shadow-md focus:shadow-md outline-none"
          />
          <div
            className={`w-full h-auto ${
              condition.phoneC || errors.phoneE ? "-mb-2" : "mb-0"
            }`}
          >
            <input
              type="text"
              name="phone"
              maxlength="10"
              value={profEdit.phone}
              onChange={handlePhone}
              placeholder={`Phone Number : ${prof.phone ?? "NaN"}`}
              className="allFormInput h-[52px]"
            />
            <div className="w-full h-auto overflow-hidden">
              <span
                className={`${
                  condition.phoneC == true ? "flex animate-slideDown" : "hidden"
                }`}
              >
                number must be 10 digits
              </span>
              <span
                className={`${
                  errors.phoneE.trim() !== ""
                    ? "flex text-red-500 animate-slideDown"
                    : "hidden"
                }`}
              >
                {errors.phoneE}
              </span>
            </div>
          </div>
        </div>
        <input
          type="text"
          name="skillLevel"
          maxlength="2"
          value={profEdit.skillLevel}
          onChange={(e) =>
            setProfEdit((prev) => ({
              ...prev,
              skillLevel: e.target.value.replace(/[^\d]/g, ""),
            }))
          }
          placeholder={`Year's of Experience : ${prof.skillLevel ?? "NaN"}`}
          className="allFormInput h-[52px]"
        />
        <textarea
          name="workHistory"
          value={profEdit.workHistory}
          onChange={handleChange}
          placeholder={`Work History - ${prof.workHistory ?? "NaN"}`}
          rows={4}
          className="allFormInput h-auto"
        ></textarea>
        <input
          type="text"
          name="zipCode"
          value={profEdit.zipCode}
          onChange={(e) =>
            setProfEdit((prev) => ({
              ...prev,
              zipCode: e.target.value.replace(/[^\d]/g, ""),
            }))
          }
          placeholder={`Zip Code - ${prof.zipCode ?? "NaN"}`}
          className="allFormInput h-[52px]"
        />
        <textarea
          name="address"
          value={profEdit.address}
          onChange={handleChange}
          placeholder={`Address - ${prof.address ?? "NaN"}`}
          rows={3}
          className="allFormInput h-auto"
        ></textarea>
        <textarea
          name="bio"
          value={profEdit.bio}
          onChange={handleChange}
          placeholder={`Bio - ${prof.bio ?? "NaN"}`}
          rows={4}
          className="allFormInput h-auto"
        ></textarea>
        <input
          type="url"
          name="sLOne"
          value={profEdit.sLOne}
          onChange={handleChange}
          placeholder={`Social link 1 - ${prof.sLOne ?? "NaN"}`}
          className="allFormInput h-[52px]"
        />
        <input
          type="url"
          name="sLTwo"
          value={profEdit.sLTwo}
          onChange={handleChange}
          placeholder={`Social link 2 - ${prof.sLTwo ?? "NaN"}`}
          className="allFormInput h-[52px]"
        />
        <span
          className={`${
            error ? "flex text-red-500 animate-slideDown" : "hidden"
          }`}
        >
          {error}
        </span>
        <span
          className={`${
            success ? "flex text-[#53c28b] animate-slideDown" : "hidden"
          }`}
        >
          Updated successfully!
        </span>
        <button
          disabled={disableBtn}
          type="submit"
          className={`allBtn w-[rem] h-[3rem] text-xl rounded-3xl mb-4 ${
            disableBtn
              ? " opacity-70 active:scale-95 hover:scale-95 active:text-xl"
              : ""
          }`}
        >
          {disableBtn ? (
            <span className="animate-pulse">Updating...</span>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </>
  );
};
