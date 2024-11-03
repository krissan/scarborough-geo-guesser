"use client";

export interface Option {
  option: string;
  selected: boolean;
}

interface AnswersProps {
  options: Option[]; // Array of options
  answer: number; // Index of the correct answer
  increaseCorrects: (index: number, option: number) => void;
  increaseWrongs: (index: number, option: number) => void;
  imageIndex: number;
}

const Answers: React.FC<AnswersProps> = ({
  options,
  answer,
  increaseCorrects,
  increaseWrongs,
  imageIndex,
}) => {
  const handleAnswerSelection = (index: number) => {
    if (!options[index].selected) {
      if (answer === index) {
        increaseCorrects(imageIndex, index);
      } else {
        increaseWrongs(imageIndex, index);
      }
    }
  };

  return (
    <div className="h-24">
      <div className="flex flex-col py-6 items-center mx-auto md:grid md:grid-cols-2 md:gap-4 w-8/12 md:justify-items-center">
        {options.map((item, index) => (
          <button
            key={item.option+imageIndex}
            disabled={item.selected || options[answer].selected}
            onClick={() => handleAnswerSelection(index)}
            className={`flex flex-row items-center justify-start p-2 mt-4 rounded-lg border-black border-2 hover:border-4 w-48 min-h-10 text-left
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
              hover:${item.selected || options[answer].selected ? "":"shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"}
              transition-shadow duration-200 ease-in-out
              ${item.selected && index === answer ? "bg-green text-white" : ""}
              ${item.selected && index !== answer ? "bg-red text-white" : ""}
              ${!item.selected && !options[answer].selected ? "bg-white text-black hover:font-bold" : ""}`}
          >
            <div className="pl-2 pr-4">{index+1}.</div>{item.option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Answers;
