"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GiBackup } from "react-icons/gi";
import { RiContactsBookFill } from "react-icons/ri";
import { BsChatLeftTextFill } from "react-icons/bs";

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

  const [userData, setUserData] = useState(null);
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

  //   console.log(userData);

  //   console.log("user: ", user);
  //   console.log("prof: ", prof);
  return (
    <>
      <div className="h-full flex flex-col  shadow-xl overflow-y-scroll">
        {/* <div className="ml-3 h-7 flex justify-end items-center">
          <button
            type="button"
            className="bg-gray-100 dark:bg-gray-700 m-1 p-3 justify-end rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Close panel</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div> */}
        <div className="bg-green-300 shadow-lg pb-3 rounded-b-3xl">
          <div className="flex rounded-b-3xl bbg space-y-5 flex-col items-center py-7">
            <div className="w-32 h-32 bg-[#000] border-[0.5px] border-[#53c28b] shadow-lg rounded-full overflow-hidden ">
              <Image
                src={
                  prof?.profileImgPath == undefined
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
            <a href="#">
              {" "}
              <span className="text-h1">
                {user?.lastname == "google" || user?.lastname == "github"
                  ? user?.firstname == undefined
                    ? "Gaurav"
                    : user?.firstname
                  : user?.firstname == undefined
                  ? "Gaurav"
                  : `${user?.firstname} ${user?.lastname}`}
                , <span className="font-light text-gray-500">{age}</span>
              </span>
            </a>
          </div>
          <div className="grid px-7 py-2 -mb-3 text-[#000]  items-center justify-around grid-cols-3 gap-4 divide-x divide-solid">
            <div class="col-span-1 flex flex-col items-center ">
              <span class="text-2xl font-bold">
                <GiBackup />
              </span>
              <span class="text-lg font-medium 0">Social Links</span>
            </div>
            <div class="col-span-1 px-3 flex flex-col items-center ">
              <span class="text-2xl font-bold">
                <RiContactsBookFill />
              </span>
              <span class="text-lg font-medium">Contact</span>
            </div>
            <div class="col-span-1 px-3 flex flex-col items-center ">
              <span class="text-2xl font-bold">
                <BsChatLeftTextFill />
              </span>
              <span class="text-lg font-medium">Chat</span>
            </div>
          </div>
        </div>
        <div className="grid rounded-2xl divide-y divide-dashed hover:divide-solid  justify-evenly bg-gray-50 dark:bg-gray-300 m-3 mt-10 grid-cols-3">
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
        </div>
      </div>
    </>
  );
};

export default ProfileCompo;
