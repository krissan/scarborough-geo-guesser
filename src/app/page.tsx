"use client";

import { useState, useEffect } from "react";
import { fetchPhotos } from "./api/util";
import LinkButton from "./components/linkButton";
import GameSection from "./sections/gameSection";
import LandingSection from "./sections/landingSection";
import { ImageQuestion } from "./components/imageCarousel";

export default function Home() {
  const [photos, setPhotos] = useState<ImageQuestion[]>([]); // Store photos from API
  const [isGameStarted, setIsGameStarted] = useState(false); // Control which section to show
  const [isFadingOut, setIsFadingOut] = useState(false); // Control the fade-out animation

  useEffect(() => {
    // Fetch photos when the component mounts
    const loadPhotos = async () => {
      const fetchedPhotos = await fetchPhotos();
      setPhotos(fetchedPhotos);
    };
    loadPhotos();
  }, []);

  const startGame = () => {
    setIsFadingOut(true);
  
    setTimeout(() => {
      setIsGameStarted(true);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center text-black min-h-screen w-screen overflow-y-auto">
      <main className="flex flex-col justify-center mx-auto flex-grow">
        {!isGameStarted ? (
          <div
            className={`transition-opacity duration-500 ${
              isFadingOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <LandingSection startGame={startGame} />
          </div>
        ) : (
          <GameSection photos={photos} setPhotos={setPhotos} />
        )}
      </main>

      <div className="flex flex-row justify-around w-full h-auto py-2">
        <LinkButton link="https://krissan-portfolio-site-krissans-projects.vercel.app/">
          A project by Krissan Veerasingam
        </LinkButton>
        <LinkButton link="https://www.scarboroughspots.com/">
          Inspired by Scarborough Spots
        </LinkButton>
      </div>
    </div>
  );
}
