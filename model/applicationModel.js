// models/applicationModel.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
      required: true,
    },
    appliedJobs: [{
        type  :String,
        ref : "JobPost"
    }],
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
