import express from "express";
import { getSmartJobSuggestions } from "../controllers/smartSuggestionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/jobs", protect, getSmartJobSuggestions);

export default router;
