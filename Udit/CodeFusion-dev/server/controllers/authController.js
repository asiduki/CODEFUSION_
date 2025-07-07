import UserModel from "../models/UserSchema.js";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await UserModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new UserModel({ username, password });
    await newUser.save();
    
    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error while registering:", error);
    return res.status(500).json({ msg: "Server error while registering" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Id: ${username} password: ${password}`);

    const user = await UserModel.findOne({ username });
    if (!user || password !== user.password) {
      return res.status(401).json({ msg: "Username or password incorrect" });
    }

    res.status(200).json({ msg: "Login Successful" });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ msg: "Server error while logging in" });
  }
};

export { login, register };
