import React, { useEffect, useState } from "react";
import { fetchJobs, applyToJob } from "../services/api";
import JobCard from "../components/JobCard";
import toast from "react-hot-toast";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false); // Toggle state for search bar

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

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.skills?.some((skill) => skill.toLowerCase().includes(query))
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="bg-black p-6 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Jobs</h2>

      {/* Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {showSearch ? "Hide Search ✖" : "Search Jobs 🔍"}
        </button>
      </div>

      {/* Collapsible Search Bar */}
      {showSearch && (
        <div className="flex justify-center mb-6 transition-all duration-300">
          <input
            type="text"
            placeholder="Search title, skills, location, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded bg-gray-700 text-white w-full max-w-2xl"
          />
        </div>
      )}

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onApply={() => handleApply(job._id)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
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
