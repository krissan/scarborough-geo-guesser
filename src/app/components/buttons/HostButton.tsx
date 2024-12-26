import React from "react";

interface SubmitButtonProps {
  text: string; // Text to display on the button
  onClick?: () => void; // Optional click handler
  type?: "submit" | "button"; // Type of the button
  className?: string; // Additional className for customization
  loading?: boolean; // Loading state
  disabled?: boolean; // Disabled state
}

const HostButton: React.FC<SubmitButtonProps> = ({
  text,
  onClick,
  type = "submit",
  className = "",
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-6 py-3 font-bold rounded-full shadow 
      ${disabled ? "text-white bg-darkGreen"
        : loading ? "animate-pulse text-white bg-darkGreen transition-all ease-in-out duration-200" : "border-4 text-green bg-transparent hover:text-white hover:bg-darkGreen hover:scale-105 hover:border-darkGreen transition-all ease-in-out duration-200"} 
      ${className}`}
      disabled={loading || disabled}
    >
      {text}
    </button>
  );
};

export default HostButton;
