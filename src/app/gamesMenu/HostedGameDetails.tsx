"use client";

import React from "react";
import MainButton from "../components/buttons/MainButton";
import { useRouter } from "next/navigation";
import { HostGame } from "../services/responseInterfaces";
import { removeHostGame } from "../services/admin";
import DeleteButton from "../components/buttons/DeleteButton";

const HostedGameDetails = ({ game, removeHostedGame }: { game: HostGame | null, removeHostedGame: () => void }) => {
    const router = useRouter();
    const [deleteLoading, setDeleteLoading] = React.useState(false);

    const handleGameClick = () => {
        router.push("/manageGame");
    };

    const handleRemoveClick = async() => {
        setDeleteLoading(true);
        const result = await removeHostGame();
        if(result)
        {
            removeHostedGame();
        }
        setDeleteLoading(false);
    };

    return (
        <>
            {game ? (
                <div className="flex justify-start">
                    <MainButton onClick={handleGameClick}>View {game.gameName}</MainButton>
                    <DeleteButton onClick={handleRemoveClick} loading={deleteLoading} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default HostedGameDetails;
