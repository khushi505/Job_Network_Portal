import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const fetchJobs = () => API.get("/jobs");
export const postJob = (jobData) => API.post("/jobs", jobData);
export const fetchMyJobs = () => API.get("/jobs/user"); // ✅ new
export const applyToJob = (jobId) => API.post("/applications/apply", { jobId });
export const getAppliedJobs = () => API.get("/applications/applied");
