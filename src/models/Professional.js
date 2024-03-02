import mongoose from "mongoose";

const { Schema } = mongoose;

const professionalSchema = new Schema(
  {
    userID: {
      // unique: true,
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    isVerified: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    profileImgPath: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    skillLevel: {
      type: String,
      required: true,
    },
    workHistory: {
      type: String,
      required: true,
    },
    hired: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    resumePath: {
      type: String,
      required: false,
    },
    sLOne: {
      type: String,
      required: false,
    },
    sLTwo: {
      type: String,
      required: false,
    },
    receivedPayment: [
      {
        paymentId: {
          type: Number,
          required: false,
        },
        from: {
          type: String,
          required: false,
        },
        receivedAmount: {
          type: Number,
          required: false,
        },
        FullAmount: {
          type: Number,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Professional ||
  mongoose.model("Professional", professionalSchema);
