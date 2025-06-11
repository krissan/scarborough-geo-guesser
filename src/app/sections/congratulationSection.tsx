import Image from "next/image";
import Title from "../components/title";

interface CongratulationSectionProps {
  corrects: number;
  wrongs: number;
  playAgain: () => void;
  totalTime: number;
}

// Win screen for game
const CongratulationSection: React.FC<CongratulationSectionProps> = ({
  corrects,
  wrongs,
  totalTime,
}) => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-around px-10">
      <div className="flex flex-col sm:mr-10">
        <div className="mb-4 text-center sm:text-left">
          <Title>CONGRATULATIONS</Title>
          <Title>SCARBOROUGH SPOTTER</Title>
          <div className="text-center sm:text-left mt-4">
            <div className="text-lg font-bold text-green">
              {wrongs === 0 ? "Perfect Answers: " : "Correct Answers: "}
              <span className="font-bold text-black">{corrects - wrongs}</span>
            </div>
            <div className="text-lg font-semibold text-blue">
              Score:{" "}
              <span className="font-bold text-black">
                {((corrects - wrongs) * 1000) / totalTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Image
        src="/assets/LandingImage.png"
        alt="Landing Image"
        width={100}
        height={40}
        className="object-contain mt-8 w-12 sm:w-32 sm:mt-0"
      />
    </div>
  );
};

export default CongratulationSection;
