import React from "react";

type Props = {
  text: string;
  errorMessage: string | undefined;
  children: React.ReactNode;
};

const InputContainer = ({ text, errorMessage, children }: Props) => {
  return (
    <div className="mb-5 flex flex-col w-full">
      <div className="w-full">
        <label className="text-black text-sm font-bold" htmlFor={text}>
          {text}
        </label>
        {children}
      </div>
      {errorMessage && (
        <span className="text-black pt-1 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputContainer;
