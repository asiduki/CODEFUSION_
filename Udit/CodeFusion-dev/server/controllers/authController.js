import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserSchema.js";

// ✅ Register a new user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await UserModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ msg: "Username already taken (duplicate)" });
    }

    console.error("Error during registration:", error);
    return res.status(500).json({ msg: "Server error during registration" });
  }
};

// ✅ Login existing user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Username or password incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Username or password incorrect" });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,        // ✅ should be false on localhost (true only for HTTPS)
  sameSite: "None",     // ✅ required for cross-origin cookie usage
  maxAge: 7 * 24 * 60 * 60 * 1000,
});



    return res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ msg: "Server error during login" });
  }
};
