import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request) => {
  const {
    firstname,
    lastname,
    email,
    password,
    profCheckValue,
    otp,
    checkOtpCode,
  } = await request.json();

  // console.log(
  //   firstname,
  //   lastname,
  //   email,
  //   password,
  //   profCheckValue,
  //   "OTP -> " + otp,
  //   checkOtpCode
  // );
  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Error : User already exists!", { status: 400 });
  }

  let otpCode = checkOtpCode || "";

  if (otp.trim() == "") {
    otpCode = Math.floor(1000 + Math.random() * 9000);
    const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${
      firstname + " " + lastname
    }!!</h1>
    <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">Here's an OTP for your email verification <b style="color: #53c28b;">${otpCode}</b><br /></span>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email ?? "gauravd8976@gmail.com",
      subject: "SkillBeHired - Verify Email",
      html: body,
    });

    return new NextResponse(JSON.stringify(otpCode), {
      status: 201,
      message: "Otp has sended, verify email first",
      data: otpCode,
    });
  }

  console.log(otp, " -> ", checkOtpCode);
  if (otp == checkOtpCode) {
    const hashPassword = await bcrypt.hash(password, 5); // converting password into hash-code

    const newUser = new User({
      name: firstname + " " + lastname,
      signInWith: "Email&Password",
      email,
      password: hashPassword,
      role: "user", //profCheckValue
    });
    try {
      await newUser.save();
      return new NextResponse("OTP matched and User Registered successfully!", {
        status: 200,
      });
    } catch (error) {
      return new NextResponse("Internal Server Error : ", error, {
        status: 500,
      });
    }
  } else {
    return new NextResponse("Incorrect OTP!", {
      status: 401,
    });
  }
};
