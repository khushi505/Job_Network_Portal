import React, { useEffect, useState } from "react";
import { fetchJobs, applyToJob } from "../services/api";
import toast from "react-hot-toast";
import JobCard from "../components/JobCard";
import { useSkills } from "../contexts/SkillContext";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
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

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Jobs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onApply={handleApply}
            extractedSkills={extractedSkills}
          />
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-40"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
