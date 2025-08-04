import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import Navbar from "./components/Navbar";
import { useAuth } from "./contexts/AuthContext.jsx";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import ResumeSkills from "./pages/ResumeSkills";
import SmartSuggestions from "./pages/SmartSuggestions";
import Journal from "./pages/Journal";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <main className="flex-grow overflow-auto">
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/post-job"
              element={user ? <PostJob /> : <Navigate to="/login" />}
            />
            <Route
              path="/jobs"
              element={user ? <Jobs /> : <Navigate to="/login" />}
            />
            <Route path="/resume-skills" element={<ResumeSkills />} />
            <Route path="/smart-suggestions" element={<SmartSuggestions />} />

            {/* ✅ Journal route – accessible to all */}
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
