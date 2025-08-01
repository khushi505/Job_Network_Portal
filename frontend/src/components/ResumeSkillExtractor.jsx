import React, { useState } from "react";
import axios from "axios";

export default function ResumeSkillExtractor() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/extract_skills",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.skills) {
        setSkills(res.data.skills);
        // ✅ Removed alert
      } else {
        alert("No skills found.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Skill extraction failed.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg mt-8 space-y-4">
      <h3 className="text-xl font-bold">AI Resume Skill Extractor</h3>

      <div className="flex items-center gap-4">
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="fileInput"
          className="bg-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
        >
          {file ? file.name : "Choose File"}
        </label>

        <button
          onClick={handleUpload}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Extract Skills
        </button>
      </div>

      {skills.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold text-green-300">Extracted Skills:</p>
          <ul className="list-disc list-inside">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
