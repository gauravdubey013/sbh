import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function POST(req) {
  const data = await req.formData();
  const fileProfile = data.get("fileProfile");
  const fileResume = data.get("fileResume");

  if (!fileProfile || !fileResume) {
    return NextResponse.json({ message: "no img found", success: false });
  }

  if (fileProfile) {
    const byteDataProfile = await fileProfile.arrayBuffer();
    const bufferProfile = Buffer.from(byteDataProfile);
    const pathProfile = `./public/users/profiles/${
      "user@gmail.com" + "_" + fileProfile.name
    }`;
    await writeFile(pathProfile, bufferProfile);
  }
  if (fileResume) {
    const byteDataResume = await fileResume.arrayBuffer();
    const bufferResume = Buffer.from(byteDataResume);
    const pathResume = `./public/users/resumes/${
      "user@gmail.com" + "_" + fileResume.name
    }`;
    await writeFile(pathResume, bufferResume);
  }

  return NextResponse.json({
    message: "img & resume uploaded",
    success: true,
    pathProfile,
    pathResume,
  });
}
