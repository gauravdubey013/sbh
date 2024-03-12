"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { FaMapLocationDot } from "react-icons/fa6";
import { aboutUs, adBanner } from "@/context/data";
import AdBannerCarousel from "./AdBannerCarousel";
import ServiceCompo from "@/components/ServiceCompo";
import Contact from "./Contact";
import { useRouter } from "next/navigation";

export default function HeroTest() {
  let ref = useRef(null);
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  let by = useTransform(scrollYProgress, [0, 1], ["0%", "250%"]);
  let opacity = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  let scale = useTransform(scrollYProgress, [0, 1], ["100%", "150%"]);

  let ay = useTransform(scrollYProgress, [0, 1], ["-160%", "120%"]);
  return (
    <>
      <main className="-translate-y-[66px] md:-translate-y-[97px] -mb-[66px] md:-mb-[96px] overflow-hidden border-px]">
        {/* top-Banner-bg */}
        <section ref={ref.current} className="relative border-[px]">
          <motion.div
            className="inset-0 absolute z-10 backdrop-filter backdrop-blur-[8px]"
            style={{
              y: by,
            }}
          />
          <motion.div
            className="md:hidden inset-0 absolute z-0"
            style={{
              backgroundImage: `url(/assets/heroBannerMB.gif)`,
              backgroundPosition: "bottom",
              backgroundSize: "cover",
              y: by,
              scale,
              opacity,
            }}
          ></motion.div>
          <motion.div
            className="hidden md:flex inset-0 absolute z-0"
            style={{
              backgroundImage: `url(/assets/heroBannerPC.gif)`,
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
        <section
          className="animate-fade-in-down bbg relative z-20 border-[px] -mb-[3.8rem]"
          ref={ref.current}
        // layoutEffect={false}
        >
          <div className="bg-transparent -translate-y-16">
            <AdBannerCarousel
              bg="bg-[#53c28b]"
              abdData={adBanner}
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
              slidesToShow640={1}
            />
          </div>
        </section>
        <section className="w-full h-auto z-30 bbg relative border-[px]">
          {/* service */}
          <section id="service" className="animate-fade-in-down">
            <div
              id="services"
              className="w-full h-auto p-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px]"
            >
              {/* slider */}
              <h3 className="text-[#53c28b] font-extrabold text-xl">Service</h3>
              <div className="-mx-[20px]">
                <ServiceCompo />
              </div>
            </div>
          </section>
          {/* about-section */}
          <section
            id="about"
            className="w-full h-screen flex flex-col md:flex-row"
          >
            <AboutContext aboutY={ay} />
          </section>
          {/* contact-section */}
          <section id="contact" className="h-auto mt-1 mb-4" ref={ref.current}>
            <Contact />
          </section>
        </section>
      </main>
    </>
  );
}

// export default home;

export const HeroContext = () => {
  const router = useRouter();
  const [service, setService] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  // console.log(service, zipCode);

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if ((service && zipCode) == "") {
      return setError("Please provide the both search input!");
    }
    setError("");
    return router.push(`/search-professional/${service}/${zipCode}`);
  }
  return (
    <>
      <div className="w-full h-[70vh] md:h-[101vh] bg-transparent relative z-20 flex flex-col justify-center p-[20px] sm:px-[65px] md:px-[65px] lg:px-[200px] ease-in-out duration-300">
        <div className="text-[30px] md:text-[35px] lg:text-[40px] font-bold leading-[36px] md:leading-[40px] lg:leading-[45px] ease-in-out duration-500">
          <span className="fontFam animate-slideDown text-[#53c28b]">
            Find the perfect <br /> professional for you
          </span>
        </div>
        <span className="animate-fade-in-down text-[20px] text-[#e6e7ec]/90">
          Get free quotes within minutes
        </span>
        <form onSubmit={handleSearchSubmit} className="animate-fade-in-down flex flex-col sm:flex-row gap-1 sm:gap-0 ease-in-out duration-300">
          <select
            name="service"
            value={service}
            // defaultValue=""
            onChange={(e) => setService(e.target.value)}
            placeholder="Freelancer Category"
            // required
            className="w-full md:w-[18.8rem] lg:w-[22.75rem] h-[3.25rem] p-2 placeholder:text-[#fff]/[0.9] text-[#fff]/[0.9] outline-none bg-transparent rounded-md sm:rounded-r-none border-[2px] border-solid border-[#e6e7ec]/50 shadow-sm hover:border-[#53c28b] focus:border-b-[#53c28b] hover:placeholder:text-[#53c28b] ease-in-out duration-500"
          >
            <option value="" disabled hidden>
              What service are you looking for?
            </option>
            <option className="ddl" value="writing">Writer</option>
            <option className="ddl" value="plumber">Plumber</option>
            <option className="ddl" value="painters">Painters</option>
            <option className="ddl" value="gardener">Gardener</option>
            <option className="ddl" value="electrician">Electrician</option>
            <option className="ddl" value="health_coach">Health Coach</option>
            <option className="ddl" value="dj_musician">DJ / Musician</option>
            <option className="ddl" value="house_helper">House Helper</option>
            <option className="ddl" value="nutritionist">Nutritionist</option>
            <option className="ddl" value="event_planner">Event Planner</option>
            <option className="ddl" value="house_cleaner">House Cleaner</option>
            <option className="ddl" value="graphic_design">Graphic Design</option>
            <option className="ddl" value="yoga_instructor">Yoga Instructor</option>
            <option className="ddl" value="wedding_planner">Wedding Planner</option>
            <option className="ddl" value="web_development">Web Development</option>
            <option className="ddl" value="personal_trainer">Personal Trainer</option>
            <option className="ddl" value="party_entertainer">Party Entertainer</option>
            <option className="ddl" value="interior_decorator">Interior Decorator</option>
            <option className="ddl" value="mental_health_counselor">Mental Health Counselor</option>
            <option className="ddl" value="photographer_videographer">Photographer / Videographer</option>
          </select>

          <div className="flex gap-1 items-center">
            <div className="locIcon w-[12rem] h-[3.25rem] cursor-text hover:border-b-[2px] hover:border-b-[#53c28b] flex items-center px-2 rounded-md sm:rounded-l-none border-[2px] border-solid border-[#e6e7ec]/50 shadow-sm ease-in-out duration-500">
              <FaMapLocationDot size={20} className="" />
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/[^\d]/g, ""))}
                // required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSearchSubmit(e);
                  }
                }}
                placeholder="Pin Code"
                className="w-[90%] h-full bg-transparent outline-none p-2 placeholder:text-[#fff]/[0.9] text-[#fff]/[0.9] hover:placeholder:text-[#53c28b]"
              />
            </div>
            {/* href={`/search-professional/${service}/${zipCode}`} */}
            <button type="submit" className="allBtn w-[3rem] md:w-[6rem] h-[3.25rem] text-xl rounded-md">
              <CiSearch size={25} className="md:hidden font-bold" />
              <span className="hidden md:flex">Search</span>
            </button>
          </div>
        </form>
        <span className="w-auto h-[1.5rem] flex items-end overflow-hidden">
          {error && <span className="text-red-500 animate-slideDown">{error}</span>}
        </span>
      </div>
    </>
  );
};

export const AboutContext = (props) => {
  const yAxis = props.aboutY;
  return (
    <>
      <div className="w-full md:w-[60%] lg:w-1/2 h-full flex flex-col gap-2 p-[20px] sm:px-[30px] md:px-[45px] lg:px-[35px] md:translate-x-7 border-[] ease-in-out duration-300 overflow-hidden">
        <h3 className="text-[#53c28b] font-extrabold text-xl">About us</h3>
        <div className="w-full h-auto scrollDiv overflow-y-scroll scroll-snap-type-x-mandatory">
          <span className="text-2xl font-bold">
            Welcome to SkillBeHired, where skills take center stage and talent
            finds its spotlight!
          </span>
          <div className="flex flex-col gap-1">
            <h4 className="text-xl font-bold text-[#53c28b]">Our Mission</h4>
            <p className="text-md p-1 md:px-2 text-justify">
              At SkillBeHired, our mission is to revolutionize the way job
              seekers and clients connect in the professional world. We
              understand the evolving landscape of the job market, where the
              demand for skilled professionals is at an all-time high. However,
              traditional hiring practices often prioritize formal
              certifications, leaving many talented individuals overlooked. Our
              platform is designed to disrupt this status quo by putting skills
              at the forefront.
            </p>
          </div>
          <h4 className="text-xl font-bold text-[#53c28b]">
            Why SkillBeHired?
          </h4>
          {aboutUs.map((au) => (
            <div key={au.id} className="flex flex-col gap-1">
              <h4 className="text-lg font-semibold text-[#53c28b]">
                {au.header} :
              </h4>
              <p className="text-md p-1 md:px-2 text-justify">{au.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[40%] lg:w-1/2 h-full md:rounded-l-3xl overflow-hidden">
        <div className="w=full h-full z-10 -scale-x-100 scale-125 md:rounded-r-3xl overflow-hidden">
          <motion.div
            style={{
              y: yAxis,
              backgroundImage: `url(/assets/aboutBanner.jpeg)`,
              opacity: "80%",
            }}
            className="w-full h-full scale-125 md:scale-100 bg-no-repeat bg-cover z-0 md:rounded-r-3xl"
          ></motion.div>
        </div>
      </div>
    </>
  );
};
