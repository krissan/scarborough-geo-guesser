import React from "react";

interface SubmitButtonProps {
  text: string; // Text to display on the button
  onClick?: () => void; // Optional click handler
  type?: "submit" | "button"; // Type of the button
  className?: string; // Additional className for customization
}

const CreateButton: React.FC<SubmitButtonProps> = ({
  text,
  onClick,
  type = "submit",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-6 py-3 bg-grey-200 font-bold text-black mb-20 border-4 border-black rounded-full shadow ${className}`}
    >
      {text}
    </button>
  );
};

export default CreateButton;