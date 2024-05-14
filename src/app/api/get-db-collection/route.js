import connect from "@/utils/db";
import User from "@/models/User";
import Professional from "@/models/Professional";
import ContactUsMessage from "@/models/ContactUsMessage";
import DeletedUser from "@/models/DeletedUser";
import SBHBalance from "@/models/SBHBalance";
import AdBanners from "@/models/AdBanners";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { setOfColletion } = await request.json();
    // console.log(setOfColletion);
    await connect();

    if (setOfColletion == "prof") {
      const profsCollection = await Professional.find({});

      if (!profsCollection) {
        console.log("DB collection doesn't exists");
        return new NextResponse("DB collection doesn't exists", {
          status: 400,
        });
      }
      return new NextResponse(JSON.stringify(profsCollection), {
        status: 200,
        data: profsCollection,
      });
    }

    if (setOfColletion == "all") {
      const usersCollection = await User.find({});
      const deletedUsersCollection = await DeletedUser.find({});
      const profsCollection = await Professional.find({});
      const contactUsCollection = await ContactUsMessage.find({});
      const adBannerCollection = await AdBanners.find({});
      const sbhBalanceCollection = await SBHBalance.findOne({
        sbh: "SkillBeHired",
      });
      // console.log(sbhBalanceCollection);
      if (
        (!usersCollection && !profsCollection && !contactUsCollection,
        !sbhBalanceCollection)
      ) {
        console.log("DB collection doesn't exists");
        return new NextResponse("DB collection doesn't exists", {
          status: 400,
        });
      }
      const dbCollections = {
        adBannerCollection,
        sbhBalanceCollection,
        usersCollection,
        profsCollection,
        contactUsCollection,
        deletedUsersCollection: deletedUsersCollection ?? "NaN",
      };
      return new NextResponse(JSON.stringify(dbCollections), {
        status: 200,
        data: dbCollections,
      });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return new NextResponse("Internal Server Error : ", error, {
      status: 500,
      //   message: "Internal Server Error",
    });
  }
};
