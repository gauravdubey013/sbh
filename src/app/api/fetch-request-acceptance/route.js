import connect from "@/utils/db";
import Professional from "@/models/Professional";
import Payment from "@/models/Payment";
import User from "@/models/User";
import SBHBalance from "@/models/SBHBalance";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import PaymentReceiptHistory from "@/models/PaymentReceiptHistory";

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
  const { action, userEmail, profEmail, reason } = await request.json();
  // console.log(action, userEmail, profEmail);
  try {
    await connect();

    const payment = await Payment.findOne({
      profEmail,
      "receipt.userEmail": userEmail,
    });
    // console.log(payment);
    if (!payment) {
      return new NextResponse("Never made payment", {
        status: 201,
      });
    }
    const userExist = await User.findOne({ email: userEmail });
    const profExist = await User.findOne({ email: profEmail });
    // const profInfoExist = await Professional.findOne({ email: profEmail });

    const matchedReceipt = payment.receipt.filter(
      (rec) => rec.userEmail == userEmail
    )[0];

    let acceptanceResponse;
    if (action == "fetchReceipt" && matchedReceipt) {
      // console.log(payment?.profUpiId);
      const receiptDetails = {
        paymentId: matchedReceipt?.paymentId,
        userUpiId: matchedReceipt?.userUpiId,
        profUpiId: payment?.profUpiId,
        fullAmount: matchedReceipt?.fullAmount,
        advanceAmount: matchedReceipt?.advanceAmount,
        userName: matchedReceipt?.userName,
        profName: payment?.profName,
        dateTime: matchedReceipt?.dateTime,
      };
      return new NextResponse(JSON.stringify(receiptDetails), {
        status: 200,
      });
    }
    if (action == "fetch") {
      // console.log(payment);
      return new NextResponse(JSON.stringify(matchedReceipt), {
        status: 200,
      });
    }
    if (action == "request") {
      await Payment.updateOne(
        { profEmail, "receipt.userEmail": userEmail },
        { $set: { "receipt.$.isRequestForPending": true } }
      );
      const bodyOne = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${userExist?.name}!!</h1>
      <span style="color: #ccc; font-size: 14px; font-family: 'Arial', sans-serif;">
      ${profExist?.name} is requesting for Work-Done Acceptance to get the pending the payment.<br/>
      To response the Acceptance, please visit the ${profExist?.name} Chat where <b>Yes & No</b> button is given to response.<br/>
      You have give reason if your acceptance is <b>No</b>.<br>
      After ypur Acceptance reponse, the Professional ${profExist?.name} will not be <b>Hired</b> by you.
      </span><br/>
      <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: "gauravd8976@gmail.com", //userEmail
        subject:
          "SkillBeHired - Work-Done Acceptance or pending payment request",
        html: bodyOne,
        // attachments: [
        //   {
        //     filename: `${pdfContent}.pdf`,
        //     content: pdfContent,
        //   },
        // ],
      });
      return new NextResponse("Requested successfully to client", {
        status: 200,
      });
    }

    const sbhBalExist = await SBHBalance.findOne({ sbh: "SkillBeHired" });
    const currentDate = new Date();
    const timeAsString = currentDate.toLocaleTimeString();
    const dateAsString = currentDate.toLocaleDateString();
    const dateTime = `${dateAsString} ${timeAsString}`;

    if (action == "acceptance-yes") {
      await Payment.updateOne(
        { profEmail, "receipt.userEmail": userEmail },
        { $set: { "receipt.$.isAcceptance": "accepted" } }
      );
      acceptanceResponse = "Accepted";
      if (sbhBalExist) {
        // Adding transcations of...
        // Paying pending payment to professional by sbh after acceptance of client/user
        const updateBalance =
          sbhBalExist.balanceAmount - matchedReceipt?.pendingAmount;
        sbhBalExist.balanceAmount = updateBalance;
        const newTransactionsPendingPaid = {
          transactionOf:
            "paid pending payment to professional by sbh after acceptance of client/user.",
          paymentId: generatePaymentId(),
          fromUpiId: "sbh@sbh",
          toUpiId: payment?.profUpiId,
          amount: matchedReceipt?.pendingAmount,
          dateTime,
        };
        sbhBalExist.transactions.push(newTransactionsPendingPaid);
        await sbhBalExist.save();
      }
    }
    if (action == "acceptance-no") {
      await Payment.updateOne(
        { profEmail, "receipt.userEmail": userEmail },
        { $set: { "receipt.$.isAcceptance": "rejected" } }
      );
      acceptanceResponse = "Rejected";

      if (sbhBalExist) {
        // Adding transcations of...
        // Paying pending payment to client/user after rejecting acceptance
        const updateBalance =
          sbhBalExist.balanceAmount - matchedReceipt?.pendingAmount;
        sbhBalExist.balanceAmount = updateBalance;
        const newTransactionsPendingPaid = {
          transactionOf:
            "paid pending payment to client/user after rejecting acceptance.",
          paymentId: generatePaymentId(),
          fromUpiId: "sbh@sbh",
          toUpiId: matchedReceipt?.userUpiId,
          amount: matchedReceipt?.pendingAmount,
          dateTime,
        };
        sbhBalExist.transactions.push(newTransactionsPendingPaid);
        await sbhBalExist.save();
      }

      const bodyTwo = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${userExist?.name}!!</h1>
      <span style="color: #ccc; font-size: 14px; font-family: 'Arial', sans-serif;">
      Paid ${matchedReceipt?.pendingAmount} pending payment amount to UPI ${matchedReceipt?.userUpiId}.
      <br/>
      Reason for rejecting acceptance and pending payment : ${reason}
      </span>
      <br/>
      <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: "gauravd8976@gmail.com", //userEmail
        subject: "SkillBeHired - Pending Payment Receive",
        html: bodyTwo,
        // attachments: [
        //   {
        //     filename: `${pdfContent}.pdf`,
        //     content: pdfContent,
        //   },
        // ],
      });
    }

    const bodyThree = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${
      profExist?.name
    }!!</h1>
    <span style="color: #ccc; font-size: 14px; font-family: 'Arial', sans-serif;">
    ${
      userExist?.name
    } is responsed Work-Done Acceptance as <b>${acceptanceResponse}</b>.<br/>
    ${
      acceptanceResponse == "Accepted"
        ? `Paid ${matchedReceipt?.pendingAmount} pending payment amount to you to UPI ${payment?.profUpiId}.`
        : `Reason for rejecting pending payment : ${reason}`
    }
    </span><br/>
    <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: "gauravd8976@gmail.com", //profEmail
      subject: "SkillBeHired - Client Acceptance & Pending Payment",
      html: bodyThree,
    });

    if (acceptanceResponse == "Accepted" || acceptanceResponse == "Rejected") {
      const newPaymentReceiptHistory = PaymentReceiptHistory({
        paymentId: matchedReceipt?.paymentId,
        prof: {
          profEmail: payment?.profEmail,
          profUpiId: payment?.profUpiId,
          profName: payment?.profName,
        },
        user: {
          userEmail: matchedReceipt?.userEmail,
          userUpiId: matchedReceipt?.userUpiId,
          userName: matchedReceipt?.userName,
        },
        amount: {
          fullAmount: matchedReceipt?.fullAmount,
          advanceAmount: matchedReceipt?.advanceAmount,
          pendingAmount: matchedReceipt?.pendingAmount,
        },
        isRequestForPending: matchedReceipt?.isRequestForPending,
        isAcceptance: matchedReceipt?.isAcceptance,
        dateTime: matchedReceipt?.dateTime,
      });
      await newPaymentReceiptHistory.save();

      await Payment.updateOne(
        { profEmail },
        { $pull: { receipt: { userEmail } } }
      );

      if (!payment || payment.receipt.length === 0) {
        const professionalExist = await Professional.findOne({
          email: profEmail,
        });
        professionalExist.hired = "notHired";
        professionalExist.save();
      }
    }

    return new NextResponse("Requested successfully to client", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
