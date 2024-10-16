"use client";

import { ReactNode } from 'react';

interface StartButtonProps {
  children: ReactNode;
  onClick?: () => void;  // Add an optional onClick handler for external control
}

const StartButton: React.FC<StartButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex min-w-32 border-4 min-h-10 items-center justify-between px-6 py-2 sm:h-20 sm:min-w-64 sm:border-8 border-black rounded-full text-black font-bold bg-transparent"
    >
      <span className="mr-2 text-lg sm:text-xl font-extrabold ">{children}</span>
      <span className="w-3 h-3 border-r-4 border-b-4 sm:w-6 sm:h-6 sm:border-r-8 sm:border-b-8 border-black transform -rotate-45"></span>
    </button>
  );
};

export default StartButton;
