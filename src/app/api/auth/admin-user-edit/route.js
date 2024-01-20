import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const data = await request.formData();

    const oldEmail = data.get("oldEmail");
    console.log(oldEmail);
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

    await existingUser.save();
    return new NextResponse("User update successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
