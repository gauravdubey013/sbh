import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Professional from "@/models/Professional";
import { Resend } from "resend";

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
      return new NextResponse({
        message: "Professional doesn't exists! - Invalid user! try again later",
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
        to: "gauravd8976@gmail.com",
        subject: "SkillBeHired - Professional Approval",
        html: body,
      });

      return new NextResponse({
        message: "Accepted Professional successfully!",
        status: 200,
      });
    }
    if (profAction == "reject") {
      existingProf.isVerified = "no";
      await existingProf.save();
      body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${existingProf.name}!!</h1>
       <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">We have <b style="color: #c25353;"><u>Rejected</u></b> your Professional registration for some T&C : Re-register as professional again with valid professional identity this time!</span>
       <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: "gauravd8976@gmail.com",
        subject: "SkillBeHired - Professional Approval",
        html: body,
      });
      return new NextResponse({
        message: "Accepted Professional successfully!",
        status: 200,
      });
    }

    // if (profAction == "reject") {
    //   const existingUser = await Professional.findOne({
    //     email: selectedProfEmail,
    //   });
    //   if (!existingUser) {
    //     return new NextResponse({
    //       message:
    //         "Professional doesn't exists! - Invalid user! try again later",
    //       status: 400,
    //     });
    //   }
    //   const newDeletedUser = new DeletedUser({
    //     name: existingUser?.name ?? "name",
    //     signInWith: existingUser?.signInWith ?? "Email&Password",
    //     email,
    //     password: existingUser?.password ?? "pswd",
    //     role: existingUser?.role ?? "user",
    //   });
    //   await newDeletedUser.save();
    //   body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${existingProf.name}!!</h1>
    //   <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">We have <b style="color: #c25353;"><u>Rejected</u></b> your Professional registration for some T&C : Visit SkillBeHired with valid professional identity</span>
    //   <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

    //   await resend.emails.send({
    //     from: process.env.EMAIL_FROM,
    //     to: "dgnix510@gmail.com",
    //     subject: "SkillBeHired - Professional Approval",
    //     html: body,
    //   });
    //   await User.deleteOne({ email });
    //   return new NextResponse({
    //     message: "Rejected Professional successfully!",
    //     status: 200,
    //   });
    // }
  } catch (error) {
    console.error(error);
    return new NextResponse({ message: "Internal Server Error", status: 500 });
  }
};