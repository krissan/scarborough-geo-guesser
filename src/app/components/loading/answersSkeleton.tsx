//Loading component for answers
const AnswersSkeleton = () => {
  return (
    <div className="flex flex-col items-center mx-auto md:grid md:grid-cols-2 md:gap-4 w-8/12 md:justify-items-center">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex flex-row items-center justify-start p-2 mt-4 rounded-lg border-black border-2 w-48 min-h-10 text-left
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-300"
        >
          <div className="pl-2 pr-4 h-4 w-6 bg-gray-400 rounded-md"></div>
          <div className="h-4 w-3/5 bg-gray-400 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default AnswersSkeleton;
