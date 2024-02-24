import { User } from "../models/user.model.js";

const userRegister = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({
          status: 400,
          success: false,
          message: "Please provide all fields",
        });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(400)
        .json({ status: 400, success: false, message: "User Already Exists" });
    }

    const newUser = await User.create({
      email,
      fullName,
      password,
      userType: "USER",
    });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
      return res
        .status(500)
        .json({
          status: 500,
          success: false,
          message: "Something went wrong while registering the user",
        });
    }

    return res.status(201).json({
      status: 201,
      success: true,
      message: "User registered Successfully",
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res
      .status(500)
      .json({ status: 500, success: false, message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          status: 400,
          success: false,
          message: "Please provide all fields",
        });
    }

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res
        .status(400)
        .json({
          status: 400,
          success: false,
          message: "Account does not exist",
        });
    }

    const isPasswordValid = await userExist.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({
          status: 400,
          success: false,
          message: "Invalid user credentials",
        });
    }

    const token = userExist.generateToken(userExist._id);
    const loggedInUser = await User.findById(userExist._id).select("-password");

    return res.status(200).json({
      status: 200,
      success: true,
      data: { user: loggedInUser, token },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error in user login:", error);
    return res
      .status(500)
      .json({ status: 500, success: false, message: "Internal Server Error" });
  }
};

export { login, userRegister };
