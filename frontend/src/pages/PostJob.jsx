import React, { useState } from "react";
import { postJob } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = skills.split(",").map((s) => s.trim());
      await postJob({
        title,
        description,
        skills: skillsArray,
        budget,
        location,
      });
      navigate("/jobs");
    } catch (err) {
      console.error("Failed to post job", err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Job Title"
            className="bg-black text-white border border-gray-700 rounded-md p-2 w-full mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Job Description"
            className="bg-black text-white border border-gray-700 rounded-md p-2 w-full mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="bg-black text-white border border-gray-700 rounded-md p-2 w-full mb-4"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            type="number"
            placeholder="Budget"
            className="bg-black text-white border border-gray-700 rounded-md p-2 w-full mb-4"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="bg-black text-white border border-gray-700 rounded-md p-2 w-full mb-4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
