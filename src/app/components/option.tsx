"use client";

import { ReactNode } from "react";

interface OptionProps {
  children: ReactNode;
  onClick: ()=>void;
}

// Component for option in multiple choice question
const Answers: React.FC<OptionProps> = ({children, onClick}) => {

  return (
    <div className="w-32" onClick={onClick}>
      {children}
    </div>
  );
};

export default Answers;
