import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    signInWith: {
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
    },
    role: {
      type: String,
      required: true,
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
