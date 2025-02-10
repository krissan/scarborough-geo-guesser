import { useEffect, useState } from "react";
import MainButton from "../components/buttons/MainButton";
import Image from "next/image";
import {
  addDailyHighScore,
  getDailyHighScores,
  peopleNouns,
  scarborough,
  verbs,
} from "../services/player";
import { DailyHighScoreResponse } from "../services/responseInterfaces";
import HighScores from "./HighScores";
import Title from "../components/Title";

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
  playAgain,
  totalTime,
}) => {
  const [playerVerb, setPlayerVerb] = useState(0);
  const [playerScarborough, setPlayerScarborough] = useState(0);
  const [playerNoun, setPlayerNoun] = useState(0);
  const [highScores, setHighScores] = useState<DailyHighScoreResponse[]>([]);
  const [loadingHighScores, setLoadingHighScores] = useState(true);

  useEffect(() => {
    // Randomize the player's verb, Scarborough, and noun
    setPlayerVerb(Math.floor(Math.random() * verbs.length));
    setPlayerScarborough(Math.floor(Math.random() * scarborough.length));
    setPlayerNoun(Math.floor(Math.random() * peopleNouns.length));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingHighScores(true);
      const response = await getDailyHighScores();
      if (response) {
        setHighScores(response);
      }
      setLoadingHighScores(false);
    };
    fetchData();
  }, []);

  const handleScoreSubmit = async () => {
    setLoadingHighScores(true);
    const score = corrects - wrongs;
    const response = await addDailyHighScore(
      playerVerb,
      playerScarborough,
      playerNoun,
      score
    );
    if (response) {
      setHighScores(response);
    }
    setLoadingHighScores(false);
  };

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
    Score: <span className="font-bold text-black">{((corrects - wrongs) * 1000) / totalTime}</span>
  </div>
</div>

        </div>

        <HighScores highScores={highScores} loading={loadingHighScores} />

        <div className="flex flex-col items-center mt-4 mb-5 space-y-3">
          {["Verb", "Scarborough", "Noun"].map((label, index) => {
            const stateSetters = [setPlayerVerb, setPlayerScarborough, setPlayerNoun];
            const options = [verbs, scarborough, peopleNouns][index];
            const value = [playerVerb, playerScarborough, playerNoun][index];

            return (
              <div key={label} className="flex flex-row items-center space-x-2">
                <div className="font-semibold">{label}:</div>
                <select
                  value={value}
                  onChange={(e) => stateSetters[index](parseInt(e.target.value))}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-black shadow-md hover:border-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  {options.map((option, idx) => (
                    <option key={idx} value={idx}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}

          <MainButton onClick={handleScoreSubmit}>Submit Score</MainButton>
          <div className="mt-5 text-center text-sm">
            If your score is in the top 3 so far of the day, it will be displayed on the front page.
          </div>
        </div>

        <MainButton onClick={playAgain}>Play Again</MainButton>
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