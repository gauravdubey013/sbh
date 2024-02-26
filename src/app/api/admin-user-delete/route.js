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

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(
        "User doesn't exists! - Invalid user! try again later",
        { status: 400 }
      );
    }

    const newDeletedUser = new DeletedUser({
      name: existingUser?.name ?? "name",
      signInWith: existingUser?.signInWith ?? "Email&Password",
      email,
      password: existingUser?.password ?? "pswd",
      role: existingUser?.role ?? "user",
    });
    await newDeletedUser.save();

    await User.deleteOne({ email });

    const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${existingUser?.name}!!</h1>
        <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">We have <b style="color: #53c28b;"><u>Blocked</u></b> your account <br/>To unblock the account, contact us here </span>
        <a href="https://sbh.vercel.app/#contact" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Contact Us</a>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email ?? "gauravd8976@gmail.com",
      subject: "SkillBeHired - Blocked Account",
      html: body,
    });

    return new NextResponse("User Deleted successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
