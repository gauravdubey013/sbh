import connect from "@/utils/db";
import User from "@/models/User";
import Professional from "@/models/Professional";
import ContactUsMessage from "@/models/ContactUsMessage";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    // if (!db) {
    //   console.log("Database connection failed");
    //   return new NextResponse("Database connection failed", {
    //     status: 500,
    //   });
    // }

    const usersCollection = await User.find({});
    const profsCollection = await Professional.find({});
    const contactUsCollection = await ContactUsMessage.find({});

    if (!usersCollection && !profsCollection && !contactUsCollection) {
      console.log("collection doesn't exists");
      return new NextResponse("collection doesn't exists", {
        status: 400,
      });
    }
    const dbCollections = {
      usersCollection,
      profsCollection,
      contactUsCollection,
    };
    return new NextResponse(JSON.stringify(dbCollections), {
      status: 200,
      data: dbCollections,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse("Internal Server Error : ", error, {
      status: 500,
      //   message: "Internal Server Error",
    });
  }
};
