import User from "../models/user.js";
import jwt from "jsonwebtoken";

// @desc    Get logged-in user's profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update logged-in user's profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Update only editable fields
    if (req.body.linkedin !== undefined) {
      user.linkedin = req.body.linkedin;
    }

    if (req.body.walletAddress !== undefined) {
      user.walletAddress = req.body.walletAddress;
    }

    if (req.body.skills !== undefined) {
      user.skills = Array.isArray(req.body.skills)
        ? req.body.skills
        : req.body.skills.split(",").map((s) => s.trim());
    }

    const updatedUser = await user.save();

    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      linkedin: updatedUser.linkedin,
      walletAddress: updatedUser.walletAddress,
      skills: updatedUser.skills,
      token,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Update failed" });
  }
};
