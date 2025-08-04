import express from "express";
import {
  createJournalPost,
  getAllJournalPosts,
} from "../controllers/journalController.js";
import { protect } from "../middleware/authMiddleware.js";

// ✅ must match exact file name & path

const router = express.Router();

router.post("/", protect, createJournalPost); // ✅ protected route
router.get("/", getAllJournalPosts); // public

// your routes...

export default router;
