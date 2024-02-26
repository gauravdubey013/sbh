import connect from "@/utils/db";
import User from "@/models/User";
import DeletedUser from "@/models/DeletedUser";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

   const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${existingDeletedUser?.name}!!</h1>
    <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">We have <b style="color: #53c28b;"><u>Un-Blocked</u></b> your account <br/>Login back</span>
    <a href="https://sbh.vercel.app/signIn" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Login SkillBeHired</a>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to:  "gauravd8976@gmail.com",
      subject: "SkillBeHired - Un-Blocked Account",
      html: body,
    });

    return new NextResponse("User Restore successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
