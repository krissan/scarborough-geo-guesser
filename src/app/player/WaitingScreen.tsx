import React from "react";
import Title from "../components/Title";

const WaitingScreen = () => {
    return (
        <div className="flex flex-col items-center sm:flex-row sm:justify-around px-10">
            <div className="mb-4">
                <Title>THE TRAIN IS PREPARING TO LEAVE THE STATION</Title>
            </div>
        </div>
    );
};

export default WaitingScreen;
