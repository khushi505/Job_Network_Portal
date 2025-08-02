import React from "react";
import PERSON from "../assets/PERSON.png";
import WORK from "../assets/WORK.png";

export default function Dashboard() {
  return (
    <div className="relative bg-black text-white overflow-hidden flex items-center justify-between px-12">
      {/* Left Text Section */}
      <div className="max-w-[50%]">
        <h1 className="text-3xl font-bold mb-4">
          Your Career, Powered by AI and Blockchain.
        </h1>
        <p className="text-lg">
          Welcome to the Job & Network Portal — your all-in-one platform to
          discover opportunities, showcase your skills, and build meaningful
          professional connections. Our AI-powered matching, resume parsing, and
          blockchain-secured payments ensure a smarter, faster, and more secure
          hiring experience.
        </p>
      </div>

      {/* Right PERSON image (slightly pulled in from right) */}
      <div className="relative z-10 mt-30 mr-[70px]">
        {" "}
        {/* pull image to left */}
        <img
          src={PERSON}
          alt="Person working"
          className="w-[420px] h-auto object-contain"
        />
      </div>

      {/* Bottom Right WORK image */}
      <img
        src={WORK}
        alt="Work Icon"
        className="absolute bottom-[1em] right-1 w-45 h-auto"
      />
    </div>
  );
}
