import connect from "@/utils/db";
import User from "@/models/User";
import WorkFeedback from "@/models/WorkFeedback";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { action, userEmail, profEmail, feedback } = await request.json();
    // console.log(userEmail, profEmail, feedback);
    await connect();
    const userExist = await User.findOne({ email: userEmail });

    if (action == "fetch") {
      const workFeedbackCollection = await WorkFeedback.find({});
      if (!workFeedbackCollection) {
        return new NextResponse("No feedback collection found", {
          status: 201,
        });
      }
      const profWorkFeedback = workFeedbackCollection.filter(
        (prof) => prof.profEmail === profEmail
      );
      if (!profWorkFeedback) {
        return new NextResponse("No feedback found", {
          status: 201,
        });
      }
      return new NextResponse(JSON.stringify(profWorkFeedback), {
        status: 200,
      });
    }

    if (action == "send") {
      if (!userExist) {
        return new NextResponse("user doesn't exist", {
          status: 201,
        });
      }

      const newFeedback = WorkFeedback({
        profEmail,
        userEmail,
        userName: userExist?.name,
        userPfp: userExist?.pfp || "/assets/loading3d360Rotate.gif",
        feedback,
      });
      await newFeedback.save();
    }

    return new NextResponse("success", {
      status: 200,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse("Internal Server Error : ", error, {
      status: 500,
    });
  }
};
