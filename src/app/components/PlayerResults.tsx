"use client"

import { useEffect, useState } from "react";
import { checkAuth } from "../services/auth";
import { useRouter } from "next/navigation";
import { getPlayerScores } from "../services/player";
import { PlayerScoreResponse } from "../services/responseInterfaces";
import Title from "./Title";

// Main Component for Game
interface PlayerResultProps {
    gameId:string;
}

const PlayerResult: React.FC<PlayerResultProps> = ({ gameId}) => {
    const [loading, setLoading] = useState(true);
    const [playerScores, setPlayerScores] = useState<PlayerScoreResponse[]>([]);
    const router = useRouter();

    // Load game data on page load
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true when loading game questions
            await checkAuth(router);  
            const result = await getPlayerScores(gameId);
            if(result){
                const mappedResult = result.map(score => ({
                    playerId: score.playerId,
                    playerName: score.playerName,
                    score: score.score
                }));
                setPlayerScores(mappedResult);
            }
            setLoading(false); // Set loading to false once game questions are set

        };
        fetchData();
    }, []);    

    return loading ? <div>Loading...</div> : (playerScores?.length > 0 ?        
        <div className="flex flex-col w-full justify-start items-center transition-opacity duration-500 py-4">
            <h1 className="text-black font-bold flex-start w-full mb-2">PLAYER RESULTS</h1>
            <div className="w-full flex justify-start flex-row text-black">
                <div className="w-1/2 border-2 border-black pl-2">Player</div>
                <div className="w-1/2 border-2 border-black pl-2">Score</div>
            </div>
            {playerScores.map((playerScore) => (
                <div key={playerScore.playerId} className="w-full flex justify-start flex-row font-bold text-black">
                    <div className="w-1/2 border-2 border-black pl-2">{playerScore.playerName}</div>
                    <div className="w-1/2 border-2 border-black pl-2">{playerScore.score}</div>
                </div>
            ))}
        </div> : <Title>No players found</Title>);
};

export default PlayerResult