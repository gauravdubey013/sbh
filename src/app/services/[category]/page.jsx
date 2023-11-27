"use client";
import React from "react";
import { notFound } from "next/navigation";
import { slides } from "../../../context/data";
import Image from "next/image";

const Category = ({ params }) => {
  // const pd = getData(params.category);
  return (
    <>
      <div className="w-full h-screen p-[20px] sm:px-[65px] md:px-[65px] lg:px-[200px] ease-in-out duration-300">
        <div className="flex flex-row justify-between gap-2">
          <div className="w-[60%] h-full border-[1px]">
            <h1 className="text-2xl font-bold">{params.category}</h1>
            <span></span>
          </div>
          <div className="w-[40%] h-auto border-[1px] flex justify-center items-center">
            <Image
              src={"/bg6.jpeg"}
              alt="url"
              // fill="true"
              width={100}
              height={100}
              className=" w-[14rem] h-[14rem] scale-75 lg:scale-90 shadow-md ease-in-out duration-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

// Welcome {params.category}
