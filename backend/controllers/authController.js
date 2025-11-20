import axios from "axios";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { oauth2client } from "../utils/googleConfig.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
};

export const googleLogin = asyncHandler(async (req, res) => {
  const { code } = req.body;

  if (!code) throw new ApiError(400, "Google OAuth code missing");

  const { tokens } = await oauth2client.getToken(code);
  oauth2client.setCredentials(tokens);

  const googleRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
  );

  const { email, name } = googleRes.data;

  let user = await userModel.findOne({ email });

  if (!user) {
    user = await userModel.create({
      name,
      email,
      password: null,
      google: true,
    });
  }

  const accessToken = generateAccessToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Google Login Success"));
});

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if ([email, password, name].some((f) => !f || f.trim() === ""))
    throw new ApiError(400, "All fields are required");

  const existedUser = await userModel.findOne({ email });

  if (existedUser) throw new ApiError(409, "Email already registered");

  const user = await userModel.create({ name, email, password });

  const createdUser = await userModel.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) throw new ApiError(404, "User not found");

  if (user.google)
    throw new ApiError(
      400,
      "This email uses Google Sign-In. Login with Google."
    );

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) throw new ApiError(400, "Invalid email or password");

  const accessToken = generateAccessToken(user);

  const cleanUser = await userModel.findById(user._id).select("-password");

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: cleanUser, accessToken },
        "User Logged In Successfully"
      )
    );
});

export const userDetails = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: req.user }, "User Logged Out Successfully")
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});
