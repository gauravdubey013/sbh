"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { slides } from "@/context/data";

const Carousel = (props) => {
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
            key={slide.id}
            className={`w-auto ${props.defH} ${props.mdH} ${props.lgH} relative ease-in-out duration-300 overflow-hidden rounded-lg`}
          >
            {/* translate-y-8 lg:translate-y-12   border-[1px] border-solid border-[#53c28b] border-opacity-90 */}
            <div
              className={`w-full h-full ${props.bg} scale-95 hover:scale-100 shadow-lg duration-300 rounded-lg flex flex-col overflow-hidden`}
            >
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
                <div className="fontFam w-full h-full z-10 -translate-y-20 lg:-translate-y-16 bg-transparent text-black bottom-0 rounded-lg p-2 overflow-hidden flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">Name chomu</h2>
                  <span className="text-sm line-clamp-3 -mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    quisquam saepe quae dolorem distinctio optio perspiciatis
                    consequuntur tempora labore eos.
                  </span>
                  <div className="w-full h-auto flex flex-row lg:flex-col gap-1 bottom-0">
                    <div className="review w-[4rem] lg:w-full h-[3.25rem] bg-[#53c28b] rounded-3xl"></div>
                    <Link
                      href={props.onClickBtn}
                      className="allBtn w-full h-[3.25rem] text-sm rounded-3xl"
                    >
                      View more
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="w-full z-20 h-auto rounded-t-lg flex justify-center ease-in-out duration-300">
                
              </div> */}

              {/* <Image
                src={slide.url}
                alt="url"
                fill="true"
                className="rounded-md hover:scale-105"
              />
              <div className="text-[#53c28b] absolute w-full h-auto bottom-0 translate-y-5 rounded-b-md">
                ok
              </div> */}
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
