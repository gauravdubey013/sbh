import mongoose from "mongoose";

const { Schema } = mongoose;

const AdBanners = new Schema(
  {
    redirectTo: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
      required: true,
    },
    bannerAlt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AdBanners ||
  mongoose.model("AdBanners", AdBanners);
