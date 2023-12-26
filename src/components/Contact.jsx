import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <>
      <h3 className="text-[#53c28b] font-extrabold text-xl p-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px]">
        Contact us
      </h3>
      <div className="fontFam text-[40px] md:text-[45px] lg:text-[60px] text-center">
        Let&apos;s Keep in Touch
      </div>
      <div className="w-full h-[75%] flex flex-col md:flex-row ease-in-out duration-300">
        <div className="w-full lg:w-1/2 h-1/2 md:h-full flex justify-center items-center ease-in-out duration-300">
          <div className="imgCont w-full h-[350px] lg:h-[500px] relative opacity-[90%] ease-in-out duration-300">
            <Image
              src="/assets/contact.png"
              alt="contactImg"
              fill={true}
              sizes="(max-width: full) (max-width: full)"
              priority={true}
              //   layout="responsive"
              // width={500}
              // height={500}
              className="contactImg w-auto h-auto absolute object-contain animate-[moveCon_3s_infinite_ease_alternate]"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-1/2 md:h-full ease-in-out duration-300 px-[20px] sm:px-[30px] md:px-[45px] lg:px-[80px] flex items-center mt-5">
          <form
            method="get"
            className="w-full h-full flex flex-col gap-6 justify-center"
          >
            <div className="w-full h-[54px] flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="allFormInput h-[52px]"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="allFormInput h-[52px]"
              />
            </div>
            <input
              type="text"
              placeholder="Email*"
              className="allFormInput h-[52px]"
            />
            <textarea
              cols={30}
              rows={5}
              className="allFormInput"
              placeholder="Leave us a message..."
            />
            <button
              type="submit"
              className="allBtn w-[7.75rem] h-[3.25rem] text-xl rounded-3xl"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
