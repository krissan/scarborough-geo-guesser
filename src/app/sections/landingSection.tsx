import MainButton from "../components/buttons/MainButton";
import Title from "../components/Title";
import Image from "next/image";
import { DailyHighScoreResponse } from "../services/responseInterfaces";
import HighScores from "./HighScores";

interface LandingSectionProps {
  startGame: () => void; // Function to start the game
  highScores: DailyHighScoreResponse[]; // List of highscores
  loadingHighScores: boolean;
}

// Landing Screen for website
const LandingSection: React.FC<LandingSectionProps> = ({ startGame, highScores, loadingHighScores }) => {
  
  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-around px-10">
      <div className="flex flex-col sm:mr-10">
        <div className="mb-4">
          <Title>SCARBOROUGH</Title>
          <Title>GEO-GUESSER</Title>
        </div>

        {highScores.length > 0 ? <HighScores highScores={highScores} loading={loadingHighScores} /> : <></> }

        {/* Trigger startGame when Play button is clicked */}
        <MainButton onClick={startGame}>Play</MainButton>
      </div>

      <Image src="/assets/LandingImage.png" alt="Landing Image" width="100" height="40" className="object-contain mt-8 w-12 sm:w-32 sm:mt-0" />
    </div>
  );
};

export default LandingSection;
