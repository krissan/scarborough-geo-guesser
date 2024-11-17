import { forwardRef } from "react";
import InputContainer from "./InputContainer";

interface Props extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  label: string;
  errormessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handle file change
  fileName?: string; // Display the file name after upload
}

const InputFile = forwardRef<HTMLInputElement, Props>(({ label, errormessage, onChange, fileName, ...props }, ref) => {
  return (
    <InputContainer text={label} id={props.id} errorMessage={errormessage}>
      <input
        {...props}
        ref={ref}
        type="file"
        accept=".csv"
        className="hidden" 
        onChange={onChange}
      />
      <label 
        htmlFor={props.id} 
        className="block cursor-pointer text-sm text-black font-bold py-3 px-6 border-2 border-black rounded-full bg-gray-200 hover:bg-gray-300 text-center"
      >
        {fileName ? `File: ${fileName}` : "Upload File"}
      </label>
    </InputContainer>
  );
});

InputFile.displayName = "InputFile";

export default InputFile;
