"use client";

import React, { useState, useEffect } from "react";
import CompletedScreen from "./CompletedScreen";
import PausedScreen from "./PausedScreen";
import WaitingScreen from "./WaitingScreen";
import ActiveScreen from "./ActiveScreen";
import { HostGameForPlayerResponse } from "../services/responseInterfaces";

interface PlayerGameScreenProps {
    playerId: string;
    hostGame?: HostGameForPlayerResponse | undefined;
    showError: (msg:string) => void;
    toggleRefresh: boolean;
}

const PlayerGameScreen: React.FC<PlayerGameScreenProps> = ({ playerId, hostGame, showError, toggleRefresh }) => {
    const [completed, setCompleted] = useState<boolean>(false);
    const [currentQuestionId, setCurrentQuestionId] = useState<string>("");
    const [paused, setPaused] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<string>("");

    useEffect(() => {
        if(hostGame){
            setCompleted(hostGame.completed ?? false);
            setCurrentQuestionId(hostGame.currentQuestionId ?? "");
            setPaused(hostGame.paused ?? false);
            setStartDate(hostGame.startDate ?? "");
        }
    }, [hostGame]);

    return (
        <>
            {completed ? <CompletedScreen playerId={playerId} showError={showError} /> : 
                paused ? <PausedScreen/> : startDate && hostGame ? <ActiveScreen playerId={playerId} currentQuestionId={currentQuestionId} gameId={hostGame.gameId} toggleRefresh={toggleRefresh}/> : <WaitingScreen/>}
        </>
    );
};

export default PlayerGameScreen;
