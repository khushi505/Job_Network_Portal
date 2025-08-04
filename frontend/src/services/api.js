import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Attach token from localStorage to every request
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// ✅ Job APIs
export const fetchJobs = () => API.get("/jobs");
export const postJob = (jobData) => API.post("/jobs", jobData);
export const fetchMyJobs = () => API.get("/jobs/user");
export const applyToJob = (jobId) => API.post("/applications/apply", { jobId });
export const getAppliedJobs = () => API.get("/applications/applied");

// ✅ Smart Suggestions (AI-powered)
export const getSmartJobSuggestions = () => API.get("/suggestions/jobs");

// ✅ Update user profile (e.g. with extracted skills)
export const updateUserProfile = (data) => API.put("/users/profile", data);

// ✅ Update post (e.g. for job post editing)
export const updatePost = (postId, data) => API.put(`/posts/${postId}`, data);

// ✅ Journal Post APIs
export const createJournalPost = (data) => API.post("/journal", data);
export const fetchJournalPosts = () => API.get("/journal");
