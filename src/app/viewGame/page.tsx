"use client"

import { useEffect, useState } from "react";
import Title from "../components/Title";
import { getCurrentQuestionImage, getHostGameForPlayer } from "../services/player";
import { HostGameForPlayerResponse, QuestionImageResponse } from "../services/responseInterfaces";
import MainButton from "../components/buttons/MainButton";
import GameImage from "../components/GameImage";
import PlayerResult from "../components/PlayerResults";

// Main Component for Game
const ManageGame: React.FC = () => {
    const [gameData, setGameData] = useState<HostGameForPlayerResponse | undefined>(undefined);
    const [questionData, setQuestionData] = useState<QuestionImageResponse | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [countdown, setCountdown] = useState(3);

    //grab host game data from server
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getHostGameForPlayer();
            if(result){
                setGameData(result);
                const question = await getCurrentQuestionImage(result.gameId, result.createDate);
                if(question){
                    setQuestionData(question);
                }
            }
            else {
                setGameData(undefined);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const refreshData = async () => {
        setLoading(true);
        const result = await getHostGameForPlayer();
        if(result){
            setGameData(result);
            const question = await getCurrentQuestionImage(result.gameId, result.createDate);
            if(question){
                setQuestionData(question);
            }
        }
        else {
            setGameData(undefined);
        }
        setCountdown(3);
        setLoading(false);
    }

    //countdown if value is 3
    useEffect(() => {
        if(countdown > 0){
            const interval = setInterval(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown]);

    return <div className={`flex flex-col w-screen h-screen justify-center items-center transition-opacity duration-500 p-20`}>
        {loading ? <Title>Loading...</Title> : 
            (!gameData ? <Title>Game Not Hosted</Title> : 
                (gameData.startDate ?
                    (gameData.completed ? <>
                            <Title>Game Completed</Title>
                            <PlayerResult gameId={gameData.gameId} />
                        </> : 
                        <div className="flex flex-col items-center justify-center">
                            <Title>{gameData?.gameName}</Title>
                            <MainButton onClick={refreshData}>Refresh</MainButton>
                            {countdown > 0 ? <div className="text-black font-bold text-[500px]">{countdown}</div> :
                            <>
                                {questionData?.authorLink ? (
                                    <a
                                    className="h-6 text-ellipsis text-darkPurple hover:text-purple font-bold"
                                    href={questionData.authorLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    >
                                        {questionData.author}
                                    </a>
                                ) : (
                                    <div className="h-6 text-ellipsis text-black font-bold">
                                        {questionData?.author}
                                    </div>
                                )}

                                <div className="flex flex-col items-center justify-center w-full">
                                    <Title>Current Question</Title>
                                    {questionData?.img ? 
                                        <GameImage
                                            image={questionData?.img}
                                            imageLoading={imageLoading}
                                            onLoad={() => {
                                                setImageLoading(false);
                                            }}
                                        />
                                        :
                                        <div>No Image Found</div>
                                    }
                                </div>
                            </>}
                    </div>) : 
                    <Title>Game Has Not Started Yet</Title>
                )    
            )
        }
    </div>
};

export default ManageGame;