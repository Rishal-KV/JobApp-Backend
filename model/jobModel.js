import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema({
  creatorId: {
    ref: "user",
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const JobPost = mongoose.model("JobPost", jobPostSchema);
