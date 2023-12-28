import connect from "@/utils/db";
import { NextResponse } from "next/server";
import ContactUsMessage from "@/models/ContactUsMessage";

export const POST = async (request) => {
  const { firstname, lastname, email, message } = await request.json();

  await connect();

  const existingUser = await ContactUsMessage.findOne({ email });
  if (existingUser) {
    return new NextResponse("We already have received message from this email!", {
      status: 400,
    });
  }

  const newUserMessage = new ContactUsMessage({
    firstname,
    lastname,
    email,
    message,
  });

  try {
    await newUserMessage.save();
    return new NextResponse("Message is saved!", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Server Error : ", error, {
      status: 500,
    });
  }
};
