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
    // console.log(existingProf);
    if (!existingProf) {
      return new NextResponse(
        "User already exists! - Invalid user! try again later",
        { status: 400 }
      );
    }

    if (updPhone.trim() !== "" && updPhone.length !== 10) {
      existingProf.phone = updPhone;
    }
    if (updSkillLevel.trim() !== "") {
      existingProf.skillLevel = updSkillLevel;
    }
    if (updWorkHistory.trim() !== "") {
      existingProf.workHistory = updWorkHistory;
    }
    if (updZipCode.trim() !== "") {
      existingProf.zipCode = updZipCode;
    }
    if (updAddress.trim() !== "") {
      existingProf.address = updAddress;
    }
    if (updBio.trim() !== "") {
      existingProf.bio = updBio;
    }
    if (updSLOne.trim() !== "") {
      existingProf.sLOne = updSLOne;
    }
    if (updSLTwo.trim() !== "") {
      existingProf.sLTwo = updSLTwo;
    }

    await existingProf.save();
    return new NextResponse("Professional update successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
