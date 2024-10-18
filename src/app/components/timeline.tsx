interface TimelineStop {
  location: string;
  color: string;
}

interface TimeLineProps {
  corrects: number;
  setCurrentIndex: (index: number) => void; // Function to set currentIndex
  currentIndex: number;
}

const TimeLine: React.FC<TimeLineProps> = ({ corrects, setCurrentIndex, currentIndex }) => {
  const timeline: TimelineStop[] = [
    { location: "Kennedy", color: "green" },
    { location: "Victoria Park", color: "green" },
    { location: "Warden", color: "green" },
    { location: "Lawrence", color: "blue" },
    { location: "Ellesmere", color: "blue" },
    { location: "Midland", color: "blue" },
    { location: "STC", color: "blue" },
    { location: "McCowan", color: "blue" },
    { location: "Malvern", color: "orange" },
  ];

  // Only show stops up to the number of correct answers
  const visibleStops = timeline.slice(0, corrects + 1);

  return (
    <div className="flex items-center justify-center w-full flex-wrap py-8 px-10">
      {visibleStops.map((stop, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center w-14 md:w-24 cursor-pointer"
          onClick={() => setCurrentIndex(index)} // Set currentIndex on click
        >
          {/* Line behind the circle */}
          <div
            className="relative top-2.5 left-6 w-14 md:top-5 md:left-8 h-1 md:h-2 md:w-24 z-0"
            style={
              index < visibleStops.length - 1
                ? { backgroundColor: stop.color }
                : { backgroundColor: "transparent" }
            }
          />

          {/* Circle */}
          <div
            className={`w-4 h-4 md:w-8 md:h-8 rounded-full z-10 hover:scale-110  ${index == currentIndex ? "scale-110":""}`}
            style={{ backgroundColor: stop.color }}
          />

          {/* Location Text */}
          <span className={`mt-2 text-xs md:text-sm h-6 md:h-12 ${index == currentIndex ? "font-black":""}`}>
            {stop.location}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
