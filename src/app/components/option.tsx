"use client";

import { ReactNode } from "react";

interface OptionProps {
  children: ReactNode;
  onClick: ()=>void;
}

const Answers: React.FC<OptionProps> = ({children, onClick}) => {

  return (
    <div className="w-32" onClick={onClick}>
      {children}
    </div>
  );
};

export default Answers;
