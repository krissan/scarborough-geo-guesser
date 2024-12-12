"use client";

import React, { useState } from "react";
import LinkButton from "../components/linkButton";
import CreateButton from "../components/CreateButton";
import GameRow from "../components/GameRow";

const GameMenu = () => {

  // Mock data for games
  const [games, setGames] = useState([
    { id: 1, name: "Trivia Night 1", date: "2024-11-02" },
    { id: 2, name: "Trivia Night 2", date: "2024-11-02" },
  ]);

  // Handle the host button click
  const handleHostClick = (gameId: number) => {
    console.log(`Host clicked for game ID: ${gameId}`);
  };

  // Handle the delete button click
  const handleDeleteClick = (gameId: number) => {
    setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
  };

    const handleButtonClick = () => {
        console.log("Clicked");
      };


 
  return (
    <div className="min-h-screen flex flex-col text-black">
      <div className="flex-grow flex flex-col justify-center p-5 w-full max-w-lg mx-auto">
      <CreateButton text="Create Game" onClick={handleButtonClick} />
          <label className="block text-center text-xl font-extrabold text-black mb-6">
            Games
          </label>
          <div className="space-y-6 w-full">
          {games.map((game) => (
            <GameRow
              key={game.id}
              gameName={game.name}
              date={game.date}
              onHostClick={() => handleHostClick(game.id)}
              onDeleteClick={() => handleDeleteClick(game.id)}
            />
          ))}
        </div>

 </div>
       {/* Footer */}
       <div className="h-auto py-2 flex justify-around bg-gray-100">
        <LinkButton link="https://krissan-portfolio-site-krissans-projects.vercel.app/">
          A project by Krissan Veerasingam
        </LinkButton>
        <LinkButton link="https://www.scarboroughspots.com/">
          Inspired by Scarborough Spots
        </LinkButton>
      </div>
    </div>
  );
};

export default GameMenu;
