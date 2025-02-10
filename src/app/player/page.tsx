"use client";

import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import LinkButton from "../components/buttons/LinkButton";
import Title from "../components/Title";
import AlertBanner from "../components/AlertBanner";
import MainButton from "../components/buttons/MainButton";
import { checkPlayerExists, getHostGameForPlayer, setPlayer } from "../services/player";
import PlayerGameScreen from "./PlayerGameScreen";
import { useRouter } from 'next/navigation';
import { HostGameForPlayerResponse } from "../services/responseInterfaces";

interface Player {
  playerName: string;
  gameId: string;
  createDate: string;
  startDate: string;
  playerId: string;
}

const playerFormat = {
  playerName: "",
};

const roomCode = "ABCD";

const PlayerPage = () => {
  const router = useRouter();

  const [attendees, setAttendees] = useState(0);
  const [gamePlayer, setGamePlayer] = useState({playerName: "", playerId: "", gameId: "", createDate:"", startDate: ""});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);
  const [hostGame, setHostGame] = useState<HostGameForPlayerResponse | undefined>(undefined);

  // Check if player already exists in local storage
  useEffect(() => {
    const fetchHostedGameOnLoad = async () => {
      await fetchHostedGame()
    };

    fetchHostedGameOnLoad();
  }, []);


  const fetchHostedGame = async () => {
    // Get hosted game data
    const hostedGame = await getHostGameForPlayer();

    // Check if currently hosted game is same as current one in local storage
    if (hostedGame) {
      setHostGame(hostedGame);
      const localPlayer: Player | null = sessionStorage.getItem("player") ? JSON.parse(sessionStorage.getItem("player") as string) : null;
      
      if (localPlayer && localPlayer.gameId === hostedGame.gameId && localPlayer.createDate === hostedGame.createDate && localPlayer.startDate === hostedGame.startDate) {
        //check if player exists server side
        const checkExists = await checkPlayerExists(localPlayer.playerId, localPlayer.gameId);

        if(checkExists)
        {
          // if player exists, display game
          setGamePlayer(localPlayer);
        }
        else
        {
          // if player does not exist, remove player from local storage
          sessionStorage.removeItem("player");
          router.push('/join');
        }     
      }
      else
      {
        // if player exists but game is different, remove player from local storage
        sessionStorage.removeItem("player");
        // set player to current hosted game
        setGamePlayer({playerName: "", playerId: "", gameId: hostedGame.gameId, createDate: hostedGame.createDate, startDate: hostedGame.startDate});
      }
      setAttendees(hostedGame.attendees);
    }
    else
    {
      // if no hosted game, set error
      setErrorMessage("No hosted game found");
    }

    setLoading(false);
  };

  // handle refresh of game status and wait for 5 seconds before allowing another refresh
  const handleRefresh = async() => {
    setRefreshing(true);
    await fetchHostedGame();
    setToggleRefresh(!toggleRefresh);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }


  const [formData, setFormData] = useState({
    ...playerFormat,
  });

  const [errors, setErrors] = useState({
    ...playerFormat,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { playerName: ""};

    if (!formData.playerName.trim()) {
      valid = false;
      newErrors.playerName = "Player name is required.";
    }

    setErrors(newErrors);

    if (valid) {  
      try {
        // Add player to game
        const result = await setPlayer(formData.playerName, gamePlayer.gameId); //update this to match actual function
        // If result does not satisfy interface playerResponse, set error message
        if(!result) {
          throw new Error("Invalid response from server");
        }

        // Create player object
        const player = {
          playerName: formData.playerName,
          gameId: gamePlayer.gameId,
          createDate: gamePlayer.createDate,
          startDate: gamePlayer.startDate,
          connected: result?.connected,
          playerId: result?.id
        }
        
        // If successfully added player to game, store player in local storage
        sessionStorage.setItem("player", JSON.stringify(player));
        setGamePlayer({playerName: formData.playerName, playerId: gamePlayer.playerId, gameId: gamePlayer.gameId, createDate: gamePlayer.createDate, startDate: gamePlayer.startDate});
      } catch (error) {
        // Handle errors from the async operation
        console.error("Error during joining:", error);
        setErrors({ playerName: "Name taken, invalid player name or other issue" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-black justify-center w-screen h-screen">
      {errorMessage && (
        <AlertBanner
          message={errorMessage}
          timeVisible={10000} // Display for 10 seconds
          onClose={() => setErrorMessage("")}
        />
      )}
          <div className="flex justify-center m-4"><MainButton disabled={refreshing} type="button" onClick={handleRefresh}>Refresh</MainButton></div>
      {loading ? <div className="flex-grow flex flex-col justify-center items-center p-5 w-screen animate-pulse"><Title>Loading...</Title></div> :         
        <div className="flex-grow flex flex-col justify-center mx-auto">
          <Title>Room {roomCode}</Title>
          {gamePlayer.playerName ? <PlayerGameScreen playerId={gamePlayer.playerId} hostGame={hostGame} showError={(msg:string)=>setErrorMessage(msg)} toggleRefresh={toggleRefresh}/> : 
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div>Player Limit:{attendees}</div>

              <TextInput
                label="Player Name"
                name="playerName"
                id="playerName"
                type="text"
                value={formData.playerName}
                onChange={handleInputChange}
                errormessage={errors.playerName}
                placeholder="enter your name here"
              />   

              <div className="mt-6">
                <MainButton type="submit">Join Game</MainButton>
              </div>
            </form>}
        </div>
      }

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

export default PlayerPage;
