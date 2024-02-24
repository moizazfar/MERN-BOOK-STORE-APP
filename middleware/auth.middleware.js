import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authProtect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password");
        console.log("user", user);
        req.user = user;

        next();
      } catch (error) {
        res.status(401).json({ message: "You are Not authorized" });
      }
    }

    if (!token) {
      res
        .status(401)
        .json({ message: "You must have token to be an authenticated User" });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export { authProtect };
