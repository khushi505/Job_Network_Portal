import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        Job Portal
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/post-job" className="text-blue-600 font-medium">
              Post Job
            </Link>
            <Link to="/profile" className="text-blue-600 font-medium">
              Profile
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
