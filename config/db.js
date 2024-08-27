import mongoose from "mongoose"
export const  connectDB = () => {
 mongoose.connect("mongodb://localhost:27017/job-app").then(()=>{
    console.log('db connected')
 })
}