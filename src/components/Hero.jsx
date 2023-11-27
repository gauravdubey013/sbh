"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { CiSearch } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";
import ServiceCompo from "@/components/ServiceCompo";
import Carousel from "./Carousel";
import Contact from "./Contact";

export default function Hero() {
  let ref = useRef(null);
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  let by = useTransform(scrollYProgress, [0, 1], ["0%", "250%"]);
  let opacity = useTransform(scrollYProgress, [0, 1], ["80%", "-100%"]);
  let scale = useTransform(scrollYProgress, [0, 1], ["100%", "150%"]);

  let ay = useTransform(scrollYProgress, [0, 1], ["-160%", "120%"]);

  return (
    <>
      <div className="overflow-hidden -translate-y-[66px] md:-translate-y-[101px] -mb-[100px]">
        {/* top-Banner-bg */}
        <section ref={ref.current} className="relative">
          <motion.div
            className="inset-0 absolute z-0 bg-[#000300]"
            style={{
              y: by,
            }}
          />
          <motion.div
            className="inset-0 absolute z-10 backdrop-filter backdrop-blur-sm"
            style={{
              y: by,
            }}
          />
          <motion.div
            className="inset-0 absolute z-0"
            style={{
              backgroundImage: `url(/heroBanner.gif)`,
              backgroundPosition: "bottom",
              backgroundSize: "cover",
              y: by,
              scale,
              opacity,
            }}
          ></motion.div>

          {/* top-Banner */}
          <HeroContext />
        </section>

        {/* service */}
        <section
          id="service"
          ref={ref.current}
          className="animate-fade-in-down bdbg relative z-20"
        >
          {/* slider */}
          <div className="bg-transparent -translate-y-20">
            <Carousel
              bg="bg-[#53c28b]"
              profile={"hidden"}
              defH="h-[14rem]"
              mdH="md:h-[16rem]"
              lgH="lg:h-[20rem]"
              slidesToScroll={1}
              speed={2500}
              autoplay={"true"}
              autoplaySpeed={0.01}
              slidesToShowDefault={3}
              slidesToShow768={3}
              slidesToShow1024={3}
              slidesToShow640={2}
            />
          </div>
          <div
            id="services"
            className="w-full h-auto p-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px] z-20 -translate-y-16"
          >
            <h3 className="text-[#53c28b] font-extrabold text-xl">Service</h3>
            <ServiceCompo />
          </div>
        </section>
        {/* about-section */}
        <section
          id="about"
          className="w-full h-screen flex flex-col md:flex-row bdbg"
        >
          <AboutContext aboutY={ay} />
        </section>
        {/* contact-section */}
        <section
          id="contact"
          className="relative z-10 h-[120vh] mt-5 md:h-screen bdbg"
        >
          <Contact />
        </section>
      </div>
    </>
  );
}

// export default home;

export const HeroContext = () => {
  return (
    <>
      <div className="w-full h-[101vh] bg-transparent relative z-20 flex flex-col justify-center p-[20px] sm:px-[65px] md:px-[65px] lg:px-[200px] ease-in-out duration-300">
        <div className="text-[30px] md:text-[35px] lg:text-[40px] font-bold leading-[36px] md:leading-[40px] lg:leading-[45px] ease-in-out duration-500">
          <span className="fontFam animate-slideDown text-[#53c28b]">
            Find the perfect <br /> professional for you
          </span>
        </div>
        <span className="animate-fade-in-down text-[20px] text-[#e6e7ec]/90">
          Get free quotes within minutes
        </span>
        <form className="animate-fade-in-down flex flex-col sm:flex-row gap-1 sm:gap-0 ease-in-out duration-300">
          <input
            type="text"
            placeholder="What service are you looking for?"
            className="w-[22.75rem] md:w-[18.8rem] lg:w-[22.75rem] h-[3.25rem] p-4 placeholder:text-[#fff]/[0.9] text-[#fff]/[0.9] outline-none bg-transparent rounded-md sm:rounded-r-none border-[2px] border-solid border-[#e6e7ec]/50 shadow-sm hover:border-b-[#53c28b] focus:border-b-[#53c28b] hover:placeholder:text-[#53c28b] ease-in-out duration-500"
          />

          <div className="flex gap-1 items-center">
            <div className="locIcon w-[12.5rem] h-[3.25rem] cursor-text hover:border-b-[2px] hover:border-b-[#53c28b] flex items-center px-2 rounded-md sm:rounded-l-none border-[2px] border-solid border-[#e6e7ec]/50 shadow-sm ease-in-out duration-500">
              <FaMapLocationDot size={20} className="" />
              <input
                type="text"
                placeholder="Pin Code"
                className="w-[90%] h-full bg-transparent outline-none p-2 placeholder:text-[#fff]/[0.9] text-[#fff]/[0.9] hover:placeholder:text-[#53c28b]"
              />
            </div>
            <button
              type="submit"
              // onClick={"/"}
              className="allBtn w-[3.2rem] h-[3.25rem] text-xl rounded-md"
            >
              <span>
                <CiSearch size={25} className="md:hidden" />
              </span>
              <span className="hidden md:flex">Search</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const AboutContext = (props) => {
  const yAxis = props.aboutY;
  return (
    <>
      <div className="w-full md:w-[60%] lg:w-1/2 h-full flex flex-col gap-2 p-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px] z-20 ease-in-out duration-300">
        <h3 className="text-[#53c28b] font-extrabold text-xl">About us</h3>
        <span className="text-3xl font-bold">Our Experts Are the Finest</span>
        <div className="">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sequi
            totam animi deleniti reiciendis error veritatis delectus similique
            maxime cumque sapiente quasi, odit eaque earum ipsum illum nobis
            impedit minus non ipsa nihil quaerat. Fuga quasi asperiores nam
            accusamus officia quae laudantium vitae, laborum eius. Maiores
            assumenda architecto asperiores autem? Our Experts Are the Finest
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            quia laudantium quam ullam maiores? Laborum perspiciatis modi
            ducimus nemo natus laudantium nobis vero dolore commodi rerum cum
            recusandae voluptas corrupti deleniti debitis quidem maiores, culpa
            aspernatur? Nulla facilis totam repudiandae atque minima blanditiis,
            incidunt dignissimos natus eos fugit beatae laudantium officia,
            praesentium labore in, distinctio ex eligendi suscipit corrupti.
            Corporis deleniti natus eum eveniet quas !
          </p>
        </div>
      </div>
      <div className="w=full md:w-[40%] lg:w-1/2 h-full md:rounded-l-3xl overflow-hidden">
        <div className="w=full h-full z-10 -scale-x-100 scale-125 md:rounded-r-3xl overflow-hidden">
          <motion.div
            style={{
              y: yAxis,
              backgroundImage: `url(/aboutBanner.jpeg)`,
              opacity: "80%",
            }}
            className="w-full h-full bg-no-repeat bg-cover z-0 md:rounded-r-3xl"
          ></motion.div>
        </div>
      </div>
    </>
  );
};
