import React from "react";

type Props = {
  text: string;
  id: string | undefined;
  errorMessage: string | undefined;
  children: React.ReactNode;
};

const InputContainer = ({ text, id, errorMessage, children }: Props) => {
  return (
    <div className="mb-5 flex flex-col w-full">
      <div className="w-full">
        {children}
      </div>
      {errorMessage && (
        <span className="text-black pt-1 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputContainer;
