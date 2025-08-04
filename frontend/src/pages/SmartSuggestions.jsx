import React, { useEffect, useState } from "react";
import { getSmartJobSuggestions } from "../services/api";

export default function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 6;
  const totalPages = Math.ceil(suggestions.length / jobsPerPage);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await getSmartJobSuggestions();
        setSuggestions(res.data);
      } catch (err) {
        console.error("Smart Suggestion Error:", err);
        alert("Failed to fetch smart job suggestions. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = suggestions.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">
        AI-Powered Job Recommendations
      </h1>

      {loading ? (
        <p>Loading suggestions...</p>
      ) : currentJobs.length === 0 ? (
        <p>No job suggestions found based on your profile.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <div
                key={job._id || job.id}
                className="border border-white p-4 rounded-lg bg-gray-900"
              >
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-300 mt-1">{job.description}</p>
                <p className="mt-2 text-blue-400 text-sm">
                  Match Score:{" "}
                  <span className="font-semibold">{job.score.toFixed(2)}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-white mt-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
