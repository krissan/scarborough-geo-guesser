import { useEffect, useState } from "react";
import MainButton from "../components/buttons/MainButton";
import Image from "next/image";
import { addDailyHighScore, getDailyHighScores, peopleNouns, scarborough, verbs } from "../services/player";
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
const CongratulationSection: React.FC<CongratulationSectionProps> = ({ corrects, wrongs, playAgain, totalTime }) => {
  const [playerVerb, setPlayerVerb] = useState(0);
  const [playerScarborough, setPlayerScarborough] = useState(0);
  const [playerNoun, setPlayerNoun] = useState(0);
  const [highScores, setHighScores] = useState<DailyHighScoreResponse[]>([]);
  const [loadingHighScores, setLoadingHighScores] = useState(true);

  useEffect(() => {
    // Randomize the player's verb, scarborough, and noun
    setPlayerVerb(Math.floor(Math.random() * verbs.length));
    setPlayerScarborough(Math.floor(Math.random() * scarborough.length));
    setPlayerNoun(Math.floor(Math.random() * peopleNouns.length));
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingHighScores(true);
      const response = await getDailyHighScores();
      if(response)
      {
        setHighScores(response);
      }
      setLoadingHighScores(false);
    }
    fetchData();
  },[]);

  const handleScoreSubmit = async () => {
    setLoadingHighScores(true);
    const score = corrects - wrongs;
    console.log(playerVerb, playerScarborough, playerNoun, score);
    const response = await addDailyHighScore(playerVerb, playerScarborough, playerNoun, score);
    if(response)
    {
      setHighScores(response);
    }
    setLoadingHighScores(false);
  }

  return (
    <div className="flex flex-col items-center sm:flex-row sm:justify-around px-10">
      <div className="flex flex-col sm:mr-10">
        <div className="mb-4">
          <Title>CONGRATULATIONS</Title>
          <Title>SCARBOROUGH SPOTTER</Title>
          <div>{wrongs === 0 ? "Perfect Answers: " : "Correct Answers: "} {corrects - wrongs}</div>
          <div>Score: {(corrects-wrongs)*1000/totalTime}</div>
        </div>

        <HighScores highScores={highScores} loading={loadingHighScores}/>

        <div className="flex flex-col items-center mt-4">
          <div className="flex flex-row">
            <div className="mr-2">Verb:</div>
            <select value={playerVerb} onChange={(e) => setPlayerVerb(parseInt(e.target.value))}>
              {verbs.map((verb, index) => <option key={index} value={index}>{verb}</option>)}
            </select>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Scarborough:</div>
            <select value={playerScarborough} onChange={(e) => setPlayerScarborough(parseInt(e.target.value))}>
              {scarborough.map((scarborough, index) => <option key={index} value={index}>{scarborough}</option>)}
            </select>
          </div>
          <div className="flex flex-row">
            <div className="mr-2">Noun:</div>
            <select value={playerNoun} onChange={(e) => setPlayerNoun(parseInt(e.target.value))}>
              {peopleNouns.map((noun, index) => <option key={index} value={index}>{noun}</option>)}
            </select>
          </div>
          <MainButton onClick={handleScoreSubmit}>Submit Score</MainButton>
          <div>
            If your score is in top 3 so far of the day it will be displayed on the front page
          </div>
        </div>

        <MainButton onClick={playAgain}>Play Again</MainButton>
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
