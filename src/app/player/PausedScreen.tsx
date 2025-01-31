import React from "react";
import Title from "../components/Title";

const PausedScreen = () => {
    return (
        <div className="flex flex-col items-center sm:flex-row sm:justify-around px-10">
            <div className="mb-4">
                <Title>PLEASE STANDBY THE TRAIN IS CURRENTLY PAUSED</Title>
            </div>
        </div>
    );
};

export default PausedScreen;
