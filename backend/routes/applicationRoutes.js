import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  applyToJob,
  getAppliedJobs,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/apply", protect, applyToJob);
router.get("/applied", protect, getAppliedJobs);

export default router;
