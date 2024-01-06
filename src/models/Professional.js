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
    bio: {
      type: String,
      // required: true,
    },
    resumePath: {
      type: String,
      // required: true,
    },
    sLOne: {
      type: String,
      // required: true,
    },
    sLTwo: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Professional ||
  mongoose.model("Professional", professionalSchema);
