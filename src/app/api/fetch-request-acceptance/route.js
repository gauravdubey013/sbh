import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { action, userEmail, profEmail } = await request.json();

  await connect();
  return new NextResponse(JSON.stringify(userData), {
    status: 200,
  });
};
