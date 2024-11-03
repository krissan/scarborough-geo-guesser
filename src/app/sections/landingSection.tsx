import StartButton from "../components/startButton";
import Title from "../components/title";
import Image from "next/image";

interface LandingSectionProps {
  startGame: () => void; // Function to start the game
}

// Landing Screen for website
const LandingSection: React.FC<LandingSectionProps> = ({ startGame }) => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-around px-10">
      <div className="flex flex-col sm:mr-10">
        <div className="mb-4">
          <Title>SCARBOROUGH</Title>
          <Title>GEO-GUESSER</Title>
        </div>

        {/* Trigger startGame when Play button is clicked */}
        <StartButton onClick={startGame}>Play</StartButton>
      </div>

      <Image src="/assets/LandingImage.png" alt="Landing Image" width="100" height="40" className="object-contain mt-8 w-12 sm:w-32 sm:mt-0" />
    </div>
  );
};

export default LandingSection;
