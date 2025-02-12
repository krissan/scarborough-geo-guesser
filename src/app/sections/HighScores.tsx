import SubTitle from "../components/SubTitle";
import { DailyHighScoreResponse } from "../services/responseInterfaces";

interface HighScoresProps {
  highScores: DailyHighScoreResponse[]; // List of highscores
  loading: boolean;
}

// Landing Screen for website
const HighScores: React.FC<HighScoresProps> = ({ highScores, loading }) => {
  return (loading ? <div className=""></div> :
    <div className="flex flex-col items-center sm:items-start mb-2.5">
    <SubTitle>High Scores</SubTitle>
    <div className="flex flex-col items-center sm:items-start ">
      {highScores.map((score, index) => (
          <div
          key={index}
          className="flex flex-row justify-between w-auto px-4 py-2 rounded-lg bg-gray-100 shadow-md  border border-black"
        >
          <p className="font-semibold text-lg text-gray-800">{score.playerName}:</p>
          <p className="font-bold text-lg text-blue-600">{score.score}</p>
        </div>
      ))}
    </div>
</div>
  );
};

export default HighScores;
