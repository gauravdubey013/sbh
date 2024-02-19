import connect from "@/utils/db";
import ChatMessage from "@/models/ChatMessage";
import User from "@/models/User";
import Professional from "@/models/Professional";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { chatAction, userEmail, profEmail, message } = await request.json();

  try {
    await connect();

    const currentDate = new Date();
    const timeAsString = currentDate.toLocaleTimeString();
    const dateAsString = currentDate.toLocaleDateString();

    let existingChat = await ChatMessage.findOne({
      "user.email": userEmail,
      "prof.email": profEmail,
    });

    const user = await User.findOne({ email: userEmail });
    const prof = await Professional.findOne({ email: profEmail });

    if (chatAction === "writeMsg") {
      if (existingChat) {
        // If chat exists, add new messages in existing chat
        existingChat.messages.push({
          sender: "user", // Assuming the message is from the user
          message,
          time: timeAsString,
          date: dateAsString,
        });

        try {
          await existingChat.save();
          return new NextResponse("Message is saved!", {
            status: 200,
          });
        } catch (error) {
          return new NextResponse("Internal Server Error: ", error, {
            status: 500,
          });
        }
      } else {
        // If chat doesn't exist, create a new one and write the first message
        const newChatMessage = new ChatMessage({
          user: {
            name: user.name,
            email: userEmail,
          },
          prof: {
            name: prof.name,
            email: profEmail,
            pfp: prof.profileImgPath,
          },
          messages: [
            {
              sender: "user", // Assuming the message is from the user
              message,
              time: timeAsString,
              date: dateAsString,
            },
          ],
        });

        try {
          await newChatMessage.save();
          return new NextResponse("Message is saved!", {
            status: 200,
          });
        } catch (error) {
          return new NextResponse("Internal Server Error: ", error, {
            status: 500,
          });
        }
      }
    }
    if (chatAction === "fetchChat") {
      let chatsCollection;
      // if (userEmail !== undefined) {
        chatsCollection = await ChatMessage.find({
          "user.email": userEmail,
          // "prof.email": profEmail,
        });
      // } else {
      //   chatsCollection = await ChatMessage.find({
      //     "prof.email": profEmail,
      //   });
      // }

      if (!chatsCollection) {
        return new NextResponse("DB collection doesn't exist", {
          status: 400,
        });
      }
      // console.log(chatsCollection);

      return new NextResponse(JSON.stringify(chatsCollection), {
        status: 200,
      });
    }

    if (chatAction === "fetchMessage") {
      const chatsCollection = await ChatMessage.find({
        "user.email": userEmail,
        "prof.email": profEmail,
      });

      // console.log(chatsCollection.map((chat) => chat.messages).flat());
      if (!chatsCollection) {
        return new NextResponse("DB collection doesn't exist", {
          status: 400,
        });
      }
      // console.log(chatsCollection);

      return new NextResponse(
        JSON.stringify(chatsCollection.map((chat) => chat.messages).flat()),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
