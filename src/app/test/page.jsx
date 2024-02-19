"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
// import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";
import Carousel from "../../components/Carousel";
import Loading from "../loading";
import Chat from "@/components/Chat";
// import TermsConditionsUser from "@/components/TermsConditions";
// import { tcPolicyUser } from "@/context/terms-conditions";
// import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.cjs.jsx";
// import Carousel from "./components/Carousel";

export default function Home() {
  let ref = useRef(null);
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  let by = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  let ty = useTransform(scrollYProgress, [1, 0], ["580%", "260%"]);
  let mdty = useTransform(scrollYProgress, [1, 0], ["400%", "150%"]);
  let opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  let scale = useTransform(scrollYProgress, [0, 1], ["100%", "130%"]);

  const [style, setStyle] = useState({
    y: window?.innerWidth <= 768 ? ty : mdty,
    opacity,
  });

  useEffect(() => {
    const handleResize = () => {
      setStyle({
        y: window.innerWidth <= 768 ? ty : mdty,
      });
    };
    // Add event listener to track window size changes
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ty, mdty]);

  return (
    <>
      <section
        ref={ref}
        className="h-[123vh] w-full overflow-hidden relative -translate-y-[15.2rem] md:-translate-y-[4.2rem] ease-in-out duration-300"
      >
        {/*  -top-[4.2rem]  lg:-translate-y-[4.2rem]*/}
        <motion.div
          // className="inset-0 absolute z-0 bg-[#000300]"
          style={{
            y: by,
          }}
        />
        <motion.div
          // className="inset-0 absolute z-10 backdrop-filter backdrop-blur-sm"
          style={{
            y: by,
          }}
        />
        <motion.div
          className="inset-0 absolute z-0"
          style={{
            backgroundImage: `url(/assets/bg55.gif)`,
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: by,
            scale,
            opacity,
          }}
        >
          {/* <ScrollyVideo src="/bg3.mp4" /> */}
          {/* <ScrollyVideo
            src="https://scrollyvideo.js.org/goldengate.mp4"
            // scrollyVideoContainer="okay"
            cover="true"
            sticky="true"
            full="true"
          /> */}
        </motion.div>
        <motion.div
          style={style}
          className={`z-50 relative flex flex-col gap-2 px-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px] ease-in-out`}
        >
          <h1 className="logoTitle font-bold text-white text-7xl md:text-8xl lg:text-9xl animate-slideDown">
            SkillBeHired
          </h1>
          <p className="animate-slideDown text-[#53c28b]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            corrupti quo veritatis sed aut voluptatem.
          </p>
          <Link
            href="/test"
            className=" bg-[#53c28b] hover:bg-[#1fac65] w-[8.2rem] animate-slideDown flex items-center text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg"
          >
            home 2
          </Link>
        </motion.div>
      </section>
      <section className="-translate-y-[15.1627rem] -mb-[15rem] bdbg w-full h-screen rounded-md p-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px] flex flex-col md:flex-row gap-3 ease-in-out duration-300">
        <div className="backdrop-blur-sm w-full md:w-[30%] lg:w-[20%] h-[15%] md:h-full p-3">
          <h1 className="text-xl text-[#53c28b]">Categories:</h1>
          <div className="w-full h-full md:h-auto flex flex-row md:flex-col items-center justify-center gap-2 overflow-hidden ease-in-out duration-300">
            <span className="text-sm md:text-[18px] cursor-pointer hover:text-[#53c28b] duration-200">
              web Design
            </span>
            <span className="text-sm md:text-[18px] cursor-pointer hover:text-[#53c28b] duration-200">
              Electrition
            </span>
            <span className="text-sm md:text-[18px] cursor-pointer hover:text-[#53c28b] duration-200">
              Painter
            </span>
            <span className="text-sm md:text-[18px] cursor-pointer hover:text-[#53c28b] duration-200"></span>
            <span className="text-sm md:text-[18px] cursor-pointer hover:text-[#53c28b] duration-200">
              web Design
            </span>
            <span className="text-sm md:text-[18px] cursor-pointer hover:text-[#53c28b] duration-200">
              web Design
            </span>
          </div>
        </div>
        <hr className="border-[#53c28b] border-solid border-[0.5px] w-full h-[.5px] md:hidden rounded-lg" />
        <hr className="border-[#53c28b] hidden md:flex h-full w-[0.5px] border-solid border-[0.5px] rounded-lg" />
        <div className="backdrop-blur-sm w-full rounded-md md:w-[70%] lg:w-[80%] h-full p-3">
          <h2 className="text-xl text-[#53c28b]">Work</h2>
          <div className="scale-90 flex flex-col justify-center ml-2 md:ml-5">
            <Carousel />
            <Carousel />
          </div>
        </div>
      </section>
      {/* <section className="w-full h-screen flex justify-center p-5">
        <div className="w-[80%] h-full overflow-y-scroll scroll-snap-type-y-mandatory">
          <div className="h-[1000px] w-full flex items-center justify-center text-4xl font-bold bg-slate-500 ">
            Scroll Down
          </div>
          <div className="h-[1000px] w-full flex items-center justify-center text-4xl font-bold scroll-margin-8 bg-slate-500 ">
            Snap Area 1
          </div>
          <div className="h-[1000px] w-full flex items-center justify-center text-4xl font-bold scroll-margin-8 bg-slate-500 ">
            Snap Area 2
          </div>
          <div className="h-[1000px] w-full flex items-center justify-center text-4xl font-bold bg-slate-500 ">
            Scroll Down
          </div>
        </div>
      </section> */}
      <section className="w-full h-[70vh] border-[px] flex flex-col justify-center items-center relative scale-50">
        {/* <Loading /> */}
        <Image
          src="/assets/loading3d360Rotate.gif"
          alt="authImg"
          width={400}
          // fill={true}
          height={400}
          className="w-auto h-auto absolute animate-[moveCon_1s_infinite_ease_alternate]"
        />
        {/* <div className=""> */}
        {/* <TermsConditionsUser setData={tcPolicyUser} /> */}
        {/* </div> */}
      </section>
      <section className="w-full h-screen">
        {/* <Chat /> */}
      </section>
    </>
  );
}
