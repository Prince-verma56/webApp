import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/authModel.js";

export const signupHandler = async (req, res) => {
  try {
    const { name, userName, email, password, confirmPassword, role } = req.body;

    if (
      !name ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await UserModel.findOne({
      $or: [
        { email: email.toLowerCase() },
        { userName: userName.toLowerCase() },
      ],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      name,
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { 
        id: newUser._id, 
        userName: newUser.userName, 
        role: newUser.role, 
        name: newUser.name 
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      { 
        id: newUser._id, 
        userName: newUser.userName, 
        name: newUser.name 
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
      refreshToken,
      user: { 
        id: newUser._id, 
        userName: newUser.userName, 
        role: newUser.role, 
        name: newUser.name,
        isVerified: newUser.isVerified
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signinHandler = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Please provide valid credentials" });
    }

    const user = await UserModel.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { userName: identifier.toLowerCase() },
      ],
    }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, userName: user.userName, name: user.name },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Signin successful",
      token,
      refreshToken,
      user: { 
        id: user._id, 
        userName: user.userName, 
        role: user.role, 
        name: user.name,
        isVerified: user.isVerified
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
