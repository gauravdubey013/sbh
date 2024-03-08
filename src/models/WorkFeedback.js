import mongoose from "mongoose";

const { Schema } = mongoose;

const workFeedbackSchema = new Schema(
  {
    profEmail: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPfp: {
      type: String,
      required: true,
      default: "/assets/loading3d360Rotate.gif",
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WorkFeedback ||
  mongoose.model("WorkFeedback", workFeedbackSchema);
