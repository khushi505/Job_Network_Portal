import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchMyJobs, getAppliedJobs } from "../services/api";
import ResumeSkillExtractor from "../components/ResumeSkillExtractor";

export default function Profile() {
  const { user } = useAuth();
  const [myJobs, setMyJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res1 = await fetchMyJobs();
        setMyJobs(res1.data);
        const res2 = await getAppliedJobs();
        setAppliedJobs(res2.data);
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
    };

    if (user) loadJobs();
  }, [user]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Profile header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <span role="img" aria-label="profile">
              👤
            </span>
            Your Profile
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>

        {/* User details card */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6 space-y-2">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>LinkedIn:</strong> {user?.linkedin || "Not set"}
          </p>
          <p>
            <strong>Wallet:</strong> {user?.walletAddress || "Not set"}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            {user?.skills?.length > 0 ? user.skills.join(", ") : "None"}
          </p>
        </div>

        <ResumeSkillExtractor />

        {/* Jobs You Posted */}
        <h3 className="text-xl font-bold mt-6 mb-2 text-red-300">
          📌 Jobs You Posted
        </h3>
        {myJobs.length === 0 ? (
          <p className="text-gray-400">No jobs posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myJobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-600"
              >
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <p className="mt-2">{job.description}</p>
                <p className="mt-1 text-sm text-gray-400">
                  Budget: ₹{job.budget} | Location:{" "}
                  {job.location || "Not specified"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Jobs You Applied To */}
        <h3 className="text-xl font-bold mt-8 mb-2 text-pink-300">
          📥 Jobs You Applied To
        </h3>
        {appliedJobs.length === 0 ? (
          <p className="text-gray-400 italic">No applications yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliedJobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-800 rounded-xl shadow-md p-4 border border-gray-600"
              >
                <h4 className="text-lg font-semibold">{job.title}</h4>
                <p className="mt-2">{job.description}</p>
                <p className="mt-1 text-sm text-gray-400">
                  Budget: ₹{job.budget} | Location:{" "}
                  {job.location || "Not specified"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
