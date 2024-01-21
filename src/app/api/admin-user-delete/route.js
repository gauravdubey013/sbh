import connect from "@/utils/db";
import User from "@/models/User";
import DeletedUser from "@/models/DeletedUser";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const { email } = await request.json();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(
        "User doesn't exists! - Invalid user! try again later",
        { status: 400 }
      );
    }

    const newDeletedUser = new DeletedUser({
      name: existingUser?.name ?? "name",
      signInWith: "Email&Password",
      email,
      password: existingUser?.password ?? "pswd",
      role: existingUser?.role ?? "user",
    });
    await newDeletedUser.save();

    await User.deleteOne({ email });

    // await existingUser.save();
    return new NextResponse("User Deleted successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
