import AdBanners from "@/models/AdBanners";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connect();

    const { redirectTo, bannerUrl, fnAction, bannerId } = await request.json();

    if (fnAction == "fetch") {
      const dbCollection = await AdBanners.find({});
      return new NextResponse(JSON.stringify(dbCollection), {
        message: "Unverified Professional successfully!",
        status: 200,
        data: dbCollection,
      });
    }

    if (fnAction == "remove") {
      if (!bannerId) {
        return new NextResponse("No Banner Id received!", {
          message: "No Banner Id received!",
          status: 201,
        });
      }
      await AdBanners.deleteOne({ _id: bannerId });
      // await removeBanner.save();
    }

    if (fnAction == "add") {
      if (!redirectTo && !bannerUrl) {
        return new NextResponse("Provive inputs!", {
          message: "Provive inputs!",
          status: 201,
        });
      }
      const newBanner = await AdBanners({
        redirectTo,
        bannerUrl,
        bannerAlt: "banner",
      });

      await newBanner.save();
    }

    return new NextResponse("Added or Removed successfully!", {
      message: "Added or Removed successfully!",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
