"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
// import Link from "next/link";

const AdBannerCarousel = (props) => {
  let { bg, btext, abdData } = props;

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
        {abdData.map((adb) => (
          <div
            className={`w-auto ${props.defH} ${props.mdH} ${props.lgH} relative ease-in-out duration-300 overflow-hidden rounded-lg`}
          >
            {/* translate-y-8 lg:translate-y-12   border-[1px] border-solid border-[#53c28b] border-opacity-90 */}
            <div
              key={adb.id}
              className={`w-full h-full ${bg} relative scale-95 hover:scale-100 shadow-lg duration-300 rounded-lg overflow-hidden`}
            >
              <div className="w-auto h-auto absolute text-blue-500 bg-[#00000026] right-0 rounded-l-lg z-20 px-2 hover:underline">
                <span className="w-full h-full hover:scale-110 active:scale-75"></span>
                Ad
              </div>
              <Image
                // key={adb.id}
                src={adb.img}
                alt={adb.alt}
                // fill="true"
                width={800}
                height={800}
                className=" w-full h-full shadow-md z-10"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default AdBannerCarousel;

AdBannerCarousel.defaultProps = {
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
