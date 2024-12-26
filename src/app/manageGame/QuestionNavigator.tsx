interface QuestionNavigatorProps {
  completed: number;
  setCurrentIndex: (index: number) => void; // Function to set currentIndex
  currentIndex: number;
  length: number;
}

const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({ completed, setCurrentIndex, currentIndex, length }) => {
  // create navigation points of amount length
  return (
    <div className="flex items-center justify-center w-full flex-wrap py-8 px-10">
      {Array.from({ length: length }, (_, index) => index).map((_, index) => (
        <div
          key={index}
          className={`flex flex-col items-center text-center w-14 md:w-24`}
          onClick={index < completed + 1 ? () => setCurrentIndex(index) : undefined} // Conditionally set onClick
        >
          {/* Line behind the circle */}
          <div
            className="relative top-2.5 left-6 w-14 md:top-5 md:left-8 h-1 md:h-2 md:w-24 z-0"
            style={
              index < length
                ? index > completed - 1 ? { backgroundColor: "gray" } : { backgroundColor: "green" }
                : { backgroundColor: "transparent" }
            }
          />

          {/* Circle */}
          <div
            className={`w-4 h-4 md:w-8 md:h-8 rounded-full z-10 ${index < completed + 1 ? "hover:scale-110 " : ""}${index == currentIndex ? "scale-110":""}`}
            style={index < completed + 1 ? { backgroundColor: "green" } : { backgroundColor: "gray" }}
          />

          {/* Location Text */}
          <span className="mt-2 text-xs md:text-sm h-6 md:h-12 text-black">
            {index}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuestionNavigator;
