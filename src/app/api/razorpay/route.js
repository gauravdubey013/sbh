const Razorpay = require("razorpay");
const shortid = require("shortid");
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { taxAmt } = await request.json();

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const amount = taxAmt;
    const options = {
      amount: (amount * 100).toString(),
      receipt: shortid.generate(),
      currency: "INR",
      payment_capture: 1,
      // payment_method: "upi",
    };

    try {
      const response = await razorpay.orders.create(options);
      return NextResponse.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.error(err);
      return NextResponse.error(err.message, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error(error.message, { status: 500 });
  }
};
