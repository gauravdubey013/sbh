"use client";

import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { tabs } from "@/context/data";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";
import Headroom from "react-headroom";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status: sessionStatus } = useSession();

  const [toggle, setToggle] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [hashTagValue, setHashTagValue] = useState("");

  useEffect(() => {
    const activeTabFinder = tabs.find(
      (tab) => pathname + hashTagValue === tab.url
    );
    setActiveTab(activeTabFinder?.id);
    // console.log(pathname);
  }, [hashTagValue, pathname, tabs]);

  useEffect(() => {
    setHashTagValue(window.location.hash);
  }, []);
  // const imageLoader = ({ src, width, quality }) => {
  //   const origin = process.env.HOSTNAME || window.location.origin;
  //   return `${origin}${src}?w=${width}&q=${quality || 75}`;
  // };

  return (
    <>
      <section className="fontFam z-40 w-full flex justify-center flex-col">
        <div className="hidden md:flex h-auto py-1 backdrop-filter backdrop-blur-md">
          <div className="w-full h-auto mr-5 flex items-center justify-end gap-7 text-xs ease-in-out duration-300">
            <Link href={"/"} className="hover:text-[#53c28b] duration-200">
              India
            </Link>
            <Link href={"/"} className="hover:text-[#53c28b] duration-200">
              English
            </Link>
            {/* <Link
              href={"/#contact"}
              className="hover:text-[#53c28b] duration-200"
            >
              Contact Us
            </Link> */}
          </div>
        </div>
        <Headroom>
          <div
            className={`absolute z-40 md:hidden w-full h-[11rem] inset-0 top-[4rem] backdrop-filter backdrop-blur-md rounded-b-[20px] animate-slideDown md:animate-none ${!toggle
                ? `hidden`
                : `flex border-b-[1px] border-[#53c28b] md:border-none`
              } ease-in-out duration-200`}
          />
          <div className="sticky z-40 w-full h-[66px] ease-in-out backdrop-filter backdrop-blur-md animate-fade-in-down">
            <div className="containerNav w-full flex justify-between items-center gap-5 px-2 md:px-4 translate-y-3 ease-in-out">
              {" "}
              <div className="open md:hidden">
                <Hamburger
                  toggled={toggle}
                  toggle={setToggle}
                  label="Show menu"
                  size={25}
                  color="#53c28b"
                  hideOutline={false}
                  easing="ease-in"
                  distance="lg"
                  // duration={0.6}
                  rounded
                />
              </div>
              <Link href={"/"} className="logoTitle text-[28px] w-auto h-auto">
                {/* {props.title} */}
                <Image
                  src={"/assets/logoT.png"}
                  // loader={imageLoader}
                  alt="logo"
                  width={100}
                  height={100}
                  sizes="200vw"
                  priority={true}
                  className="w-[18vh] md:w-full h-auto max-w-[470 active:scale-95 ease-in-out duration-200"
                />
              </Link>
              <div className="flex items-center justify-center">
                <div
                  className={`menu z-50 w-full left-0 right-0 flex-col gap-1 flex md:flex-row rounded-[10px] ease-in-out duration-300 fixed
                  ${!toggle
                      ? `hidden md:flex opacity-0 md:opacity-100`
                      : `animate-slideDown md:animate-none opacity-100 top-[3rem] md:top-0 p-2 md:p-0 h-auto rounded-b-[20px]`
                    } md:static`}
                >
                  <div className="flex justify-end md:flex-none mr-1">
                    <DarkModeToggle />
                  </div>
                  {tabs.map((tab) => (
                    <Link
                      key={tab.id}
                      href={tab.url}
                      onClick={() => {
                        setToggle(!toggle);
                        setActiveTab(tab.id);
                      }}
                      className="menuLinks relative rounded-full px-3"
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 rounded-full backdrop-blur-md border-[.5px] border-[#53c28b] bg-[#53c28b]/50 "
                          transition={{ type: "spring", duration: 0.6 }}
                        />
                      )}
                      <span
                        className={`relative z-10 mix-blend-exclusio ${activeTab === tab.id ? "" : `hoverText px-2 md:p-0`
                          }`}
                      >
                        {tab.label}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="w-auto h-auto ml-2">
                  {sessionStatus === "loading" ? (
                    <Image
                      src="/assets/loadingThreeRotate.gif"
                      alt="authImg"
                      width={100}
                      // fill={true}
                      height={100}
                      className="h-8 w-8"
                    />
                  ) : !session ? (
                    <Link
                      href={"/signIn"}
                      className="signin allBtn w-[4.5rem] h-[2rem] text-md rounded-md"
                    >
                      Login
                    </Link>
                  ) : (
                    <>
                      <Dropdown
                        authUser={session ?? ""}
                        btnOnClick={async () => {
                          await signOut();
                          router.push("/signIn");
                        }}
                        btnName={"LogOut"}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Headroom>
      </section>
    </>
  );
};

export default Navbar;

export const Dropdown = (props) => {
  const { authUser, btnOnClick, btnName } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // console.log("user: ", authUser?.user?.lastname);
  return (
    <div className="relative inline-block text-left">
      {/* Profile Image */}
      <Image
        src={
          (authUser?.prof?.profileImgPath || authUser?.authUser?.image) ??
          "/assets/bg6.png"
        }
        alt="Profile"
        onClick={handleToggle}
        priority={true}
        width={800}
        height={800}
        className="h-6 w-6 rounded-full cursor-pointer active:scale-75 ease-in-out duration-200"
      />

      {/* Dropdown */}
      {
        <div
          className={` ${!isOpen
              ? "hidden animate-fade-in-up duration-300"
              : "opacity-100 animate-fade-in-down duration-300"
            } backdrop-filter backdrop-blur-md z-50 bg-[#000000a1] origin-top-right absolute right-0 mt-6 -mr-2 md:-mr-4 w-auto rounded-md shadow-lg border-b-[0.5px] border-l-[0.5px] border-[#53c28b] ring-1 ring-black ring-opacity-5 focus:outline-none ease-in-out`}
        >
          <div
            className="p-1 flex flex-col items-center justify-center gap-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Dropdown Items */}
            <div className="block text-sm" role="menuitem">
              {authUser?.user?.name ?? "name"}
            </div>
            <div className="block text-sm" role="menuitem">
              {authUser?.user?.role ?? "role"}
            </div>
            {(authUser?.user?.role === "admin" ||
              authUser?.user?.role === "superAdmin") && (
                <Link
                  href={`/admin/${authUser?.user?.email ?? ""}`}
                  onClick={() => setIsOpen(!isOpen)}
                  className="viewProfile allBtn w-[6rem] h-[2rem] text-md rounded-md"
                >
                  Admin
                </Link>
              )}
            <Link
              href={`/profile/${authUser?.user?.email ?? ""}`}
              onClick={() => setIsOpen(!isOpen)}
              className="viewProfile allBtn w-[6rem] h-[2rem] text-md rounded-md"
            >
              View Profile
            </Link>

            <button
              onClick={btnOnClick}
              role="userLogout"
              className="signout allBtn w-[6rem] h-[2rem] text-md rounded-md"
            >
              {btnName}
            </button>
          </div>
        </div>
      }
    </div>
  );
};
