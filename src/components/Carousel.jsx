"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { slides } from "@/context/data";

const Carousel = (props) => {
  const { profDBCollectionData, defH, mdH, lgH } = props;

  const [data, setData] = useState([]);
  useEffect(() => {
    if (profDBCollectionData) {
      // console.log(data ?? "email");
      setData(profDBCollectionData.filter(profService => profService.isVerified !== "no"));
    }
  }, [profDBCollectionData]);
  const settings = {
    dots: false,
    slidesToShow: props.slidesToShowDefault,
    slidesToScroll: props.slidesToScroll,
    autoplay: props.autoplay,
    autoplaySpeed: props.autoplaySpeed,
    pauseOnHover: true,
    infinite: true,
    speed: props.speed,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: props.slidesToShow1024,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: props.slidesToShow768,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: props.slidesToShow640,
        },
      },
    ],
    centerPadding: "60px",
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };
  return (
    <>
      <Slider {...settings} className="w-full h-auto rounded-lg">
        {!data[0] &&
          slides.map((slide) => (
            <div
              className={`w-auto ${defH} ${mdH} ${lgH} ease-in-out duration-300 overflow-hidden rounded-lg`}
              key={slide._id}
            >
              <div
                className={`w-full h-full bbg animate-pulse scale-95 border border-[#53c28b] hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col items-center justify-center overflow-hidden`}
              >Loading...</div>
            </div>
          ))}

        {data &&
          data.map((slide) => (
            <div
              className={`w-auto ${defH} ${mdH} ${lgH} borde ease-in-out duration-300 overflow-hidden rounded-lg`}
              key={slide._id}
            >
              <div
                className={`w-full h-full relative bbg scale-95 borde border-[#53c28b] hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col items-center justify-end overflow-hidden`}
              >
                <div className="absolute top-0 z-20 w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] bbg rounded-full overflow-hidden">
                  <Image
                    src={slide?.profileImgPath ?? "/assets/bg6.png"}
                    alt="prof-profile"
                    // fill="true"
                    width={100}
                    height={100}
                    className=" w-full h-full bbg shadow-md"
                  />
                </div>
                <div className="w-full h-[85%] md:h-[80%] z-10 border border-[#53c28b] rounded-lg flex items-end overflow-hidden">
                  <div className="w-full h-[80%] md:h-[77%] relative rounded-lg px-2 overflow-hidden">
                    <h2 className="text-sm md:text-lg font-semibold">
                      {slide?.name ?? "name"}
                    </h2>
                    <div className="h-[2.3rem] md:h-[2rem] text-sm mb-[4px]"><span className="text-[#53c28b]">Service : </span>{slide?.service ?? "service"}</div>
                    <span className="h-[4rem] text-[12px] md:text-sm line-clamp-1 md:line-clamp-3">
                      {slide?.bio !== "null" ? slide?.bio ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos." : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos."}
                    </span>
                    <div className="absolute w-full h-[2.3rem] md:h-auto scale-95 bbg flex flex-row lg:flex-col gap-[1px] md:gap-1 items-center justify-center bottom-0 -ml-2 md:mb-1">
                      <div className="review w-[3rem] lg:w-full h-[2rem] bg-[#53c28b] rounded-3xl flex gap-1 items-center justify-center">
                        {slide?.skillLevel ?? "experience"}
                        <span className="hidden lg:flex"> Years of Exp.</span>
                      </div>
                      <Link
                        href={`/profile/${slide?.email ?? "dubeygaurav520@gmail.com"}`}
                        className="allBtn w-full h-[2rem] text-sm rounded-3xl text-center"
                      >
                        View more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </>
  );
};
export default Carousel;

Carousel.defaultProps = {
  slidesToScroll: 2,
  autoplay: false,
  autoplaySpeed: 2500,
  speed: 900,
  slidesToShowDefault: 6,
  slidesToShow640: 3,
  slidesToShow768: 4,
  slidesToShow1024: 5,
  defH: "h-[15rem]",
  mdH: "md:h-[14.5rem]",
  lgH: "lg:h-[20rem]",
  profile: "",
  onClickBtn: "/",
};

export const Arrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        borderRadius: "50%",
        width: "1.1rem",
        height: "1.1rem",
        background: "#53c28b",
        boxShadow: "0 0 30px rgb(0 0 0 / 50%)",
        display: "flex",
        justifyContent: "center",
      }}
      onClick={onClick}
    />
  );
};
