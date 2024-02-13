import connect from "@/utils/db";
import User from "@/models/User";
import Professional from "@/models/Professional";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const data = await request.formData();

    const email = data.get("email");
    const profileImg = data.get("profileImg");
    const gender = data.get("gender");
    const dob = data.get("dob");
    const service = data.get("service");
    const address = data.get("address");
    const zipCode = data.get("zipCode");
    const phone = data.get("phone");
    const skillLevel = data.get("skillLevel");
    const workHistory = data.get("workHistory");
    const bioCheck = data.get("bio");
    const resume = data.get("resume");
    const sLOneCheck = data.get("sLOne");
    const sLTwoCheck = data.get("sLTwo");

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return new NextResponse("Register first!", { status: 400 });
    }
    const existingProf = await Professional.findOne({ email });
    if (existingProf) {
      return new NextResponse("Prof already exists!", { status: 401 });
    }

    var userID = `user_${userExists._id}`;
    const name = userExists.name || "name";
    let bio = bioCheck.trim() !== "" ? bioCheck : "NaN";
    let sLOne = sLOneCheck.trim() !== "" ? sLOneCheck : "NaN";
    let sLTwo = sLTwoCheck.trim() !== "" ? sLTwoCheck : "NaN";

    let profileImgPath = "noProfile";
    let resumePath = "noResume";

    if (profileImg && profileImg.name) {
      const byteDataProfile = await profileImg.arrayBuffer();
      const bufferProfile = Buffer.from(byteDataProfile);
      const profileImgPathPublic = `./public/users/profiles/${
        email + "_" + profileImg.name
      }`;
      await writeFile(profileImgPathPublic, bufferProfile);
      profileImgPath = `/users/profiles/${email + "_" + profileImg.name}`;
    }

    if (resume && resume.name) {
      const byteDataResume = await resume.arrayBuffer();
      const bufferResume = Buffer.from(byteDataResume);
      const resumePathPublic = `./public/users/resumes/${
        email + "_" + resume.name
      }`;
      await writeFile(resumePathPublic, bufferResume);
      resumePath = `/users/resumes/${email + "_" + resume.name}`;
    }

    const newProfessional = new Professional({
      userID,
      email,
      isVerified: "no",
      name,
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
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

// uploading gitHub logic
// async function uploadFileToGitHub(file, owner, repo, path) {
//   // const accessToken = process.env.GITHUB_ACCESS_TOKEN;
//   const accessToken = "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";
//   const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

//   const formData = new FormData();
//   formData.append("file", file);

//   const headers = new Headers();
//   headers.append("Authorization", `token ${accessToken}`);

//   const options = {
//     method: "PUT",
//     headers,
//     body: formData,
//   };
//   const response = await fetch(url, options);
//   if (!response.ok) {
//     return new NextResponse("Failed to upload file to GitHub", { status: 500 });
//     // throw new Error("Failed to upload file to GitHub");
//   }
//   return await response.json();
// }

// let profileImgPath = "noProfile";
// let resumePath = "noResume";
// if (profileImg) {
//   // Uploading profileImage to GitHub
//   const profileImgUploadResponse = await uploadFileToGitHub(
//     profileImg,
//     "gauravdubey013",
//     "sbh",
//     "public/users/profiles"
//   );
//   profileImgPath = profileImgUploadResponse.data.content.download_url;
// }

// if (resume) {
//   // Uploading resumeFile to GitHub
//   const resumeUploadResponse = await uploadFileToGitHub(
//     resume,
//     "gauravdubey013",
//     "sbh",
//     "public/users/resumes"
//   );
//   resumePath = resumeUploadResponse.data.content.download_url;
// }
