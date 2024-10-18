"use client"

import { useEffect, useState } from "react";
import ImageCarousel, { ImageQuestion } from "../components/imageCarousel";
import TimeLine from "../components/timeline";
import CongratulationSection from "./congratulationSection";
import { fetchPhotos } from "../api/util";

interface GameSectionProps {
  photos: ImageQuestion[];
  setPhotos: (img: ImageQuestion[]) => void;
}

const GameSection: React.FC<GameSectionProps> = ({ photos, setPhotos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [corrects, setCorrects] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [images, setImages] = useState<ImageQuestion[]>([]);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [winState, setWinState] = useState(false)

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

  useEffect(()=>{
    if(corrects >= 8){
      setIsFadingIn(false);

      setTimeout(() => {
        setWinState(true);
        setIsFadingIn(true); // Start fading in the game section
      }, 500);
    }
  },[corrects])

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

  const increaseCorrects = (index: number, option: number) => {
    setCorrects(corrects + 1);
    setCurrentIndex(corrects+1);
    updateImageOption(index, option);
  };

  const increaseWrongs = (index: number, option: number) => {
    setWrongs(wrongs + 1);
    updateImageOption(index, option);
  };

  const resetGame = async() => {
    setCorrects(0);
    setWrongs(0);
    setCurrentIndex(0);
    setLoading(true);
    const newPhotos = await fetchPhotos();
    setPhotos(newPhotos);
    setLoading(false);
    setIsFadingIn(false);
  };

  return <div className={`flex flex-col w-full justify-start flex-grow transition-opacity duration-500 ${
    isFadingIn ? "opacity-100" : "opacity-0"}`}>
        <TimeLine corrects={corrects} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
      {winState ? (
      <div className="flex mt-20 justify-center">
        <CongratulationSection playAgain={resetGame} corrects={corrects} wrongs={wrongs} />
      </div>
    ) : (
        <ImageCarousel
          loading={loading}
          images={images}
          currentIndex={currentIndex}
          increaseCorrects={increaseCorrects}
          increaseWrongs={increaseWrongs}
          corrects={corrects}
        />
    )}
  </div>
};

export default GameSection;