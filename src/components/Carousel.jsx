"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { slides } from "@/context/data";
// import { slides } from "@/context/data";

const Carousel = (props) => {
  let { profDBCollectionData, bg, defH, mdH, lgH, profile } = props;

  const [data, setData] = useState([]);
  useEffect(() => {
    if (profDBCollectionData) {
      // console.log(data ?? "email");
      setData(profDBCollectionData);
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
                className={`w-full h-full ${bg} scale-95 border border-[#53c28b] hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col items-center justify-center overflow-hidden`}
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
                className={`w-full h-full ${bg} scale-95 hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col items-center justify-center overflow-hidden`}
              >
                <div
                  className={`${profile} w-full h-full bbg border border-[#53c28b] rounded-lg -mb-[80px]`}
                >
                  <div className="w-full h-auto -translate-y-[56px] lg:-translate-y-[46.5px] flex justify-center">
                    <Image
                      src={slide?.profileImgPath ?? "/assets/bg6.png"}
                      alt="url"
                      // fill="true"
                      width={100}
                      height={100}
                      className=" w-[8rem] h-[8rem] bbg scale-75 lg:scale-90 rounded-full shadow-md ease-in-out duration-500"
                    />
                  </div>
                  <div className="fontFam w-full h-auto z-10 -translate-y-20 lg:-translate-y-16 bg-transparent bottom-0 rounded-lg p-2 overflow-hidden flex flex-col gap-1">
                    <h2 className="text-md md:text-lg font-semibold">
                      {slide?.name ?? "Name Rakhsita"}
                    </h2>
                    <span className="h-[4rem] text-sm line-clamp-3 -mt-2">
                      {slide?.bio !== "null" ? slide?.bio ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos." : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quisquam saepe quae dolorem distinctio optio perspiciatis consequuntur tempora labore eos."}
                    </span>
                    <div className="w-full h-auto flex flex-row lg:flex-col gap-[1px] md:gap-1 bottom-0">
                      <div className="review w-[4rem] lg:w-full h-[3rem] bg-[#53c28b] rounded-3xl flex gap-1 items-center justify-center">
                        {slide?.skillLevel}
                        <span className="hidden lg:flex"> Years of Exp.</span>
                      </div>
                      <Link
                        href={`/profile/${slide?.email ?? "dubeygaurav520@gmail.com"}`}
                        className="allBtn w-full h-[3rem] text-sm rounded-3xl text-center"
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
