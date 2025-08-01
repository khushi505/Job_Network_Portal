import express from "express";
import {
  createJob,
  getAllJobs,
  getJobsByCurrentUser,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getAllJobs);
router.get("/user", protect, getJobsByCurrentUser); // ✅ new

export default router;
