import React, { useEffect, useState } from "react";
import { fetchJobs, applyToJob } from "../services/api";
import toast from "react-hot-toast";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

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

      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-600"
          >
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-400">
              By {job.createdBy?.name || "Unknown"}
            </p>
            <p className="mt-2">{job.description}</p>
            <p className="mt-1 text-sm text-gray-400">
              Budget: ₹{job.budget} | Location:{" "}
              {job.location || "Not specified"}
            </p>

            <div className="mt-4 flex flex-wrap justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleApply(job._id)}
                className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-full ml-2 mt-2"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
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
