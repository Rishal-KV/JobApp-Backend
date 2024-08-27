import {
  jobPostSchema,
  updateJobPostSchema,
} from "../validation/adminValidation.js";
import { JobPost } from "../model/jobModel.js";

// job posting by admin
export const postJob = async (req, res) => {
  try {
    const { error, value } = jobPostSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const jobPost = await JobPost.create(value);

    res.status(201).json({
      message: "Job post created successfully!",
      status: true,
    });
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//list specific admin jobs
export const listPost = async (req, res) => {
  try {
    console.log(req.query);
    const jobs = await JobPost.find({ creatorId: req.query.id });
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//update job post
export const updateJobPost = async (req, res) => {
  try {
    console.log(req.body);
    const { error, value } = updateJobPostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { jobId } = req.body;
    const jobPost = await JobPost.findByIdAndUpdate(jobId, value, {
      new: true,
    });

    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    res.status(200).json({
      message: "Job post updated successfully!",
      status: true,
      jobPost,
    });
  } catch (error) {
    console.error("Error updating job post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// New function to fetch job post by ID
export const getJobPostById = async (req, res) => {
  try {
    const { jobId } = req.query;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const jobPost = await JobPost.findById(jobId);

    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    res.status(200).json({
      message: "Job post fetched successfully!",
      status: true,
      jobPost,
    });
  } catch (error) {
    console.error("Error fetching job post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete job post
export const deleteJobPost = async (req, res) => {
  try {
    const { jobId } = req.query;

    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const jobPost = await JobPost.findByIdAndDelete(jobId);

    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    const jobs = await JobPost.find({ creatorId: req.query.creatorId });

    res.status(200).json({
      message: "Job post deleted successfully!",
      status: true,
      jobs,
    });
  } catch (error) {
    console.error("Error deleting job post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
