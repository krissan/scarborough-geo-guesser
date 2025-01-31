"use client"

import MainButton from "../components/buttons/MainButton";
import GameQuestionAdmin from "../components/GameQuestionAdmin";
import { useRouter } from 'next/navigation';
import ToggleButton from "../components/buttons/ToggleButton";
import Title from "../components/Title";
import QuestionNavigator from "./QuestionNavigator";
import { HostGame } from "../services/responseInterfaces";
import PlayerResults from "../components/PlayerResults";

// Main Component for Game
interface GameAdminProps {
    gameData: HostGame | undefined;
    loading: boolean;
    paused: boolean;
    currentIndex: number;
    currentQuestion: number;
    completed: boolean;
    started: boolean;
    timeElapsed: number;
    timeCounter: number;
    timeLimit: number;
    increaseQuestion: () => void;    
    setCurrentQuestion: (index: number) => void;
    setCurrentIndex: (index: number) => void;
    setCompleted: (completed: boolean) => void;
    setPaused: (paused: boolean) => void;
    handleRestart: () => void;
    handlePauseClick: () => void;
    handleComplete: () => void;
    handleStart: () => void;
}

const GameAdmin: React.FC<GameAdminProps> = ({ gameData, loading, paused, currentIndex, currentQuestion, completed, started, timeCounter, timeElapsed, timeLimit, increaseQuestion, setCurrentIndex, handleRestart, handlePauseClick, handleComplete, handleStart}) => {
    const router = useRouter();

    return gameData ? 
        completed ? 
        <div className="flex flex-col items-center justify-between h-full pt-4 my-8">
            <Title>Game Completed!</Title>
            <MainButton onClick={handleRestart}>Restart Game</MainButton>
            <PlayerResults gameId={gameData.gameId} />
            <MainButton onClick={() => router.push('/gamesMenu')}>Back to Manage Game</MainButton>
            
        </div>
        :
        <>
            {/* Display game progress */}
            <QuestionNavigator completed={currentQuestion} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} length={gameData.questions.length} />
            <div className="flex justify-around mt-4">
                <ToggleButton onClick={handlePauseClick} active={paused}>{paused ? "UN" : ""}PAUSE GAME</ToggleButton>
                {started ? <MainButton onClick={handleComplete}>END GAME</MainButton> : <MainButton onClick={handleStart}>START GAME</MainButton>}
            </div>
            <GameQuestionAdmin
                loading={loading}
                images={gameData.questions}
                currentIndex={currentIndex}
                totalTime={timeElapsed}
            />
            <MainButton disabled={gameData.questions.length == currentIndex+1} onClick={increaseQuestion}>NEXT QUESTION {timeLimit - timeCounter}</MainButton>
        </>
    : <div className="flex h-full w-full animate-pulse"></div>;
};

export default GameAdmin