import connect from "@/utils/db";
import User from "@/models/User";
import DeletedUser from "@/models/DeletedUser";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const { email } = await request.json();

    const existingDeletedUser = await DeletedUser.findOne({ email });

    if (!existingDeletedUser) {
      return new NextResponse("User doesn't exists!", { status: 400 });
    }

    const newRestoreUser = new User({
      name: existingDeletedUser?.name ?? "name",
      signInWith: existingDeletedUser?.signInWith ?? "Email&Password",
      email,
      password: existingDeletedUser?.password ?? "pswd",
      role: existingDeletedUser?.role ?? "user",
    });
    await newRestoreUser.save();

    await DeletedUser.deleteOne({ email });

    return new NextResponse("User Restore successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
