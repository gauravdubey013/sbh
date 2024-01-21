import mongoose from "mongoose";

const { Schema } = mongoose;

const deletedUserSchema = new Schema(
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
  },
  { timestamps: true }
);

export default mongoose.models.DeletedUser ||
  mongoose.model("DeletedUser", deletedUserSchema);
