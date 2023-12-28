import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

// import { render } from "@react-email/render";
// import { sendEmail } from "@/config/mail";
// import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// to send email
export const sendEmail = async (to, subject, text) => {
  const info = await transporter.sendMail({
    from: process.env.SMTP_EMAIL_FROM,
    to: to,
    subject: subject,
    html: text,
  });
  return info?.messageId;
};

connect();

export async function POST(request) {
  const { email } = await request.json();

  // check user email firsr
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

  console.log(resetUrl);
  await existingUser.save();

  try {
    // const html = render(
    //   ForgotPasswordEmail({
    //     params: {
    //       name: existingUser.firstname,
    //       url: resetUrl,
    //     },
    //   })
    // );

    const body =
      "Heya " +
      existingUser.firstname +
      "!\nClick to reset the password : " +
      resetUrl;

    const htmlContent = `<p>${body}</p>`;
    // * Send email to user
    await sendEmail(email, "Reset Password", htmlContent);
    return NextResponse.json({
      status: 200,
      message:
        "Password-Reset email sent successfully. Please check your email!",
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 400,
      message: "Something went wrong. Please try again!",
    });
  }
}

// import sgMail from "@sendgrid/mailś";

// export const POST = async (request) => {
// const { email } = await request.json();

//   await connect();

//   const existingUser = await User.findOne({ email });

//   if (!existingUser) {
//     return new NextResponse("Error : This e-mail doesn't exists!", {
//       status: 400,
//     });
//   }

//   const resetToken = crypto.randomBytes(20).toString("hex");
//   const passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   const passwordResetExpires = Date.now() + 3600000;

//   existingUser.resetToken = passwordResetToken;
//   existingUser.resetTokenExpiry = passwordResetExpires;
//   const resetUrl = `localhost:3000/reset-password/${resetToken}`;

//   console.log(resetUrl);

//   const body = "Click to reset the password : " + resetUrl;

//   const msg = {
//     to: email,
//     from: "dubeygaurav520@gmail.com",
//     subject: "SkillBeHired : Reset Password",
//     text: body,
//   };

//   sgMail.setApiKey(process.env.SENDGRID_URL || "");
//   sgMail
//     .send(msg)
//     .then(() => {
//       return new NextResponse("Password-Reset email has been sent.", {
//         status: 200,
//       });
//     })
//     .catch(async (error) => {
//       existingUser.resetToken = undefined;
//       existingUser.resetTokenExpiry = undefined;
//       await existingUser.save();

//       return new NextResponse(
//         "Failed sending Password-Reset email, Try again later...",
//         {
//           status: 400,
//         }
//       );
//     });

//   try {
//     await existingUser.save();
//     return new NextResponse("Password-Reset email has been sent.", {
//       status: 200,
//     });
//   } catch (error) {
//     return new NextResponse(error, {
//       status: 200,
//     });
//   }
// };
