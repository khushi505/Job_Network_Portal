import Job from "../models/Job.js";

// Create a job
export const createJob = async (req, res) => {
  try {
    const { title, description, skills, budget, location } = req.body;

    const newJob = await Job.create({
      title,
      description,
      skills,
      budget,
      location,
      createdBy: req.user._id,
    });

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job." });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs." });
  }
};

// Get jobs by current user
export const getJobsByCurrentUser = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your jobs" });
  }
};
