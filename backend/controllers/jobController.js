import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, skills, budget } = req.body;

    const job = new Job({
      user: req.user._id,
      title,
      description,
      skills,
      budget,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to post job" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("user", "name email");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
