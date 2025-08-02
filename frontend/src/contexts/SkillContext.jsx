import React, { createContext, useContext, useEffect, useState } from "react";

const SkillContext = createContext();

export const SkillProvider = ({ children }) => {
  const [extractedSkills, setExtractedSkills] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("extractedSkills");
    if (saved) setExtractedSkills(JSON.parse(saved));
  }, []);

  const updateSkills = (skills) => {
    setExtractedSkills(skills);
    localStorage.setItem("extractedSkills", JSON.stringify(skills));
  };

  return (
    <SkillContext.Provider value={{ extractedSkills, updateSkills }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => useContext(SkillContext);
