import mongoose from "mongoose"
import { configDotenv } from "dotenv"
configDotenv()
export const  connectDB = () => {
 mongoose.connect(`mongodb+srv://heyrishu:${process.env.DB}@cluster0.5xfoebk.mongodb.net/BlogApp`).then(()=>{
    console.log('db connected')
 })
}