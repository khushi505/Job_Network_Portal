import React, { useEffect, useState } from "react";
import { fetchJobs, applyToJob } from "../services/api";
import { useSkills } from "../contexts/SkillContext";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const { extractedSkills } = useSkills();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await fetchJobs();
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };
    loadJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await applyToJob(jobId);
      toast.success("Applied successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">About Job & Network Portal</h1>
      <p className="mb-6">
        This is your hub to explore and post jobs, manage your profile, and
        connect professionally.
      </p>

      <h2 className="text-xl font-semibold mb-4">Latest Jobs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.slice(0, 6).map((job) => (
          <JobCard
            key={job._id}
            job={job}
            skills={extractedSkills}
            onApply={() => handleApply(job._id)}
          />
        ))}
      </div>
    </div>
  );
}
