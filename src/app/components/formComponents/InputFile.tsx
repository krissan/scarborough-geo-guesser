import { forwardRef } from "react";
import InputContainer from "./InputContainer";
import { FiUpload } from "react-icons/fi"; // Import the upload icon

interface Props extends React.PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  label: string;
  errormessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handle file change
  fileName?: string; // Display the file name after upload
}

const InputFile = forwardRef<HTMLInputElement, Props>(
  ({ label, errormessage, onChange, fileName, ...props }, ref) => {
    return (
      <InputContainer text={label} errorMessage={errormessage}>
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
          className="flex items-center justify-center gap-2 cursor-pointer text-white text-sm font-bold py-3 px-6 rounded-full bg-[#636262] hover:bg-[#444444] text-center"
        >
          {fileName ? `File: ${fileName}` : "Upload File"}
          <FiUpload className="text-lg" />
          
        </label>
      </InputContainer>
    );
  }
);

InputFile.displayName = "InputFile";

export default InputFile;
