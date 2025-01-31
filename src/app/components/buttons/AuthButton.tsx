import React from "react";

interface AuthButtonProps { 
  type?: "submit" | "button";
  text: string;
  onClick?: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ type, text, onClick }) => (
  <button
    type={type}
    className="w-full py-3 bg-green text-white font-semibold rounded-full hover:bg-green-700 hover:bg-darkGreen hover:scale-105"
    onClick={onClick}
  >
   {text}
  </button>
);

export default AuthButton;
