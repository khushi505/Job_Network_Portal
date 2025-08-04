import React, { useEffect, useState } from "react";
import { fetchJournalPosts, createJournalPost } from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext"; // Assumes you're using context

export default function Journal() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetchJournalPosts();
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts(); // ✅ call it here
  }, []); // ✅ closes useEffect here

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      return toast.error("Title and content are required");
    }

    try {
      const newPost = {
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()),
      };

      const res = await createJournalPost(newPost);
      setPosts((prev) => [res.data, ...prev]); // Add to top
      toast.success("Journal posted!");
      setTitle("");
      setContent("");
      setTags("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Public Journal</h1>

      {/* Create Journal Form */}
      {user && (
        <form
          onSubmit={handleCreatePost}
          className="bg-gray-800 p-6 rounded-lg mb-10 max-w-3xl mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4">Create a New Journal</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-3 px-4 py-2 rounded bg-gray-700 text-white"
          />

          <textarea
            placeholder="Write your thoughts or achievements here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-3 px-4 py-2 rounded bg-gray-700 text-white"
            rows={5}
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-700 text-white"
          />

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Post Journal
          </button>
        </form>
      )}

      {/* Journal Feed */}
      {loading ? (
        <p className="text-center text-gray-400">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No journal entries yet.</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 p-5 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-1">{post.title}</h3>
              <p className="text-sm text-gray-400 mb-2">
                Posted by {post.postedBy?.name || "Unknown"} on{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <p className="mb-3">{post.content}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-700 text-sm rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
