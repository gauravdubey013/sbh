import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      default: "$2a$05$mDaH1eQzeGHd0dvj5gLBuuieKb41INVbnzi/nciRWIXM6pDW4A5nS",
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    signInWith: {
      type: String,
      required: true,
      default: "Email&Password",
    },

    payment: [
      {
        paymentId: {
          type: Number,
          required: false,
        },
        to: {
          type: String,
          required: false,
        },
        amount: {
          type: String,
          required: false,
        },
        method: {
          type: String,
          required: false,
        },
      },
    ],

    resetToken: {
      type: String,
      trim: true,
      required: false,
    },
    resetTokenExpiry: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
