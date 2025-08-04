import JournalPost from "../models/JournalPost.js";

export const createJournalPost = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }

  const newPost = new JournalPost({
    title,
    content,
    tags,
    postedBy: req.user._id,
  });

  const saved = await newPost.save();
  res.status(201).json(saved);
};

export const getAllJournalPosts = async (req, res) => {
  const posts = await JournalPost.find()
    .populate("postedBy", "name email")
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
};
