import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Professional from "@/models/Professional";

export const POST = async (request) => {
  try {
    await connect();

    const data = await request.formData();

    const oldEmail = data.get("oldEmail");

    const updEmail = data.get("email");
    const updName = data.get("name");
    const updRole = data.get("role");

    const existingUser = await User.findOne({ email: oldEmail });

    if (!existingUser) {
      return new NextResponse(
        "User doesn't exists! - Invalid user! try again later",
        { status: 400 }
      );
    }
    if (updName) existingUser.name = updName;
    if (updEmail) existingUser.email = updEmail;
    if (updRole) existingUser.role = updRole;

    if (existingUser.role == "professional") {
      const existingProf = await Professional.findOne({ email: oldEmail });
      if (updName) existingProf.name = updName;
      await existingProf.save();
    }

    await existingUser.save();
    return new NextResponse("User update successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
