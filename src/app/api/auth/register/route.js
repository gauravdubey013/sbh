import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstname, lastname, email, password, profCheckValue } =
    await request.json();

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Error : User already exists!", { status: 400 });
  }
  // convert password into hash-code
  const hashPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    name: firstname + " " + lastname,
    signInWith: "Email&Password",
    email,
    password: hashPassword,
    role: "user", //profCheckValue
  });

  try {
    await newUser.save();
    return new NextResponse("User Registered!", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error : ", error, {
      status: 500,
    });
  }
};
