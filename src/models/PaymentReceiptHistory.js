import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentReceiptHistorySchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
    },
    prof: {
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
    },
    user: {
      userEmail: {
        type: String,
        required: true,
      },
      userUpiId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
    },
    amount: {
      fullAmount: {
        type: Number,
        required: true,
      },
      advanceAmount: {
        type: Number,
        required: true,
      },
      pendingAmount: {
        type: Number,
        required: true,
      },
    },
    isRequestForPending: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAcceptance: {
      type: String,
      required: true,
    },
    dateTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PaymentReceiptHistory ||
  mongoose.model("PaymentReceiptHistory", paymentReceiptHistorySchema);
