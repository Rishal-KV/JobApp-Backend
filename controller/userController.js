import { helpBcrypt, helpVerify } from "../utils/bcrypt.js";
import { JobPost } from "../model/jobModel.js";
import {
  userValidationSchema,
  userLoginSchema,
} from "../validation/userValidation.js";
import User from "../model/userModel.js";
import { createToken } from "../utils/jwt.js";
import Application from "../model/applicationModel.js"; // Import the Application model

// Register function
export const signUp = async (req, res) => {
  try {
    const { error, value } = userValidationSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password } = value;
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res
        .status(409)
        .json({ status: false, message: "User already exists!" });
    }

    let role = "user";
    if (email.endsWith("@alphaware.com")) {
      role = "admin";
    }

    const hashedPassword = await helpBcrypt(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ status: true, message: "Signup successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { error, value } = userLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isPasswordValid = await helpVerify(password, user.password);
    if (isPasswordValid) {
      const token = createToken({ userId: user._id, role: user.role });
      res.json({ token, message: "Login successful", status: true, user });
    } else {
      res.status(401).json({ status: false, message: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// Fetch job posts with filters
export const listPost = async (req, res) => {
  try {
    const { contract, location, company } = req.query;

    const filter = {};

    if (contract) {
      filter.contract = contract;
    }

    if (location) {
      filter.location = { $regex: new RegExp(location, "i") };
    }

    if (company) {
      filter.companyName = { $regex: new RegExp(company, "i") }; // Add filter for company name
    }

    const jobs = await JobPost.find(filter);
    res.json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    const application = await Application.findOneAndUpdate(
      { userId },
      { $addToSet: { appliedJobs: jobId } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Application successful!",application });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//check applicarion
export const Applications = async (req, res) => {
  try {
    const { userId } = req.query;
    const jobApp = await Application.findOne({ userId: userId })
      .populate("appliedJobs")
      .exec();
    console.log(jobApp, "jops");
    res.status(200).json({ jobApp });
  } catch (error) {
    console.log(error, "errr");
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
