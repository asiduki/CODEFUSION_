import UserModel from "../models/UserSchema.js";

// ✅ Save Code Record to a User
export const saveRecord = async (req, res) => {
  const { username, roomId, data } = req.body;

  if (!username || !roomId || !data) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add record to user's records array
    user.records.push({
      roomId,
      data,
      createdAt: new Date(),
    });

    await user.save();

    return res.status(200).json({ message: "Code saved successfully." });
  } catch (error) {
    console.error("Error saving record:", error);
    return res.status(500).json({ message: "Error saving record." });
  }
};

// ✅ Fetch All Code Records of a User
export const fetchRecord = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      records: user.records.sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return res.status(500).json({ message: "Error fetching records." });
  }
};
