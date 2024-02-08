import connect from "@/utils/db";
import Professional from "@/models/Professional";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import User from "@/models/User";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request) => {
  try {
    let body;
    await connect();

    const { profAction, selectedProfEmail } = await request.json();

    const existingProf = await Professional.findOne({
      email: selectedProfEmail,
    });
    // console.log(existingProf);
    if (!existingProf) {
      return new NextResponse("Professional doesn't exists!", {
        message: "Professional doesn't exists!",
        status: 400,
      });
    }
    if (profAction == "accept") {
      existingProf.isVerified = "yes";
      await existingProf.save();

      body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${existingProf.name}!!</h1>
        <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">We have <b style="color: #53c28b;"><u>Accepted</u></b> your Professional resitration : Start your professional life</span>
        <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: selectedProfEmail ?? "dgnix510@gmail.com",
        subject: "SkillBeHired - Professional Approval",
        html: body,
      });
      return new NextResponse("Accepted Professional successfully!", {
        message: "Accepted Professional successfully!",
        status: 200,
      });
    }
    // if (profAction == "reject") {
    //   existingProf.isVerified = "no";
    //   await existingProf.save();

    //   return new NextResponse("Rejected Professional successfully!", {
    //     message: "Rejected Professional successfully!",
    //     status: 200,
    //   });
    // }
    if (profAction == "reject") {
      const existingUser = await User.findOne({ email: selectedProfEmail });
      if (!existingUser) {
        return new NextResponse("User doesn't exists!", {
          message: "User doesn't exists!",
          status: 400,
        });
      }
      existingUser.role = "user";
      await existingUser.save();
      await Professional.deleteOne({ email: selectedProfEmail });

      body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${existingProf.name}!!</h1>
       <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">We have <b style="color: #c25353;"><u>Rejected</u></b> your Professional registration for some T&C reason... : You can Re-register as professional again with valid professional identity this time! </span>
       <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: selectedProfEmail ?? "dgnix510@gmail.com",
        subject: "SkillBeHired - Professional Approval",
        html: body,
      });
      return new NextResponse("Rejected Professional successfully!", {
        message: "Rejected Professional successfully!",
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", {
      message: "Internal Server Error",
      status: 500,
    });
  }
};
