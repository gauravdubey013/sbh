import connect from "@/utils/db";
import User from "@/models/User";
import Professional from "@/models/Professional";
import Payment from "@/models/Payment";
import SBHBalance from "@/models/SBHBalance";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const generatePaymentId = () => {
  const timestamp = new Date().getTime();
  const randomId = Array.from(
    { length: 15 },
    () =>
      "!@#$%^&*=+|;:.<>?0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[
        Math.floor(Math.random() * 72)
      ]
  ).join("");
  const paymentId = `sbh$${randomId}$${timestamp}`;
  return paymentId;
};

export const POST = async (request) => {
  const { userEmail, profEmail, fullAmount, upiId } = await request.json();

  if (!userEmail || !profEmail || !fullAmount || !upiId) {
    return new NextResponse("Invalid request data", {
      status: 400,
    });
  }
  try {
    await connect();

    const userExist = await User.findOne({ email: userEmail });
    const profExist = await User.findOne({ email: profEmail });
    const profInfoExist = await Professional.findOne({ email: profEmail });
    // const adAmt = (15 / 100) * fullAmount;
    // const sbhAmt = (5 / 100) * fullAmount;
    // const pendAmt = fullAmount - (advanceAmount + sbhAmount);
    const advanceAmount = (15 / 100) * fullAmount;
    const sbhAmount = (5 / 100) * fullAmount;
    const pendingAmount = fullAmount - (advanceAmount + sbhAmount);
    // const advanceAmount = parseFloat(adAmt.toFixed(2));
    // const sbhAmount = parseFloat(sbhAmt.toFixed(2));
    // const pendingAmount = parseFloat(pendAmt.toFixed(2));

    const currentDate = new Date();
    const timeAsString = currentDate.toLocaleTimeString();
    const dateAsString = currentDate.toLocaleDateString();
    const dateTime = `${dateAsString} ${timeAsString}`;

    const paymentId = generatePaymentId();
    console.log(dateTime, paymentId);

    const profPaymentExists = await Payment.findOne({ profEmail });

    if (!profPaymentExists) {
      const newProfPayment = Payment({
        profEmail,
        profUpiId: profInfoExist?.upiId,
        profName: profExist?.name,
        receipt: [
          {
            paymentId,
            userEmail,
            userUpiId: upiId,
            userName: userExist?.name,
            fullAmount,
            advanceAmount,
            pendingAmount,
            dateTime,
          },
        ],
      });
      await newProfPayment.save();
    } else {
      const newPaymentReceipt = {
        paymentId,
        userEmail,
        userUpiId: upiId,
        userName: userExist?.name,
        fullAmount,
        advanceAmount,
        pendingAmount,
        dateTime,
      };
      profPaymentExists.receipt.push(newPaymentReceipt);
      await profPaymentExists.save();
    }

    const sbhBalExist = await SBHBalance.findOne({ sbh: "SkillBeHired" });
    // console.log(sbhBalExist);

    if (sbhBalExist) {
      // Adding transcations of...
      // Receiving money by client/user
      const updateBalance = sbhBalExist.balanceAmount + fullAmount;
      sbhBalExist.balanceAmount = updateBalance;
      const newTransactionsFullAmount = {
        transactionOf: "received professional full payment by client/user.",
        paymentId: generatePaymentId(),
        fromUpiId: upiId,
        toUpiId: "sbh@sbh",
        amount: fullAmount,
        dateTime,
      };
      sbhBalExist.transactions.push(newTransactionsFullAmount);
      await sbhBalExist.save();

      // Cutting 5% sbh commission
      const newUpdateBalance = sbhBalExist.balanceAmount - sbhAmount;
      sbhBalExist.balanceAmount = newUpdateBalance;
      const updateSBHBalance = sbhBalExist.sbhAmount + sbhAmount;
      sbhBalExist.sbhAmount = updateSBHBalance;
      const newTransactionsSbhAmount = {
        transactionOf: "cutting sbh 5% commission from Balance amount.",
        paymentId: generatePaymentId(),
        fromUpiId: "sbh@sbh",
        toUpiId: "sbh@sbh",
        amount: sbhAmount,
        dateTime,
      };
      sbhBalExist.transactions.push(newTransactionsSbhAmount);
      await sbhBalExist.save();

      // Paying advance 15% to prof
      const newUpdateBalanceProf = sbhBalExist.balanceAmount - advanceAmount;
      sbhBalExist.balanceAmount = newUpdateBalanceProf;
      const newTransactionsProfAmount = {
        transactionOf: "advance 15% to professional.",
        paymentId,
        fromUpiId: "sbh@sbh",
        toUpiId: profInfoExist?.upiId,
        amount: advanceAmount,
        dateTime,
      };
      sbhBalExist.transactions.push(newTransactionsProfAmount);
      await sbhBalExist.save();
      profInfoExist.hired = "hired";
      await profInfoExist.save();
    } else {
      const sbhPay = SBHBalance({
        sbh: "SkillBeHired",
        balanceAmount: fullAmount,
        sbhAmount,
        transactions: [],
      });
      await sbhPay.save();
    }

    const bodyOne = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${userExist?.name}!!</h1>
    <span style="color: #ccc; font-size: 14px; font-family: 'Arial', sans-serif;">We received your ₹${fullAmount} payment and paid the advance 15% (₹${advanceAmount}) to hired professional ${profExist?.name}.<br/>Save the receipt, please make sure to save the receipt</span>
    <br/><a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: "gauravd8976@gmail.com", //userEmail
      subject: "SkillBeHired - Professional Payment",
      html: bodyOne,
      // attachments: [
      //   {
      //     filename: `${pdfContent}.pdf`,
      //     content: pdfContent,
      //   },
      // ],
    });

    const bodyTwo = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${profExist?.name}!!</h1>
    <span style="color: #ccc; font-size: 14px; font-family: 'Arial', sans-serif;">Received the payment of the first advance of 15% (₹${advanceAmount}) of ₹${fullAmount} by ${userExist?.name}.<br/>Request for the pending payment after completing the work or work done within the client chat.</span>
    <br/><a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: "gauravd8976@gmail.com", //profEmail
      subject: "SkillBeHired - Professional Advance Payment",
      html: bodyTwo,
    });

    const receiptDetails = {
      paymentId,
      userUpiId: upiId,
      profUpiId: profInfoExist?.upiId ?? "sbh@sbh",
      dateTime,
      fullAmount,
      advanceAmount,
      userName: userExist?.name,
      profName: profExist?.name,
    };

    console.log("success");
    return new NextResponse(JSON.stringify(receiptDetails), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Something went wrong!", {
      status: 500,
    });
  }
};

// import jsPDF from "jspdf";
// import fs from "fs";
// import path from "path";
// const pdfDir = path.join(process.cwd(), "public", "users", "receipts");

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
