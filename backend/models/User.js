import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  linkedin: {
    type: String,
    default: "",
  },
  bio: String,
  walletAddress: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
