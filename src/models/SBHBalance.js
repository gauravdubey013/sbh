import mongoose from "mongoose";

const { Schema } = mongoose;

const sbhBalanceSchema = new Schema(
  {
    sbh: {
      type: String,
      required: true,
    },
    balanceAmount: {
      type: Number,
      required: true,
    },
    sbhAmount: {
      type: Number,
      required: true,
    },
    transactions: [
      {
        transactionOf: {
          type: String,
          required: false,
        },
        paymentId: {
          type: String,
          required: false,
        },
        fromUpiId: {
          type: String,
          required: false,
        },
        toUpiId: {
          type: String,
          required: false,
        },
        amount: {
          type: Number,
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

export default mongoose.models.SBHBalance ||
  mongoose.model("SBHBalance", sbhBalanceSchema);
