import User from "../models/User.js";

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const { name, bio, linkedin, skills, walletAddress } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.linkedin = linkedin || user.linkedin;
    user.skills = skills || user.skills;
    user.walletAddress = walletAddress || user.walletAddress;
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
