import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email });

  // convert password into hash-code
  const hashPassword = await bcrypt.hash(password, 5);
  existingUser.password = hashPassword;

  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;

  try {
    await existingUser.save();

    return new NextResponse("Updated the Password!", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error : " + error, {
      status: 500,
    });
  }
};
