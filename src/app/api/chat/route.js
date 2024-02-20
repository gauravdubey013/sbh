import connect from "@/utils/db";
import ChatMessage from "@/models/ChatMessage";
import User from "@/models/User";
import Professional from "@/models/Professional";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request) => {
  const { chatAction, userRole, userEmail, profEmail, message } =
    await request.json();

  // console.log(chatAction + " -> ", userRole, userEmail, profEmail, message);

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
      const sender = userRole !== "professional" ? "user" : "prof";
      // console.log(sender, userRole);
      if (existingChat) {
        // If chat exists, add new messages in existing chat
        existingChat.messages.push({
          sender, // message is from the user
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
              sender, // message is from the user
              message,
              time: timeAsString,
              date: dateAsString,
            },
          ],
        });
        const body = `<h1 style="color: #333; font-family: 'Arial', sans-serif;">Heya ${prof.name}!!</h1>
          <span style="color: #ccc; font-size: 18px; font-family: 'Arial', sans-serif;">You received new chat message by <b style="color: #53c28b;">${user.name}</b><br />Check on website</span>
          <a href="https://sbh.vercel.app/" style="display: inline-block; padding: 10px 20px; background-color: #53c28b; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Visit SkillBeHired</a>`;
        try {
          await newChatMessage.save();
          await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: profEmail ?? "gauravd8976@gmail.com",
            subject: "SkillBeHired - New Chat",
            html: body,
          });

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
      let chatsCollection = null;
      if (userRole !== "professional") {
        chatsCollection = await ChatMessage.find({
          "user.email": userEmail,
          // "prof.email": profEmail,
        });
      } else {
        chatsCollection = await ChatMessage.find({
          "prof.email": profEmail,
        });
      }

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
