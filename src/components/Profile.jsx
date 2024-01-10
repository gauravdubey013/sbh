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

// Import other necessary dependencies

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
  let age;
  if (user?.role == "professional") {
    prof = userData?.[1]?.prof;
    age = prof ? calculateAge(prof?.dob) : "18+";
  } else prof = null;

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
      <div className="h-full flex flex-col  shadow-xl overflow-y-scroll animate-fade-in-down relative z-10">
        {/* <div className="w-full h-full flex flex-col relative z-10">
        </div> */}

        {user?.role != "user" && (
          <div
            className={`${
              socialToggle
                ? "opacity-100 animate-fade-in-down"
                : "opacity-0 animate-fade-in-up"
            } w-full md:w-[34.5%] h-[66%] md:h-[73.5%] bbg shadow-2xl border border-[#53c28b] rounded-b-3xl flex items-end justify-center absolute z-0`}
          >
            <div className="flex flex-col gap-1 items-center justify-center p-2">
              <Link href={prof?.sLOne} target="_blank">
                {prof?.sLOne}
              </Link>
              <Link href={prof?.sLOne} target="_blank">
                {prof?.sLOne}
              </Link>
            </div>
          </div>
        )}

        {user?.role != "user" && (
          <div
            className={` ${
              contactToggle
                ? "opacity-100 animate-fade-in-down"
                : "opacity-0 animate-fade-in-up"
            } w-full md:w-[32.5%] h-[66%] md:h-[73.5%] md:left-[34.4%] bbg shadow-2xl border border-[#53c28b] rounded-b-3xl flex items-end justify-center absolute z-0`}
          >
            <div className="flex flex-col gap-1 items-center justify-center p-2">
              <div className="flex gap-1">
                <span className="cursor-pointer text-[#53c28b]">Email :</span>
                <span className="cursor-pointer">{prof?.email}</span>
              </div>
              <div className="flex gap-1">
                <span className="cursor-pointer text-[#53c28b]">
                  Phone no. :
                </span>
                <span className="cursor-pointer">{prof?.phone}</span>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-full bg-[#53c28b] shadow-lg pb-3 rounded-b-3xl overflow-hidden z-10">
          <div className="w-full h-auto px-4 bbg flex justify-between">
            <div
              className="flex text-lg items-center justify-center cursor-pointer hover:text-[#53c28b] active:scale-75 ease-in-out duration-300"
              onClick={() => router.back()}
            >
              <IoMdArrowRoundBack size={25} />
              Back
            </div>
            <div
              className="flex gap-1 items-center justify-center hover:text-[#53c28b] active:scale-75 ease-in-out duration-300 active:translate-y-2"
              onClick={() => setEditToggle(!editToggle)}
            >
              {!editToggle ? <FaUserEdit size={25} /> : <MdCancel size={25} />}
            </div>
          </div>
          <div className="flex rounded-b-3xl bbg space-y-5 flex-col items-center py-7">
            <div className="w-32 h-32 bg-[#000] border-[0.5px] border-[#53c28b] shadow-lg rounded-full animate-fade-in-down overflow-hidden">
              <Image
                src={
                  user?.role == "user" || user?.role == "admin"
                    ? "/assets/loading3d360Rotate.gif"
                    : prof?.profileImgPath
                }
                alt={`${user?.firstname}`}
                priority={true}
                width={800}
                height={800}
                className="w-full h-full shadow-md z-10"
              />
            </div>
            <span className="text-xl">
              {user?.lastname == "google" || user?.lastname == "github"
                ? user?.firstname
                : `${user?.firstname} ${user?.lastname}`}
              <span className="font-light">, {age}</span>
            </span>
            <div className="flex flex-col items-center justify-center px-4">
              <div className="flex flex-row gap-1">
                <span className="text-[#53c28b]">Service :</span>
                <span> {prof?.service}</span>
              </div>
              <div className="flex flex-col md:flex-row gap-1">
                <span className="text-[#53c28b]">Year of Experience :</span>
                <span>{prof?.skillLevel}</span>
              </div>
              <div className="flex flex-col md:flex-row gap-1">
                <span className="text-[#53c28b]">Work History :</span>
                <span>{prof?.workHistory}</span>
              </div>
            </div>
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
          <div
            className={`${
              user?.role == "user" ? "hidden" : "grid"
            } px-7 py-2 -mb-3 text-[#000] items-center justify-around grid-cols-3 gap-4 divide-x divide-solid divide-zinc-950`}
          >
            <div
              className="col-span-1 flex flex-col items-center text-lg font-medium cursor-pointer active:translate-y-1 duration-200"
              onClick={() => {
                setSocialToggle(!socialToggle);
                contactToggle ? setContactToggle(!contactToggle) : "";
              }}
            >
              <GiBackup size={25} />
              <span>Social Links</span>
            </div>
            <div
              className="col-span-1 px-3 flex flex-col items-center text-lg font-medium cursor-pointer active:translate-y-1 duration-200"
              onClick={() => {
                setContactToggle(!contactToggle);
                socialToggle ? setSocialToggle(!socialToggle) : "";
              }}
            >
              <RiContactsBookFill size={25} />
              <span>Contact</span>
            </div>
            <div className="col-span-1 px-3 flex flex-col items-center text-lg font-medium cursor-pointer">
              <BsChatLeftTextFill size={25} />
              <span>Chat</span>
            </div>
          </div>
        </div>
        <div className="w-full h-auto mt-2 p-4">
          <div className="w-full h-full rounded-3xl border border-[#53c28b] text-md flex flex-col gap-1 p-2 sm:p-4 md:px-6">
            <div className="w-full h-auto flex gap-1 items-start justify-start md:justify-between">
              <div className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                Gender
              </div>
              :
              <div className="w-auto md:w-[80%] h-auto">
                {prof?.gender ?? "none"}
              </div>
            </div>
            <div className="flex gap-1 items-start justify-start md:justify-between">
              <div className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                Date-of-birth
              </div>
              :
              <div className="w-auto md:w-[80%] h-auto">
                {prof?.dob ?? "none"}
              </div>
            </div>
            <div className="flex gap-1 items-start justify-start md:justify-between">
              <div className="text-[#53c28b] w-auto md:w-[12%] h-auto">Zip</div>
              :
              <div className="w-auto md:w-[80%] h-auto">
                {prof?.zipCode ?? "none"}
              </div>
            </div>
            <div className="flex gap-1 items-start justify-start md:justify-between">
              <div className="text-[#53c28b] w-auto md:w-[12%] h-auto">
                Address
              </div>
              :
              <div className="w-auto md:w-[80%] h-auto">
                {prof?.address ?? "none"}
              </div>
            </div>
            <div className="flex gap-1 items-start justify-start md:justify-between">
              <div className="text-[#53c28b] w-auto md:w-[12%] h-auto">Bio</div>
              :
              <div className="w-auto md:w-[80%] h-auto">
                {prof?.bio ?? "none"}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="grid rounded-2xl divide-y divide-dashed hover:divide-solid  justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
          <div class="col-span-1  p-3">
            <div class="flex flex-col items-center ">
              <a href="">
                {" "}
                <button class="tr-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-14 w-14 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="text-lg font-medium">Mi Perfil</span>
                </button>
              </a>
            </div>
          </div>
          <div class="col-span-1  p-3">
            <div class="flex flex-col items-center ">
              <a href="">
                {" "}
                <button class="tr-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-14 w-14 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span class="text-lg font-medium">Mis dinero</span>
                </button>
              </a>
            </div>
          </div>
          <div class="col-span-1  p-3">
            <div class="flex flex-col items-center ">
              <a href="">
                {" "}
                <button class="tr-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-14 w-14 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                  <span class="text-lg font-medium">Mis referidos</span>
                </button>
              </a>
            </div>
          </div>
          <div class="col-span-1  p-3">
            <div class="flex flex-col items-center ">
              <a href="">
                <button class="tr-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-14 w-14 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span class="text-lg font-medium">Mis facturas</span>
                </button>
              </a>
            </div>
          </div>
          <div class="col-span-1  p-3">
            <div class="flex flex-col items-center ">
              <a href="">
                {" "}
                <button class="tr-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-14 w-14 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="text-lg font-medium">Ayuda</span>
                </button>
              </a>
            </div>
          </div>
          <div class="col-span-1 bg-red-50 p-3">
            <div class="flex  flex-col items-center ">
              <a href="">
                {" "}
                <button class="tr-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-14 w-14 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span class="text-lg font-medium">Salir</span>
                </button>
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ProfileCompo;
