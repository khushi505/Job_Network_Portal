import User from "../models/User.js";
import Job from "../models/Job.js";
import axios from "axios";

export const getSmartJobSuggestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.skills || user.skills.length === 0) {
      return res.status(400).json({ error: "User has no extracted skills" });
    }

    const jobs = await Job.find();
    if (!jobs || jobs.length === 0) {
      return res.status(400).json({ error: "No jobs found" });
    }

    const user_profile = `I am a software developer skilled in ${user.skills.join(
      ", "
    )}. My background includes ${user.bio || "software development"}`;

    const job_listings = jobs.map((job) => ({
      id: job._id,
      title: job.title || "",
      description: job.description || "",
      skills: job.skills || [],
    }));

    console.log("✅ Skills being used:", user.skills);
    console.log("📤 Sending to Flask...");
    console.log("User profile:", user_profile);
    console.log("Job count:", job_listings.length);

    const response = await axios.post(
      "http://localhost:5001/smart_suggestions",
      {
        user_profile,
        job_listings,
      }
    );

    return res.json(response.data);
  } catch (err) {
    console.error("🔥 Smart Suggestion Error:", err.message);
    return res.status(500).json({ error: "Failed to get smart suggestions" });
  }
};
