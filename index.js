import express from "express";
import userRoute from "./routes/userRoute.js";
import { connectDB } from "./config/db.js";
import cors from 'cors'
import adminRoute from "./routes/adminRoute.js";
const app = express();
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin : 'https://job-app-swart-omega.vercel.app'
}))

app.use("/", userRoute);
app.use('/admin',adminRoute)
app.listen(3000, () => {
  console.log("server is running...");
});
