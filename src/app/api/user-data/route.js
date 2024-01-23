import connect from "@/utils/db";
import User from "@/models/User";
import Professional from "@/models/Professional";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { email } = await request.json();

  await connect();
  const user = await User.findOne({ email });
  const prof = await Professional.findOne({ email });
  var userData = [];

  if (!user) {
    return new NextResponse("Doesn't exists", {
      status: 400,
    });
  }

  if (prof) {
    userData = { user, prof };
    return new NextResponse(JSON.stringify(userData), {
      status: 200,
    });
  } else {
    userData = { user: user };
    return new NextResponse(JSON.stringify(userData), {
      status: 200,
    });
  }
  // const name = user.firstname;
};
