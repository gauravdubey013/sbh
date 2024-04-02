"use client";

import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slides } from "@/context/data";

const AdBannerCarousel = (props) => {
  let {
    defH,
    mdH,
    lgH,
    bg,
    abdData,
    slidesToShowDefault,
    slidesToScroll,
    autoplay,
    autoplaySpeed,
    slidesToShow1024,
    slidesToShow768,
    slidesToShow640,
  } = props;

  const settings = {
    dots: false,
    slidesToShow: slidesToShowDefault,
    slidesToScroll: slidesToScroll,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: true,
    infinite: true,
    speed: props.speed,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow1024,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slidesToShow768,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: slidesToShow640,
        },
      },
    ],
    centerPadding: "60px",
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };
  return (
    <div>
      <Slider {...settings} className="rounded-lg">
        {!abdData[0] &&
          slides.map((slide) => (
            <div
              key={slide.id}
              className={`w-auto ${defH} ${mdH} ${lgH} ease-in-out duration-300 overflow-hidden rounded-lg`}
            >
              <div
                className={`w-full h-full bbg animate-pulse scale-95 border border-[#53c28b] hover:scale-100 shadow-lg duration-200 rounded-lg flex flex-col items-center justify-center overflow-hidden`}
              >Loading...</div>
            </div>
          ))}
        {abdData && abdData.map((adb) => (
          <Link key={adb._id}
            href={adb.redirectTo} target="_blank"
            className={`w-auto ${defH} ${mdH} ${lgH} relative ease-in-out duration-300 overflow-hidden rounded-lg`}
          >
            <div
              className={`w-full h-full ${bg} relative scale-95 hover:scale-100 shadow-lg duration-300 rounded-lg overflow-hidden`}
            >
              <div className="w-auto h-auto absolute text-xs text-blue-500 bg-[#00000026] right-0 rounded-l-lg z-20 px-2 hover:underline">
                <span className="w-full h-full hover:scale-110 active:scale-75">
                  Ad
                </span>
              </div>
              <Image
                src={adb.bannerUrl ?? ""}
                alt={adb.bannerAlt}
                // fill="true"
                priority={true}
                width={800}
                height={800}
                className=" w-full h-full shadow-md z-10"
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};
export default AdBannerCarousel;

AdBannerCarousel.defaultProps = {
  abdData: [],
  refDB: false,
  slidesToScroll: 3,
  autoplay: false,
  autoplaySpeed: 1000,
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

export function Arrow(props) {
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
}
