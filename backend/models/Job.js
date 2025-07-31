import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [String],
    budget: { type: Number },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
