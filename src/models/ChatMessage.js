import mongoose from "mongoose";

const { Schema } = mongoose;

// const ChatMessageSchema = new Schema(
//   {
//     user: {
//       type: String,
//       required: true,
//     },
//     prof: {
//       type: String,
//       required: true,
//     },
//     chat: [
//       {
//         message: {
//           type: String,
//           required: true,
//         },
//         time: {
//           type: String,
//           required: true,
//         },
//         date: {
//           type: String,
//           required: true,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

const ChatMessageSchema = new Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    prof: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      pfp: {
        type: String,
        required: true,
      },
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "prof"], // 'user' or 'prof'
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.ChatMessage ||
  mongoose.model("ChatMessage", ChatMessageSchema);
