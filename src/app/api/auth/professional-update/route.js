import connect from "@/utils/db";
import Professional from "@/models/Professional";
// import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const data = await request.formData();

    // const profileImg = data.get("profileImg");
    // const resume = data.get("resume");
    const email = data.get("email");
    const updPhone = data.get("phone");
    const updSkillLevel = data.get("skillLevel");
    const updWorkHistory = data.get("workHistory");
    const updZipCode = data.get("zipCode");
    const updAddress = data.get("address");
    const updBio = data.get("bio");
    const updSLOne = data.get("sLOne");
    const updSLTwo = data.get("sLTwo");

    const existingProf = await Professional.findOne({ email });
    if (!existingProf) {
      return new NextResponse(
        "User already exists! - Invalid user! try again later",
        { status: 400 }
      );
    }

    if (/^\d{10}$/.test(updPhone)) existingProf.phone = updPhone;
    if (updSkillLevel) existingProf.skillLevel = updSkillLevel;
    if (updWorkHistory) existingProf.workHistory = updWorkHistory;
    if (updZipCode) existingProf.zipCode = updZipCode;
    if (updAddress) existingProf.address = updAddress;
    if (updBio) existingProf.bio = updBio;
    if (updSLOne) existingProf.sLOne = updSLOne;
    if (updSLTwo) existingProf.sLTwo = updSLTwo;

    await existingProf.save();
    return new NextResponse("Professional update successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
