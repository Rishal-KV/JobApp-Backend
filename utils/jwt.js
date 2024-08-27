import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
export const createToken = (payload) => {
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"3d"})
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
};
