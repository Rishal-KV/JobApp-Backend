import express from "express";
import {
  signUp,
  login,
  listPost,
  applyForJob,
  Applications
} from "../controller/userController.js";
import { authorizeRoles } from "../middlware/auth.js";
const userRoute = express();

// auth route
userRoute.post("/signup", signUp);
userRoute.post("/login", login);

// post listing route
userRoute.route("/post").get(listPost);


//job application route
userRoute
  .route("/job")
  .post(authorizeRoles(["user"]), applyForJob)
  .get(authorizeRoles(["user"]),Applications);

  

export default userRoute;
