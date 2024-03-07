import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    profEmail: {
      type: String,
      required: true,
    },
    profUpiId: {
      type: String,
      required: true,
    },
    profName: {
      type: String,
      required: true,
    },
    receipt: [
      {
        paymentId: {
          type: String,
          required: false,
        },
        userEmail: {
          type: String,
          required: false,
        },
        userUpiId: {
          type: String,
          required: false,
        },
        userName: {
          type: String,
          required: false,
        },
        fullAmount: {
          type: Number,
          required: false,
        },
        advanceAmount: {
          type: Number,
          required: false,
        },
        pendingAmount: {
          type: Number,
          required: false,
        },
        isRequestForPending: {
          type: Boolean,
          required: false,
          default: false,
        },
        isAcceptance: {
          type: String,
          required: false,
        },
        dateTime: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
