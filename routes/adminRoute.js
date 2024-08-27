import express from "express";
import {
  deleteJobPost,
  getJobPostById,
  listPost,
  postJob,
  updateJobPost,
} from "../controller/adminController.js";
import { authorizeRoles } from "../middlware/auth.js";
const adminRoute = express();


//job posting route
adminRoute
  .route("/job")
  .post(authorizeRoles(["admin"]), postJob)
  .get(authorizeRoles(["admin"]), listPost);


//job post updating route
adminRoute
  .route("/updatejob")
  .get(authorizeRoles(["admin"]), getJobPostById)
  .post(authorizeRoles(["admin"]), updateJobPost)
  .put(authorizeRoles(["admin"]), updateJobPost)
  .delete(authorizeRoles(["admin"]), deleteJobPost);

export default adminRoute;
