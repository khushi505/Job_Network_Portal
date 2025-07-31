import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const { title, description, skills, budget } = req.body;
  const job = await Job.create({
    user: req.user._id,
    title,
    description,
    skills,
    budget,
  });
  res.status(201).json(job);
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate("user", "name");
  res.json(jobs);
};
