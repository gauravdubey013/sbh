import connect from "@/utils/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import Professional from "@/models/Professional";

export const POST = async (request) => {
  try {
    await connect();

    const data = await request.formData();

    const profileImg = data.get("profileImg");
    const resume = data.get("resume");
    const email = data.get("email");
    const gender = data.get("gender");
    const dob = data.get("dob");

    const service = data.get("service");
    const address = data.get("address");
    const zipCode = data.get("zipCode");
    const phone = data.get("phone");
    const bio = data.get("bio");
    const skillLevel = data.get("skillLevel");
    const workHistory = data.get("workHistory");
    const sLOne = data.get("sLOne");
    const sLTwo = data.get("sLTwo");

    // console.log("Request received:", request.body);

    let profileImgPath = "";
    let resumePath = "";

    if (profileImg) {
      const byteDataProfile = await profileImg.arrayBuffer();
      const bufferProfile = Buffer.from(byteDataProfile);
      profileImgPath = `./public/users/profiles/${
        email + "_" + profileImg.name
      }`;
      await writeFile(profileImgPath, bufferProfile);
    } else {
      profileImgPath = "noProfile";
    }

    if (resume) {
      const byteDataResume = await resume.arrayBuffer();
      const bufferResume = Buffer.from(byteDataResume);
      resumePath = `./public/users/resumes/${email + "_" + resume.name}`;
      await writeFile(resumePath, bufferResume);
    } else {
      resumePath = "noResume";
    }

    //working till here

    const newProfessional = new Professional({
      email,
      gender,
      dob,
      profileImgPath,
      service,
      address,
      zipCode,
      phone,
      bio,
      skillLevel,
      workHistory,
      resumePath,
      sLOne,
      sLTwo,
    });

    await newProfessional.save();

    return new NextResponse("Professional registered successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    // Check if the error is a duplicate key violation
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return new NextResponse("Email is already registered!", { status: 400 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
