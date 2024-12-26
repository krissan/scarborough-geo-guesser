"use client";

import { ReactNode, useState } from "react";

interface MainButtonProps {
  type?: "submit" | "button";
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

// Component for button to start game
const MainButton: React.FC<MainButtonProps> = ({ children, onClick, disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    if (onClick) await onClick();
    setLoading(false);
  };
  
  return (
    <button
      onClick={!disabled || loading ? handleClick : undefined}
      disabled={disabled || loading}
      className={`group flex mb-5 mr-4 min-w-32 border-4 min-h-8 items-center justify-between px-6 py-2 sm:min-h-16 sm:min-w-64 sm:border-[6px] rounded-full font-bold ${
        disabled || loading
          ? "bg-darkGray border-darkGray cursor-not-allowed"
          : "bg-transparent border-black hover:scale-105 hover:bg-darkGreen hover:border-darkGreen"
      }`}
    >
      {/* Text */}
      <span
        className={`mr-2 text-md sm:text-lg font-extrabold ${
          disabled || loading ? "text-white" : "text-black group-hover:text-white"
        }`}
      >
        {children}
      </span>
      {/* Arrow */}
      <span
        className={`w-3 h-3 border-r-4 border-b-4 sm:w-6 sm:h-6 sm:border-r-[6px] sm:border-b-[6px] transform -rotate-45 ${
          disabled || loading ? "border-white" : "border-black group-hover:border-white"
        }`}
      ></span>
    </button>
  );
};

export default MainButton;
