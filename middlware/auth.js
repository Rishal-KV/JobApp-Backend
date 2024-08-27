import { verifyToken } from "../utils/jwt.js";
import User from "../model/userModel.js";

export const authorizeRoles = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization;
      console.log(token,"token");

      if (!token) {
        return res.status(401).json({ message: "No token found!" });
      }

      // Verify the token and decode it
      const decoded = verifyToken(token);
console.log(decoded,"decoded");
      // Find the user associated with the decoded token
      let user = await User.findOne({ _id: decoded.userId });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied!" });
      }

     

      // Proceed to the next middleware or route handler
      next();

    } catch (error) {
      // Handle any errors that occur
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};
