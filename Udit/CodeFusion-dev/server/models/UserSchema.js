import mongoose from "mongoose";

// Schema for individual code records
const recordSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Main User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  records: [recordSchema], // ⬅️ Embed records here
});

export default mongoose.model("User", UserSchema);
