import React, { useState, useEffect } from "react";
import MainButton from "../components/buttons/MainButton";
import { useRouter } from 'next/navigation';
import Title from "../components/Title";
import { getPlayerFinalResult } from "../services/player";
import SubTitle from "../components/SubTitle";

interface playerResults {
    score: number;
    attendees: number;
    placement: number;
}

interface CompletedScreenProps {
    playerId: string;
    showError: (msg:string) => void;
}

const CompletedScreen: React.FC<CompletedScreenProps> = ({ playerId, showError }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [playerResults, setPlayerResults] = useState<playerResults>({score: 0, attendees: 0, placement: 0});
    // Grab player score and number of attendees from local storage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playerResults = sessionStorage.getItem("playerResults");
                if (playerResults) {
                    setPlayerResults(JSON.parse(playerResults));
                } else {
                    const result = await getPlayerFinalResult(playerId);
                    if(result) {
                        const retrievedResults = {
                            score: result.score,
                            attendees: result.attendees,
                            placement: result.position
                        };
                        setPlayerResults(retrievedResults);
                    }
                    else
                    {
                        throw new Error("No player results found");
                    }
                    
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                showError("Could not fetch player results");
            }
            setLoading(false);
            
        };
        fetchData();   
    }, []);

    return (
        <div className="flex flex-col items-center justify-around px-10">
            <div className="mb-4">
                <Title className="text-red">THE TRAIN HAS ARRIVED AT THE STATION</Title>
                <SubTitle className={loading ? "animate-pulse" : ""}>YOUR FINAL SCORE IS {loading ? "...":playerResults.score}</SubTitle>
                <SubTitle className={loading ? "animate-pulse" : ""}>YOU PLACED {loading ? "..." : playerResults.placement+"/"+playerResults.attendees}</SubTitle>
            </div>

            <MainButton onClick={()=>router.push("/join")}>Return To Join Screen</MainButton>
        </div>
    );
};

export default CompletedScreen;
