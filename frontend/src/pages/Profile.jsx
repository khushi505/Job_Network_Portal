import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchMyJobs, getAppliedJobs } from "../services/api";
import JobCard from "../components/JobCard";
import { useSkills } from "../contexts/SkillContext";

export default function Profile() {
  const { user } = useAuth();
  const { extractedSkills } = useSkills();
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <span role="img" aria-label="profile">
              👤
            </span>{" "}
            Your Profile
          </h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>

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

        <h3 className="text-xl font-bold mt-6 mb-2 text-red-300">
          📌 Jobs You Posted
        </h3>
        {myJobs.length === 0 ? (
          <p className="text-gray-400">No jobs posted yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myJobs.map((job) => (
              <JobCard key={job._id} job={job} hideScore={true} />
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold mt-8 mb-2 text-pink-300">
          📥 Jobs You Applied To
        </h3>
        {appliedJobs.length === 0 ? (
          <p className="text-gray-400 italic">No applications yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliedJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                extractedSkills={extractedSkills}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
