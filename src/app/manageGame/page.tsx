"use client"

import { useEffect, useState } from "react";
import Title from "../components/Title";
import PlayersAdmin from "./PlayersAdmin";
import GameAdmin from "./GameAdmin";
import { checkAuth } from "../services/auth";
import { useRouter } from 'next/navigation';
import { completeHostGame, getHostGame, pauseHostGame, restartHostGame, startHostGame, unpauseHostGame, updateCurrentQuestion } from "../services/admin";
import { HostGame } from "../services/responseInterfaces";

// Main Component for Game
const ManageGame: React.FC = () => {
    const [pageToggle, setPageToggle] = useState<"players"|"game">("game");
    const [loading, setLoading] = useState(true);
    const [gameData, setGameData] = useState<HostGame | undefined>(undefined);
    const [paused, setPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [started, setStarted] = useState(false);
    const [timeCounter, setTimeCounter] = useState(0);
    
    const router = useRouter();
    
    // Load game data on page load
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true when loading game questions
            await checkAuth(router);  
            const newGameData = await getHostGame();
            setGameData(newGameData);
            if(newGameData){
                setPaused(newGameData.paused);
                const currentQuestionIndex = newGameData.questions.findIndex(question => question.id == newGameData.currentQuestionId);
                setCurrentIndex(currentQuestionIndex);
                setCurrentQuestion(currentQuestionIndex);
                setCompleted(newGameData.completed);
                setStarted(newGameData.startDate != null && newGameData.startDate != "");
            }
            else
            {
                router.push('/gamesMenu');
            }
            setLoading(false); // Set loading to false once game questions are set

        };
        fetchData();
    }, []);

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
    
    const handleStart = async() => {
        if (gameData) {
            await checkAuth(router);
            const response = await startHostGame(gameData.gameId, gameData.createDate);
            if(response){
                setStarted(true);
            }
        }
    }

        
    const handleRestart = async () => {
        if (gameData) {
            await checkAuth(router);  
            const response = await restartHostGame(gameData.gameId, gameData.createDate, gameData.gameUpdateDate);
            if (response) {
                setGameData(response);
                setCompleted(response.completed);
                setTimeCounter(0);
                setCurrentQuestion(0);
                setCurrentIndex(0);
                setPaused(response.paused);
                setTimeElapsed(0);
                setStarted(response.startDate != null && response.startDate != "");
            }
            else {
                router.push('/gamesMenu');
            }
        }
    };

    // Update time elapsed
    useEffect(() => {
        const interval = setInterval(async () => {
            if(!completed && !paused && started && timeCounter < timeLimit){
                setTimeElapsed(timeElapsed + 1);
                if(!paused)
                {
                    setTimeCounter(timeCounter + 1);
                }
            }
            else if (timeCounter >= timeLimit){
                await increaseQuestion();
            }
        }, 1000);

        return () => clearInterval(interval); // Clean up on unmount
    }, [timeElapsed, completed, paused, started, timeCounter]);


    return <div className={`flex flex-col w-full h-screen justify-start items-center flex-grow transition-opacity duration-500 px-20`}>
        <div className="flex justify-between w-full mt-4">
            {/* GAME Toggle */}
            <div
                className={`flex-1 text-center p-2 border-b-black border-b-8 ${
                    pageToggle == "game" ? "border-b-green" : "border-b-black"
                }`}
                onClick={() => setPageToggle('game')}
            >
                <Title className={pageToggle == "game" ? "text-green" : "text-black"}>GAME</Title>
                </div>

            {/* PLAYERS Toggle */}
            <div
                className={`flex-1 text-center p-2 border-b-8 ${
                    pageToggle == "players" ? "border-b-green" : "border-b-black"
                }`}
                onClick={() => setPageToggle('players')}
            >
                <Title className={pageToggle == "players" ? "text-green" : "text-black"}>PLAYERS</Title>
            </div>
        </div>
        {pageToggle == "players" ? 
            <PlayersAdmin gameId={gameData?.gameId || ''} /> 
            : 
            <GameAdmin 
                gameData={gameData}
                loading={loading}
                paused={paused}
                currentIndex={currentIndex}
                currentQuestion={currentQuestion}
                completed={completed}
                started={started}
                timeElapsed={timeElapsed}
                timeCounter={timeCounter}
                timeLimit={timeLimit}
                increaseQuestion={increaseQuestion}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentIndex={setCurrentIndex}
                setCompleted={setCompleted}
                setPaused={setPaused}
                handleRestart={handleRestart}
                handlePauseClick={handlePauseClick}
                handleComplete={handleComplete}
                handleStart={handleStart} />
        }
    </div>
};

export default ManageGame;