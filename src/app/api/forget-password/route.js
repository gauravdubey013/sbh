import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { SendEmailLink } from "../../../../emails/SendEmailLink";
// import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);

connect();

export async function POST(request) {
  const { email } = await request.json();

  // checking user email
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return new NextResponse("Error : This e-mail doesn't exists!", {
      status: 400,
    });
  }

  // generate random string
  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `${process.env.HOSTNAME}/reset-password/${resetToken}`;

  const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${existingUser.firstname}!!</h1>
  <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">To Reset the password : </span>
  <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Click me</a>
  <h3 style="color: #ccc;">And if it wasn't you, then <u>ignore it!</u></h3>
  `;

  console.log(resetToken);

  try {
    await existingUser.save();
    // * Send email to user
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "SkillBeHired - Reset Password",
      html: body,
    });

    return NextResponse.json({
      status: 200,
      message:
        "Password-Reset email sent successfully. Please check your email!",
      email: data,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 400,
      message: "Something went wrong. Please try again!",
    });
  }
}
// react: (
//   <SendEmailLink
//     setText={`Heyaa ${email.firstname}!!! \n To reset your password click the reset button: `}
//     setBtnText="Reset"
//     setUrl={resetUrl}
//   />
// ),
