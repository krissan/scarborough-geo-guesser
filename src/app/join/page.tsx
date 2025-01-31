"use client";

import React, { useState } from "react";
import TextInput from "../components/TextInput";
import LinkButton from "../components/buttons/LinkButton";
import { useRouter } from 'next/navigation';
import Title from "../components/Title";
import MainButton from "../components/buttons/MainButton";

const joinFormat = { roomCode: "ABCD" };

const JoinGamePage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    ...joinFormat
  });

  const [errors, setErrors] = useState({
    ...joinFormat
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
    const newErrors = { ...joinFormat };

    if (!formData.roomCode.trim()) {
      valid = false;
      newErrors.roomCode = "Room code is required.";
    }

    setErrors(newErrors);

    if (valid) {  
      try {
        // Temporary code to bypass to join game
        if(formData.roomCode.toUpperCase() == "ABCD")
        {
          router.push('/player');
        }
        else
        {
          newErrors.roomCode = "Invalid room code.";
          setErrors(newErrors);
        }

      } catch (error) {
        // Handle errors from the async operation
        console.error("Error during login:", error);
        setErrors({ roomCode: "Invalid room code" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-black">
      <div className="flex-grow flex flex-col justify-center p-5 w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Title>Join Game</Title>

          <TextInput
            label="Enter Room Code"
            name="roomCode"
            id="roomCode"
            type="text"
            value={formData.roomCode}
            onChange={handleInputChange}
            errormessage={errors.roomCode}
            placeholder="enter code here"
          />

          <div className="mt-6">
            <MainButton type="submit">JOIN GAME</MainButton>
          </div>
        </form>
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

export default JoinGamePage;
