"use client";

import { forwardRef } from "react";
import InputContainer from "./InputContainer";


interface Props extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  label: string;
  errormessage?: string;
}

const TextInput = forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
  return (
    <InputContainer
      text={props.label}
      id={props.id}
      errorMessage={props.errormessage}
    >
      <input
        {...props}
        ref={ref}
        className={`block p-2.5 w-full text-bold placeholder-darkGray text-black bg-lightGray font-bold shadow-sm  ${className || ""}`}
      />
    </InputContainer>
  );
});

TextInput.displayName = "TextInput";

export default TextInput;