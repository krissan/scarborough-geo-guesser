"use client"

import { useEffect, useState } from "react";
import MainButton from "../components/buttons/MainButton";
import { getPlayers, removePlayer } from "../services/admin";
import { PlayerListResponse } from "../services/responseInterfaces";
import DeleteButton from "../components/buttons/DeleteButton";

// Main Component for Game
interface PlayersAdminProps {
    gameId: string;
}

const PlayersAdmin: React.FC<PlayersAdminProps> = ({ gameId }) => {
    const [players, setPlayers] = useState<PlayerListResponse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await refreshPlayers();
        };
        fetchData();
    }, []);

    //Get list of players
    const refreshPlayers = async () => {
        setLoading(true);
        //fetch players
        const playerList = await getPlayers();
        if(playerList){
            setPlayers(playerList);
        }
        setLoading(false);
    }

    const handleRemovePlayer = async(gameId: string, playerId: string) => {
        if(!loading)
        {
            setLoading(true);
            await removePlayer(gameId, playerId);
            await refreshPlayers();
            setLoading(false);
        }
    }

    return <div className={`flex flex-col w-full justify-start items-center transition-opacity duration-500 py-4`}>
        <MainButton onClick={refreshPlayers}>Refresh Players</MainButton>
        <div className="w-full">
        {loading ? <div>Loading...</div> : 
            <div className="flex flex-col">
                {players.map((player, index) => {
                    return <div key={index} className={`flex flex-row justify-between items-center w-full m-auto ${index % 2 == 0 ? "bg-gray" : ""} py-2 px-4`}>
                        <div className="font-bold text-black text-lg">{index + 1}.</div>
                        <div className="font-bold text-black text-lg">{player.playerName}</div>
                        <DeleteButton onClick={async() => await handleRemovePlayer(gameId, player.id)} />
                    </div>
                })}
            </div>
        }
        </div>
    </div>
};

export default PlayersAdmin;