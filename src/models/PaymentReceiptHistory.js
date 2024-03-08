import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentReceiptHistorySchema = new Schema(
  {
    paymentId: {
      type: String,
      required: ture,
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
        required: ture,
      },
      userUpiId: {
        type: String,
        required: ture,
      },
      userName: {
        type: String,
        required: ture,
      },
    },
    amount: {
      fullAmount: {
        type: Number,
        required: ture,
      },
      advanceAmount: {
        type: Number,
        required: ture,
      },
      pendingAmount: {
        type: Number,
        required: ture,
      },
    },
    isRequestForPending: {
      type: Boolean,
      required: ture,
      default: false,
    },
    isAcceptance: {
      type: String,
      required: ture,
    },
    dateTime: {
      type: String,
      required: ture,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PaymentReceiptHistory ||
  mongoose.model("PaymentReceiptHistory", paymentReceiptHistorySchema);
