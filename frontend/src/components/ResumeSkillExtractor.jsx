import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSkills } from "../contexts/SkillContext";
import { updateUserProfile } from "../services/api";

export default function ResumeSkillExtractor() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [localSkills, setLocalSkills] = useState([]);
  const { updateSkills } = useSkills();

  // ✅ Load extracted skills on mount (resume preview won't work with blob)
  useEffect(() => {
    const savedSkills = localStorage.getItem("extractedSkills");
    if (savedSkills) setLocalSkills(JSON.parse(savedSkills));
  }, []);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      const fileURL = URL.createObjectURL(uploadedFile);
      setFile(uploadedFile);
      setPreviewUrl(fileURL); // ✅ preview only for current session
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/extract_skills",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const extracted = res.data.skills || [];

      setLocalSkills(extracted); // local UI
      updateSkills(extracted); // global + localStorage via context
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Skill extraction failed.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Left: PDF Preview (only works this session) */}
      <div className="w-full lg:w-1/2 bg-gray-900 rounded-lg p-4">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            title="Resume Preview"
            width="100%"
            height="600px"
            className="rounded border border-gray-700"
          />
        ) : (
          <p className="text-gray-400 italic">No resume preview available.</p>
        )}
      </div>

      {/* Right: Extractor */}
      <div className="w-full lg:w-1/2 bg-gray-900 rounded-lg p-6 space-y-4">
        <div className="flex gap-4">
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="bg-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
          >
            {file ? file.name : "Choose PDF"}
          </label>
          <button
            onClick={handleUpload}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Extract Skills
          </button>
        </div>

        {localSkills.length > 0 && (
          <div>
            <p className="font-semibold text-green-400">Extracted Skills:</p>
            <ul className="list-disc list-inside space-y-1">
              {localSkills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
