import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
// import jsPDF from "jspdf";
// import fs from "fs";
// import path from "path";
import { Resend } from "resend";
import Professional from "@/models/Professional";

const resend = new Resend(process.env.RESEND_API_KEY);
// const pdfDir = path.join(process.cwd(), "public", "users", "receipts");

export const POST = async (request) => {
  const { userEmail, profEmail, amount, upiId } = await request.json();

  if (!userEmail || !profEmail || !amount || !upiId) {
    return new NextResponse("Invalid request data", {
      status: 400,
    });
  }

  await connect();
  const userExist = await User.findOne({ email: userEmail });
  const profExist = await User.findOne({ email: profEmail });
  const profInfoExist = await Professional.findOne({ email: profEmail });

  const advanceAmount = (15 / 100) * amount;
  const timestamp = new Date().getTime();
  const date = new Date(timestamp);
  const randomId = Array.from(
    { length: 15 },
    () =>
      "!@#$%^&*=+|;:.<>?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
        Math.floor(Math.random() * 72)
      ]
  ).join("");

  const paymentId = `sbh$${randomId}$${timestamp}`;
  console.log(paymentId);

  const receiptDetails = {
    paymentId,
    userUpiId: upiId,
    profUpiId: profInfoExist?.upiId ?? "sbh@hdfc",
    date,
    amount,
    advanceAmount,
    userName: userExist?.name,
    profName: profExist?.name,
  };
  // storing file path
  // const pdfPath = path.join(pdfDir, `${paymentId}.pdf`);

  // Background Image
  //   const backgroundImage = path.resolve("./public/assets/receiptBg.jpeg");
  //   const imgData = fs.readFileSync(backgroundImage);
  //   // Generate PDF receipt with jsPDF
  //   const doc = new jsPDF();
  //   doc.addImage(
  //     imgData,
  //     "JPEG",
  //     0,
  //     0,
  //     doc.internal.pageSize.getWidth(),
  //     doc.internal.pageSize.getHeight()
  //   );

  //   // Styling
  //   doc.setFontSize(20);
  //   doc.setTextColor("#000");

  //   // Invoice Header
  //   doc.text("Payment Receipt", 20, 20);

  //   doc.setFontSize(16);
  //   // Details
  //   doc.text(`Your name: ${userExist?.name}`, 20, 40);
  //   doc.text(`UPI ID: ${upiId}`, 20, 50);
  //   doc.text(`Received To: SkillBeHired`, 20, 60);
  //   doc.text(`Payment ID: ${paymentId}`, 20, 70);
  //   doc.text(`Amount received: ${amount}rs`, 20, 80);
  //   doc.text(`Date: ${date}`, 20, 90);
  //   doc.text(
  //     `Paid first 15% (${advanceAmount}rs) to professional ${profExist?.name}`,
  //     20,
  //     100
  //   );

  //   // Save PDF to a file
  //   fs.writeFileSync(pdfPath, doc.output());
  //   const pdfContent = fs.readFileSync(pdfPath);

  const body1 = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${userExist?.name}!!</h1>
          <span style="color: #ccc; font-size: 14px; font-family: 'Arial', sans-serif;">We received your ₹${amount} payment and paid the advance 15% (₹${advanceAmount}) to ${profExist?.name}.<br/>Save the receipt</span>
          <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: "gauravd8976@gmail.com",
    subject: "SkillBeHired - Professional Payment",
    html: body1,
    // attachments: [
    //   {
    //     filename: `${pdfContent}.pdf`,
    //     content: pdfContent,
    //   },
    // ],
  });

  const body2 = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${profExist?.name}!!</h1>
          <span style="color: #ccc; font-size: 14px; font-family: 'Arial', sans-serif;">Get the payment of the first advance of 15% (₹${advanceAmount}) by ${userExist?.name}.<br/>Request for the pending payment after completing the work or work done within the client chat.</span>
          <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: "gauravd8976@gmail.com",
    subject: "SkillBeHired - Professional Advance Payment",
    html: body2,
  });
  console.log("success");
  return new NextResponse(JSON.stringify(receiptDetails), {
    status: 200,
    // data: receiptDetails,
  });
};
