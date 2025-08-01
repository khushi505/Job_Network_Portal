import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import API from "../api/axios";

export default function Profile() {
  const { user, login } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    linkedin: "",
    walletAddress: "",
    skills: "",
  });
  const [jobsPosted, setJobsPosted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        bio: user.bio || "",
        linkedin: user.linkedin || "",
        walletAddress: user.walletAddress || "",
        skills: user.skills?.join(", ") || "",
      });
    }
  }, [user]);

  useEffect(() => {
    async function fetchMyJobs() {
      try {
        const res = await API.get("/jobs");
        const myJobs = res.data.filter((job) => job.user._id === user._id);
        setJobsPosted(myJobs);
      } catch (err) {
        console.error("Error loading jobs", err);
      } finally {
        setLoading(false);
      }
    }

    if (user) fetchMyJobs();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put("/users/profile", {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      });
      login(res.data);
      setEditMode(false);
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">👤 Your Profile</h1>

      <div className="bg-white shadow p-4 rounded mb-6">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        {editMode ? (
          <div className="space-y-2 mt-4">
            <input
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="walletAddress"
              placeholder="Wallet Address"
              value={formData.walletAddress}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-1">
            <p>
              <span className="font-semibold">LinkedIn:</span>{" "}
              {user.linkedin || "Not set"}
            </p>
            <p>
              <span className="font-semibold">Wallet:</span>{" "}
              {user.walletAddress || "Not set"}
            </p>
            <p>
              <span className="font-semibold">Skills:</span>{" "}
              {user.skills?.join(", ") || "None"}
            </p>
            <p>
              <span className="font-semibold">Bio:</span> {user.bio || ""}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-2">📌 Jobs You Posted</h2>
      {loading ? (
        <p>Loading...</p>
      ) : jobsPosted.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobsPosted.map((job) => (
            <div key={job._id} className="border p-4 rounded bg-gray-50">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p>{job.description}</p>
              <p className="text-sm text-gray-600">
                Skills: {job.skills.join(", ")}
              </p>
              <p className="text-sm text-gray-600">Budget: ₹{job.budget}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
