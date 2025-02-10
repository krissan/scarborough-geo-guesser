"use client"

import { useEffect, useState } from "react";
import TimeLine from "../components/Timeline";
import CongratulationSection from "./CongratulationSection";
import { fetchPhotos } from "../api/util";
import GameQuestion, { ImageQuestion } from "../components/GameQuestion";

interface GameSectionProps {
  photos: ImageQuestion[];
  setPhotos: (img: ImageQuestion[]) => void;
}

// Main Component for Game
const GameSection: React.FC<GameSectionProps> = ({ photos, setPhotos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [corrects, setCorrects] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [images, setImages] = useState<ImageQuestion[]>([]);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [winState, setWinState] = useState(false)
  const [totalTime, setTotalTime] = useState(0)

  // When photos are available, populate Images and fade in the game
  useEffect(() => {
    if (photos && photos.length > 0) {
      setImages(photos);
      setLoading(false); // Set loading to false once images are set
    }

    setTimeout(() => {
      setIsFadingIn(true); // Start fading in the game section
      setWinState(false);
    }, 500);
  }, [photos]);

  // When all questions are answered correct fade out and set win state to true
  useEffect(()=>{
    if(corrects >= 8){
      setIsFadingIn(false);

      setTimeout(() => {
        setWinState(true);
        setIsFadingIn(true); // Start fading in the game section
      }, 500);
    }
  },[corrects])

  // Update options in multiple choice as selected
  const updateImageOption = (imageIndex: number, optionIndex: number) => {
    const updatedImages = images.map((image, imgIdx) => {
      if (imgIdx === imageIndex) {
        const updatedOptions = image.options.map((opt, optIdx) => {
          if (optIdx === optionIndex) {
            return { ...opt, selected: true }; // Mark the selected option
          }
          return opt;
        });
        return { ...image, options: updatedOptions };
      }
      return image;
    });
    setImages(updatedImages); // Properly update the state with a new array
  };

  // When question is answered correctly
  const increaseCorrects = (index: number, option: number, timeTaken: number) => {
    setCorrects(corrects + 1);
    setCurrentIndex(corrects+1);
    setTotalTime(totalTime+timeTaken);
    updateImageOption(index, option);
  };

  // When question is answered incorrectly
  const increaseWrongs = (index: number, option: number) => {
    setWrongs(wrongs + 1);
    updateImageOption(index, option);
  };

  // Reset game state when play again is selected
  const resetGame = async() => {
    setCorrects(0);
    setWrongs(0);
    setCurrentIndex(0);
    setLoading(true);
    const newPhotos = await fetchPhotos();
    setPhotos(newPhotos);
    setLoading(false);
    setIsFadingIn(false);
    setTotalTime(0);
  };

  return <div className={`flex flex-col w-full justify-start flex-grow transition-opacity duration-500 ${
    isFadingIn ? "opacity-100" : "opacity-0"}`}>
        {/* Display game progress */}
        <TimeLine completed={corrects} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
      {winState ? (
      /* Display win screen */
      <div className="flex mt-20 justify-center">
        <CongratulationSection playAgain={resetGame} corrects={corrects} wrongs={wrongs} totalTime={totalTime} />
      </div>
    ) : (
        /* Display Current Question*/
        <GameQuestion
          loading={loading}
          images={images}
          currentIndex={currentIndex}
          increaseCorrects={increaseCorrects}
          increaseWrongs={increaseWrongs}
          corrects={corrects}
          totalTime={totalTime}
        />
    )}
  </div>
};

export default GameSection;