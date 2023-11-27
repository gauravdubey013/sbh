import Link from "next/link";
import React from "react";

const Footer = (props) => {
  return (
    <>
      <footer>
        <div className="footer border-t-[.5px] rounded-md border-[#53c28b]/30 flex flex-col sm:flex-row justify-between items-center gap-1 p-2 ease-in-out duration-300 md:duration-500">
          <div className="row text-[gray] flex flex-row gap-3 sm:scale-75 sm:hidden duration-300 ease-in-out">
            {footer.map((icon) => (
              <a key={icon.id} href={icon.url} className="icon">
                <i className={icon.className} />
              </a>
            ))}
          </div>
          <div className="row text-[gray] flex flex-row gap-3 duration-300 sm:scale-75">
            <Link href={"/"} className=" text-3xl logoTitle">
              {props.title}
            </Link>
          </div>
          <span className="row text-[gray] flex flex-row gap-3 duration-300 sm:scale-75 text-sm sm:ml-3">
            <span className="scale-125 -mr-2.5">©</span>2023 {props.title}
            <span className="scale-150 -mr-1 -ml-1">||</span>All rights
            reserved.
          </span>
          <div className="row text-[gray] sm:scale-75 hidden sm:flex flex-row gap-3 duration-300 ease-in-out">
            {footer.map((icon) => (
              <a key={icon.id} href={icon.url} className="icon">
                <i className={icon.className} />
              </a>
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
      "fa fa-facebook text-blue-500 opacity-[0.6] hover:opacity-[1] hover:text-blue-500",
    url: "/",
  },
  {
    id: 2,
    className:
      "fa fa-instagram text-pink-600 opacity-[0.6] hover:opacity-[1] hover:text-pink-600",
    url: "/",
  },
  {
    id: 3,
    className:
      "fa fa-twitter text-blue-400 opacity-[0.6] hover:opacity-[1] hover:text-blue-400",
    url: "/",
  },
  {
    id: 4,
    className:
      "fa fa-youtube text-red-700 opacity-[0.6] hover:opacity-[1] hover:text-red-700",
    url: "/",
  },
];
