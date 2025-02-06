import Title from "../components/Title";
import { DailyHighScoreResponse } from "../services/responseInterfaces";

interface HighScoresProps {
  highScores: DailyHighScoreResponse[]; // List of highscores
  loading: boolean;
}

// Landing Screen for website
const HighScores: React.FC<HighScoresProps> = ({ highScores, loading }) => {
  return (loading ? <div className=""></div> :
    <div className="flex flex-col items-center sm:items-start">
    <Title>High Scores</Title>
    <div className="flex flex-col items-center sm:items-start">
      {highScores.map((score, index) => (
        <div key={index} className="flex flex-row justify-between w-full">
          <p>{score.playerName}</p>
          <p>{score.score}</p>
        </div>
      ))}
    </div>
</div>
  );
};

export default HighScores;
