import React from "react";

interface SubmitButtonProps {
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text }) => (
  <button
    type="submit"
    className="w-full py-2 bg-green text-white font-bold rounded-full hover:bg-green-700"
  >
   Submit
  </button>
);

export default SubmitButton;
