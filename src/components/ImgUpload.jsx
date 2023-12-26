"use client";
import React, { useState } from "react";

const ImgUpload = () => {
  const [profile, setProfile] = useState();
  const [fileResume, setFileResume] = useState();
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(profile);
    const data = new FormData();
    data.set("fileProfile", profile);
    data.set("fileResume", fileResume);
    let result = await fetch("api/upload", {
      method: "POST",
      body: data,
    });
    console.log(result);
  };
  return (
    <div className="w-full h-screen">
      <form
        onSubmit={handelSubmit}
        className="w-full h-full flex flex-col items-center justify-center gap-2 text-xl"
      >
        upload image :
        <input
          type="file"
          name="img"
          onChange={(e) => setProfile(e.target.files?.[0])}
          className="w-auto h-[3rem] cursor-pointer"
        />
        upload resume :
        <input
          type="file"
          name="img"
          onChange={(e) => setFileResume(e.target.files?.[0])}
          className="w-auto h-[3rem] cursor-pointer"
        />
        <button type="submit" className="allBtn w-[7rem] h-[3rem] rounded-3xl">
          Upload
        </button>
      </form>
    </div>
  );
};

export default ImgUpload;
