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

const ProfileCompo = (props) => {
  const { setEmail } = props;
  const email = setEmail;
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

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

    if (!userData) {
      userInfo();
    }
  }, [email, userData, error]);

  // Optional chaining to avoid undefined errors
  const user = userData?.[0]?.user;
  let prof;
  if (user?.role == "professional") {
    prof = userData?.[1]?.prof;
  } else prof = null;

  const age = prof ? calculateAge(prof?.dob) : "18+";
  const handleSignOutAndRedirect = async () => {
    try {
      router.push(`/signUp/professionalSignUp/${email}`);
      await signOut();
    } catch (error) {
      console.error("Error during signOut:", error);
    }
  };

  //   console.log(userData);

  if (user === undefined || prof === undefined) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full h-full min-h-[78vh] flex flex-col  shadow-xl overflow-y-scroll animate-fade-in-down relative z-10">
        {prof?.email === session?.user?.email && (
          <>
            <div
              className={`w-full h-auto px-4 flex justify-between ${
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
              <div
                className="flex gap-1 items-center justify-center cursor-pointer hover:text-[#53c28b] active:scale-75 ease-in-out duration-300 active:translate-y-2"
                onClick={() => setEditToggle(!editToggle)}
              >
                {!editToggle ? (
                  <FaUserEdit size={25} />
                ) : (
                  <MdCancel size={25} />
                )}
              </div>
            </div>
            <div
              className={` ${
                !editToggle
                  ? "hidden opacity-0 animate-fade-in-up absolute"
                  : "opacity-100 animate-fade-in-down fixed"
              } w-full h-full bg-[00000055] backdrop-blur-sm flex items-cente justify-center z-40`}
            >
              {/*  h-[150vh] -translate-y-32 mt-40*/}
              <div className="w-[50%] h-[73vh] fixed mt-14 bg-[#000] border border-[#53c28b] shadow-lg rounded-3xl flex items-center justify-center">
                edit form
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
                  : "opacity-0 animate-fade-in-up"
              } w-full md:w-[34.5%] h-[61%] md:h-[71%] bbg shadow-2xl border border-[#53c28b] rounded-b-3xl flex items-end justify-center absolute z-0`}
            >
              <div className="flex flex-col gap-1 items-center justify-center p-2">
                <Link
                  href={prof?.sLOne ?? "https://sbh.vercel.app/"}
                  target="_blank"
                >
                  {prof?.sLOne ?? "sbh"}
                </Link>
                <Link
                  href={prof?.sLTwo ?? "https://sbh.vercel.app/"}
                  target="_blank"
                >
                  {prof?.sLTwo ?? "sbh"}
                </Link>
              </div>
            </div>
            <div
              className={` ${
                contactToggle
                  ? "opacity-100 animate-fade-in-down"
                  : "opacity-0 animate-fade-in-up"
              } w-full md:w-[32.5%] h-[61%] md:h-[71%] md:left-[34.4%] bbg shadow-2xl border border-[#53c28b] rounded-b-3xl flex items-end justify-center absolute z-0`}
            >
              <div className="flex flex-col gap-1 items-center justify-center p-2">
                <div className="flex gap-1">
                  <span className="cursor-pointer text-[#53c28b]">Email :</span>
                  <span className="cursor-pointer">
                    {prof?.email ?? "sbh@skillbehired.com"}
                  </span>
                </div>
                <div className="flex gap-1">
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
            <div className="w-32 h-32 bg-[#000] border-[0.5px] border-[#53c28b] shadow-lg rounded-full animate-fade-in-down overflow-hidden">
              <Image
                src={
                  user?.role == "user" || user?.role == "admin"
                    ? "/assets/loading3d360Rotate.gif"
                    : prof?.profileImgPath ?? "/assets/loading3d360Rotate.gif"
                }
                alt={`${user?.firstname}`}
                priority={true}
                width={800}
                height={800}
                className="w-full h-full shadow-md z-10"
              />
            </div>
            <div className="flex gap-1 text-xl">
              <span className="text-[#53c28b] capitalize">{user?.role} :</span>
              <span className="text-xl">
                {user?.lastname !== "google" || user?.lastname != "github"
                  ? user?.firstname
                  : `${user?.firstname} ${user?.lastname}`}
                <span className="font-light">, {age}</span>
              </span>
            </div>
            {user?.role == "professional" && (
              <div className="flex flex-col items-center justify-center px-4">
                <div className="flex flex-row gap-1">
                  <span className="text-[#53c28b]">Service :</span>
                  <span> {prof?.service ?? "none"}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-1">
                  <span className="text-[#53c28b]">Year of Experience :</span>
                  <span>{prof?.skillLevel ?? "none"}</span>
                </div>
                {/* <div className="flex flex-col md:flex-row gap-1">
                  <span className="text-[#53c28b]">Work History :</span>
                  <span>{prof?.workHistory ?? "none"}</span>
                </div> */}
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

export default ProfileCompo;
