import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMdw = async (req, res, next) => {
  try {
    // const token = req.headers.authorization.split(' ')[1]; => C1
    const token = req.headers["x-access-token"];

    // 1. Validation token
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const { id } = decoded;
    //(req.user = userService.getUserById)
    // 3. Get user by id
    const user = await User.findById(id);
    // 4. Assign user to req.user
    req.user = user;
    next();
  } catch (error) {
    // 5. Return error
    if (
      error.name === "TokenExpiredError" ||
      error instanceof jwt.JsonWebTokenError
    ) {
      return res.status(401).json({
        message: "Token has expired",
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        error: {
          msg: error.message,
          stack: error.stack,
        },
      });
    }
  }
};
