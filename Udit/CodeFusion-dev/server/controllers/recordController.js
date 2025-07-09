import UserModel from "../models/UserSchema.js";

// ✅ Save Code Record to a User (from cookie auth)
export const saveRecord = async (req, res) => {
  const { roomId, data } = req.body;

  console.log("🛬 Incoming Save Request:", { user: req.user.username, roomId, data });

  if (!roomId || !data) {
    return res.status(400).json({ message: "Room ID and data are required" });
  }

  try {
    const user = await UserModel.findOne({ username: req.user.username });

    if (!user) {
      console.log("❌ User not found:", req.user.username);
      return res.status(404).json({ message: "User not found" });
    }

    user.records.push({ roomId, data, createdAt: new Date() });

    await user.save();

    console.log("✅ Code saved for", req.user.username);
    return res.status(200).json({ message: "Code saved successfully." });
  } catch (error) {
    console.error("💥 Error saving record:", error);
    return res.status(500).json({ message: "Error saving record." });
  }
};

// ✅ Fetch All Code Records of a User (from cookie auth)
export const fetchRecord = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.user.username });

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
