import SubTitle from "../components/SubTitle";
import { DailyHighScoreResponse } from "../services/responseInterfaces";

interface HighScoresProps {
  highScores: DailyHighScoreResponse[]; // List of highscores
  loading: boolean;
}

// Landing Screen for website
const HighScores: React.FC<HighScoresProps> = ({ highScores, loading }) => {
  return loading ? (
    <div className=""></div>
  ) : (
    <div className="flex flex-col items-center sm:items-start mb-2.5">
      <SubTitle>High Scores</SubTitle>
      <ul className="flex flex-col w-full items-center sm:items-start mb-10">
  {highScores.map((score) => (
    <li key={score.playerName} className="flex flex-col w-full mb-2.5">
      <span className="font-semibold text-lg text-black w-full whitespace-normal break-words">
        {score.playerName}:
      </span>
      <span className="font-bold text-lg text-darkGray">{score.score}</span>
    </li>
  ))}
</ul>

    </div>
  );
};

export default HighScores;