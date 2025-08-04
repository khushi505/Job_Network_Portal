import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black border-b border-gray-700 px-6 py-4 shadow-md flex justify-between items-center text-white">
      <Link to="/dashboard" className="text-xl font-bold text-blue-500">
        Job Portal
      </Link>
      <div className="ml-auto flex gap-4 items-center">
        {user ? (
          <>
            <a
              href="/jobs"
              className="text-white hover:text-blue-300 font-medium border border-blue-500 px-3 py-1 rounded"
            >
              Jobs
            </a>
            <Link
              to="/post-job"
              className="text-white hover:text-blue-500 font-medium border border-blue-500 px-3 py-1 rounded"
            >
              Post Job
            </Link>
            <Link
              to="/resume-skills"
              className="hover:text-blue-400 font-medium border border-blue-500 px-3 py-1 rounded"
            >
              Resume Skills
            </Link>
            <Link
              to="/smart-suggestions"
              className="hover:text-blue-400 font-medium border border-blue-500 px-3 py-1 rounded"
            >
              Smart Suggestions
            </Link>
            {/* ✅ New Explore (Journal) link */}
            <Link
              to="/journal"
              className="hover:text-blue-400 font-medium border border-blue-500 px-3 py-1 rounded"
            >
              Explore
            </Link>
            <Link
              to="/profile"
              className="text-white hover:text-blue-500 border border-blue-500 px-3 py-1 rounded font-medium"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-blue-500 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-blue-500 font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
