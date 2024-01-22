import Link from "next/link";
import React from "react";

const Footer = (props) => {
  return (
    <>
      <footer>
        <div className="footer border-t-[.5px] rounded-md border-[#53c28b]/30 flex flex-col sm:flex-row justify-between items-center gap-1 p-2 ease-in-out duration-300 md:duration-500">
          <div className="row text-[gray] flex flex-row gap-3 sm:scale-90 sm:hidden duration-300 ease-in-out">
            {footer.map((icon) => (
              <Link
                key={icon.id}
                href={icon.url}
                target="_blank"
                className="icon"
              >
                <i className={icon.className} />
              </Link>
            ))}
          </div>
          <div className="row text-[gray] flex flex-row gap-3 duration-300 sm:scale-75">
            <Link href={"/"} className=" text-3xl logoTitle">
              {props.title}
            </Link>
          </div>
          <span className="row text-[gray] flex flex-row gap-3 duration-300 sm:scale-75 text-sm sm:ml-3">
            <span className="scale-125 -mr-2.5">©</span>2023 {props.title}
            <span className="scale-150 -mr-1 -ml-1">||</span>All rights are
            reserved by {props.rights}.
          </span>
          <div className="row text-[gray] sm:scale-90 hidden sm:flex flex-row gap-3 duration-300 ease-in-out">
            {footer.map((icon) => (
              <Link
                key={icon.id}
                href={icon.url}
                target="_blank"
                className="icon"
              >
                <i className={icon.className} />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

const footer = [
  {
    id: 1,
    className:
      "fa fa-github text-blue-500 opacity-[0.6] hover:opacity-[1] hover:text-[gray] hover:scale-110",
    url: "https://github.com/gauravdubey013",
  },
  {
    id: 2,
    className:
      "fa fa-instagram text-pink-600 opacity-[0.6] hover:opacity-[1] hover:text-pink-600",
    url: "https://www.instagram.com/silent_way19",
  },
];
