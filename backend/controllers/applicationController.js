import Application from "../models/applicationModel.js";
import Job from "../models/Job.js";

export const applyToJob = async (req, res) => {
  const { jobId } = req.body;

  try {
    const existing = await Application.findOne({
      job: jobId,
      applicant: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: req.user._id,
    });

    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ message: "Application failed" });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    }).populate("job");

    const jobs = applications.map((a) => a.job);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to load applied jobs" });
  }
};
