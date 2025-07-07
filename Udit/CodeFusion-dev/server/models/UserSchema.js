import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  data: { type: String, required: true },
});

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roomId: {type: String, unique: true},
  records: [recordSchema]
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
