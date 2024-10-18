import StartButton from "../components/startButton";
import Title from "../components/title";
import Image from "next/image";

interface CongratulationSectionProps {
  corrects: number;
  wrongs: number;
  playAgain: () => void;
}

const CongratulationSection: React.FC<CongratulationSectionProps> = ({ corrects, wrongs, playAgain }) => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-around px-10">
      <div className="flex flex-col sm:mr-10">
        <div className="mb-4">
          <Title>CONGRATULATIONS</Title>
          <Title>SCARBOROUGH SPOTTER</Title>
          <div>{wrongs === 0 ? "Perfect Score: " : "Score: "} {corrects - wrongs}</div>
        </div>

        <StartButton onClick={playAgain}>Play Again</StartButton>
      </div>

      <Image
        src="/assets/LandingImage.png"
        alt="Landing Image"
        width="100"
        height="40"
        className="object-contain mt-8 w-12 sm:w-32 sm:mt-0"
      />
    </div>
  );
};

export default CongratulationSection;
