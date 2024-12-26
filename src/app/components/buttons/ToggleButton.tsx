"use client";

import { ReactNode } from "react";

interface ToggleButtonProps {
  type?: "submit" | "button";
  children: ReactNode;
  onClick?: () => void;
  active: boolean;
}

// Component for button to start game
const ToggleButton: React.FC<ToggleButtonProps> = ({ children, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex mb-5 mr-4 min-w-32 border-4 min-h-8 items-center justify-between px-6 py-2 hover:scale-105 sm:min-h-16 sm:min-w-64 sm:border-[6px] border-black rounded-full font-bold ${
        active
          ? "bg-darkGreen border-darkGreen text-white"
          : "bg-transparent hover:bg-darkGreen hover:border-darkGreen"
      }`}
    >
      {/* Text with hover effect */}
      <span
        className={`mr-2 text-md sm:text-lg font-extrabold ${
          active ? "text-white" : "text-black group-hover:text-white"
        }`}
      >
        {children}
      </span>
      {/* Arrow with hover effect */}
      <span
        className={`w-3 h-3 border-r-4 border-b-4 sm:w-6 sm:h-6 sm:border-r-[6px] sm:border-b-[6px] transform -rotate-45 ${
          active
            ? "border-white"
            : "border-black group-hover:border-white"
        }`}
      ></span>
    </button>
  );
};

export default ToggleButton;
