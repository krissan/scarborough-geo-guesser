"use client";

import React, { useEffect, useState } from "react";
import LinkButton from "../components/buttons/LinkButton";
import MainButton from "../components/buttons/MainButton";
import GameRow from "../components/GameRow";
import Title from "../components/Title";
import { useRouter } from "next/navigation";
import AuthButton from "../components/buttons/AuthButton";
import { checkAuth, logout } from "../services/auth";
import { deleteGame, fetchGames, getHostGame, removeHostGame, setHostGame } from "../services/admin";
import { HostGame } from "../services/responseInterfaces";
import HostedGameDetails from "./HostedGameDetails";
import AlertBanner from "../components/AlertBanner";

interface GameItem {
  id: string;
  name: string;
  date: string;
  loading: boolean;
}

const GamesMenu = () => {
  const router = useRouter();
  const [games, setGames] = useState<GameItem[]>([]);
  const [updatingGameData, setUpdatingGameData] = useState<boolean>(false);
  const [hostedGame, setHostedGame] = useState<HostGame | null>(null);
  const [errormessage, setErrorMessage] = useState<string | null>(null);

  // Load games on page load
  useEffect(() => {
    const checkAuthOnLoad = async () => {
      await checkAuth(router);
    }

    const fetchAndSetGames = async () => {
      try {
        const fetchedGames = await fetchGames();
        if (fetchedGames) {
          setGames(
            fetchedGames.map((game) => ({
              id: game.id,
              name: game.gameName,
              date: game.updateDate,
              loading: false,
            }))
          );
        }
      } catch (error) {
        setErrorMessage("Failed to fetch games. Please try again later.");
        console.error(error);
      }
    };

    const fetchHostedGame = async () => {
      try {
        const hostedGame = await getHostGame();
        if (hostedGame) {
          setHostedGame(hostedGame);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch hosted game details.");
        console.error(error);
      }
    };

    checkAuthOnLoad();
    fetchAndSetGames();
    fetchHostedGame();
  }, [router]);

  // Handle the host button click
  const handleHostClick = async(gameId: string, date: string) => {
    try {
      setUpdatingGameData(true); // Show loading state for this game
      await checkAuth(router);
      await setHostGame(gameId, date);
      const newHostedGame = await getHostGame();
      if (!newHostedGame) {
        return;
      }
      setHostedGame(newHostedGame);
    }
    catch (error) {
      setErrorMessage("Failed to host game. Please try again later.");
      console.error(error);
    }
    setUpdatingGameData(false); // Show loading state for this game
  };

  // Handle the delete button click
  const handleDeleteClick = async (gameId: string, date: string) => {
    try {
      setUpdatingGameData(true); // Show loading state for this game
        await checkAuth(router);
      const result = await deleteGame(gameId, date);
      if (!result) {
        setUpdatingGameData(false); // Reset loading state on failure
        return;
      }

      setGames((prevGames) => prevGames.filter((game) => game.id !== gameId));
    } catch (error) {
      setErrorMessage("Failed to delete game. Please try again later.");
      console.error(error);
    }
    setUpdatingGameData(false); // Reset loading state after success
  };

  const handleButtonClick = () => {
    router.push("/createGame");
  };

  const handleUnHostClick = async() => {
    try {
      setUpdatingGameData(true); // Show loading state for this game
      await checkAuth(router);
      const result = await removeHostGame();
      if (!result) {
        setUpdatingGameData(false); // Reset loading state on failure
        return;
      }
      setHostedGame(null);
    }
    catch (error) {
      setErrorMessage("Failed to unhost game. Please try again later.");
      console.error(error);
    }
    setUpdatingGameData(false); // Reset loading state after success
  }

  return (
    <div className="min-h-screen flex flex-col text-black">
      {errormessage && (
        <AlertBanner
          message={errormessage}
          timeVisible={10000} // Display for 10 seconds
          onClose={() => setErrorMessage(null)}
        />
      )}
      <div className="flex-grow flex flex-col justify-center p-5 w-full max-w-lg mx-auto text-center">
        <MainButton onClick={handleButtonClick}>Create Game</MainButton>
        <Title>Games</Title>
        <div className="space-y-6 w-full pb-8">
          {games.map((game) => (
            <GameRow
              key={game.id}
              gameName={game.name}
              date={game.date}
              loading={updatingGameData}
              onHostClick={() => handleHostClick(game.id, game.date)}
              onUnHostClick={() => handleUnHostClick()}
              onDeleteClick={() => handleDeleteClick(game.id, game.date)}
              selected={game.id === hostedGame?.gameId}
            />
          ))}
        </div>
        <HostedGameDetails game={hostedGame} removeHostedGame={() => setHostedGame(null)} />
        <AuthButton
          text="Logout"
          onClick={() => {
            logout();
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("token");
            router.push("/login");
          }}
        />


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

export default GamesMenu;
