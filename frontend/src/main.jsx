import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { SkillProvider } from "./contexts/SkillContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SkillProvider>
        {" "}
        {/* ✅ wrap inside this */}
        <App />
      </SkillProvider>
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
