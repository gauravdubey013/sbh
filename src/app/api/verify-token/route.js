import connect from "@/utils/db";
import User from "@/models/User";
// import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { token } = await request.json();

  await connect();
  //   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return new NextResponse("Token has expired or it is Invalid", {
      status: 400,
    });
  }
  return new NextResponse(JSON.stringify(user), {
    status: 200,
  });
};
