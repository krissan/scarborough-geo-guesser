"use client"

import { useState } from "react";
import Title from "../components/Title";
import PlayersAdmin from "./PlayersAdmin";
import GameAdmin from "./GameAdmin";

// Main Component for Game
const ManageGame: React.FC = () => {
    const [pageToggle, setPageToggle] = useState<"players"|"game">("game");

    return <div className={`flex flex-col w-full justify-start items-center flex-grow transition-opacity duration-500 px-20`}>
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
            <PlayersAdmin /> 
            : 
            <GameAdmin />
        }
    </div>
};

export default ManageGame;