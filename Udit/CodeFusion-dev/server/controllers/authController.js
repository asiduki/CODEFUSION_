import bcrypt from "bcrypt";
import UserModel from "../models/UserSchema.js";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Received registration:", username, password);

    if (!username || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const userExist = await UserModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate username error (MongoDB unique index)
      return res.status(400).json({ msg: "Username already taken (duplicate)" });
    }

    console.error("Error while registering:", error);
    return res.status(500).json({ msg: "Server error while registering" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Id: ${username} password: ${password}`);

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Username or password incorrect" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Username or password incorrect" });
    }

    res.status(200).json({ msg: "Login Successful" });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ msg: "Server error while logging in" });
  }
};

export { login, register };
