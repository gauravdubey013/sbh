"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Squash as Hamburger } from "hamburger-react";
import DarkModeToggle from "./DarkModeToggle";
import { motion } from "framer-motion";
import Headroom from "react-headroom";
import Image from "next/image";

const tabs = [
  {
    id: 1,
    label: "Home",
    url: "/",
  },
  {
    id: 2,
    label: "Services",
    url: "/#services",
  },
  {
    id: 3,
    label: "About",
    url: "/#about",
  },
  {
    id: 4,
    label: "Contact",
    url: "/#contact",
  },
  {
    id: 5,
    label: "test",
    url: "/test",
  },
];
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const pathname = usePathname();
  const [hashTagValue, setHashTagValue] = useState('');

  useEffect(() => {
    const activeTabFinder = tabs.find(
      (tab) => pathname + hashTagValue === tab.url
    );
    setActiveTab(activeTabFinder?.id);
    // console.log(pathname);
  }, [hashTagValue, pathname, tabs]);

  useEffect(() => {
    setHashTagValue(window.location.hash);
  }, [])

  // console.log(activeTab);

  const imageLoader = ({ src, width, quality }) => {
    const origin = process.env.HOSTNAME || window.location.origin;
    return `${origin}${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>
      <section className="fontFam z-40 w-full flex justify-center flex-col">
        <div className="hidden h-[30px] backdrop-filter backdrop-blur-sm md:flex items-center justify-end gap-7 text-[13px] mr-7 ease-in-out duration-300">
          <Link href={"/"} className="hover:text-[#53c28b] duration-200">
            India
          </Link>
          <Link href={"/"} className="hover:text-[#53c28b] duration-200">
            English
          </Link>
          <Link href={"/"} className="hover:text-[#53c28b] duration-200">
            Contact Us
          </Link>
        </div>
        <Headroom>
          <div
            className={`absolute z-40 md:hidden w-full h-[11rem] inset-0 top-[4rem] backdrop-filter backdrop-blur-sm rounded-b-[20px] animate-slideDown md:animate-none ${!toggle
              ? `hidden`
              : `flex border-b-[1px] border-[#53c28b] md:border-none`
              } ease-in-out duration-200`}
          />
          <div className="sticky z-40 w-full h-[66px] ease-in-out backdrop-filter backdrop-blur-sm animate-fade-in-down">
            <div className="containerNav w-full flex justify-between items-center gap-5 px-2 md:px-4 translate-y-3 ease-in-out">
              {" "}
              <div className="open md:hidden">
                <Hamburger
                  size={25}
                  easing="ease-in"
                  color="#53c28b"
                  toggled={toggle}
                  toggle={setToggle}
                />
              </div>
              <Link href={"/"} className="logoTitle text-[28px] w-auto h-auto">
                {/* {props.title} */}
                <Image loader={imageLoader} src={"/logoT.png"} alt="logo" width={0} height={0} sizes="100vw" className="w-full h-auto max-w-[270]" />
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
                      className="menuLinks relative rounded-full px-3 fontFam"
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
                <Link href={"/signIn"} className="signout allBtn w-[6rem] h-[2rem] text-md rounded-md">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </Headroom>
      </section>
    </>
  );
};

export default Navbar;