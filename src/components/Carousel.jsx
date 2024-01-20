"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { slides } from "@/context/data";
import Image from "next/image";
import Link from "next/link";

const Carousel = (props) => {
  let { bg, btext } = props;

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
    <div>
      <Slider {...settings} className="rounded-lg bg-whi">
        {slides.map((slide) => (
          <div
            className={`w-auto ${props.defH} ${props.mdH} ${props.lgH} relative ease-in-out duration-300 overflow-hidden rounded-lg`}
            key={slide.id}
          >
            {/* translate-y-8 lg:translate-y-12   border-[1px] border-solid border-[#53c28b] border-opacity-90 */}
            <div
              className={`w-full h-full ${bg} scale-95 hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col items-center justify-center overflow-hidden`}
            >
              {" "}
              {btext}
              <div
                className={`${props.profile} w-full h-full bg-white rounded-lg translate-y-[40px]`}
              >
                <div className="w-full h-auto -translate-y-[56px] lg:-translate-y-[46.5px] flex justify-center">
                  <Image
                    src={"/assets/bg6.png"}
                    alt="url"
                    // fill="true"
                    width={100}
                    height={100}
                    className=" w-[8rem] h-[8rem] scale-75 lg:scale-90 rounded-full shadow-md ease-in-out duration-500"
                  />
                </div>
                <div className="fontFam w-full h-auto z-10 -translate-y-20 lg:-translate-y-16 bg-transparent text-black bottom-0 rounded-lg p-2 overflow-hidden flex flex-col gap-1">
                  <h2 className="text-md md:text-lg font-semibold">
                    Name Rakhsita
                  </h2>
                  <span className="text-sm line-clamp-3 -mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    quisquam saepe quae dolorem distinctio optio perspiciatis
                    consequuntur tempora labore eos.
                  </span>
                  <div className="w-full h-auto flex flex-row lg:flex-col gap-1 bottom-0">
                    <div className="review w-[4rem] lg:w-full h-[3.25rem] bg-[#53c28b] rounded-3xl flex items-center justify-center">
                      review
                    </div>
                    <Link
                      href={`${props.onClickBtn}`}
                      className="allBtn w-full h-[3.25rem] text-sm rounded-3xl flex items-center justify-center"
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
    </div>
  );
};
export default Carousel;

Carousel.defaultProps = {
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

function Arrow(props) {
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
