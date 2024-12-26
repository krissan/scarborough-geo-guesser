"use client"

import { useEffect, useState } from "react";
import { HostGame } from "../services/responseInterfaces";
import MainButton from "../components/buttons/MainButton";
import GameQuestionAdmin from "../components/GameQuestionAdmin";
import { useRouter } from 'next/navigation';
import { completeHostGame, getHostGame, pauseHostGame, restartHostGame, unpauseHostGame, updateCurrentQuestion } from "../services/admin";
import ToggleButton from "../components/buttons/ToggleButton";
import Title from "../components/Title";
import QuestionNavigator from "./QuestionNavigator";
import { checkAuth } from "../services/auth";

// Main Component for Game
const GameAdmin: React.FC = () => {
    const router = useRouter();
    //grab games data from local storage

    const [gameData, setGameData] = useState<HostGame | undefined>(undefined);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [paused, setPaused] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [timeCounter, setTimeCounter] = useState(0);

    // 30 second time limit for each question
    const timeLimit = 30;

    // When question is answered correctly
    const increaseQuestion = async() => {
        await checkAuth(router);  
        if(!completed && gameData && currentQuestion < gameData.questions.length - 1){
            const newIndex = currentQuestion + 1;
            const nextQuestion = gameData.questions[newIndex];
            const response = await updateCurrentQuestion(nextQuestion.id, gameData.gameId, gameData.createDate);
            if(response){
                setCurrentQuestion(newIndex);
                setCurrentIndex(newIndex);
            }
        }
        else if(!completed && gameData && currentQuestion == gameData.questions.length - 1){
            const response = await completeHostGame(gameData.gameId, gameData.createDate);
            if(response){
                setCompleted(true);
            }
        }
        setTimeCounter(0);
        setTimeElapsed(0);
    };

    const handlePauseClick = async() => {
        if(gameData){
            await checkAuth(router);  
            let response;
            if(paused){
                response = await unpauseHostGame(gameData.gameId, gameData.createDate);
            }
            else
            {
                response = await pauseHostGame(gameData.gameId, gameData.createDate);
            }
            if(response){
                setPaused(!paused);
            }
        }
    };

    const handleComplete = async() => {
        if (gameData) {
            await checkAuth(router);  
            const response = await completeHostGame(gameData.gameId, gameData.createDate);
            if(response){
                setCompleted(true);
            }
        }
    };

    const handleRestart = async () => {
        if (gameData) {
            await checkAuth(router);  
            const response = await restartHostGame(gameData.gameId, gameData.createDate);
            if (response) {
                setCompleted(false);
                setTimeCounter(0);
                setCurrentQuestion(0);
                setCurrentIndex(0);
                setPaused(false);
                setTimeElapsed(0);
            }
        }
    };


    // Load game data on page load
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true when loading game questions
            await checkAuth(router);  
            const newGameData = await getHostGame();
            console.log(newGameData);
            setGameData(newGameData);
            if(newGameData){
                setPaused(newGameData.paused);
                const currentQuestionIndex = newGameData.questions.findIndex(question => question.id == newGameData.currentQuestionId);
                setCurrentIndex(currentQuestionIndex);
                setCurrentQuestion(currentQuestionIndex);
                setCompleted(newGameData.completed);
            }
            setLoading(false); // Set loading to false once game questions are set

        };
        fetchData();
    }, []);

    // Update time elapsed
    useEffect(() => {
        const interval = setInterval(async () => {
            if(!completed && timeCounter < timeLimit){
                setTimeElapsed(timeElapsed + 1);
                if(!paused)
                {
                    setTimeCounter(timeCounter + 1);
                }
            }
            else {
                await increaseQuestion();
            }
        }, 1000);

        return () => clearInterval(interval); // Clean up on unmount
    }, [timeElapsed]);


    return gameData ? 
        completed ? 
        <div className="flex flex-col items-center justify-center h-full pt-4">
            <Title>Game Completed!</Title>
            <MainButton onClick={handleRestart}>Restart Game</MainButton>
            <MainButton onClick={() => router.push('/gamesMenu')}>Back to Manage Game</MainButton>
        </div>
        :
        <>
        {/* Display game progress */}
        <QuestionNavigator completed={currentQuestion} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} length={gameData.questions.length} />
        <div className="flex justify-around mt-4">
            <ToggleButton onClick={handlePauseClick} active={paused}>{paused ? "UN" : ""}PAUSE GAME</ToggleButton>
            <MainButton onClick={handleComplete}>END GAME</MainButton>
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