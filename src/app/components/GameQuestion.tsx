"use client";

import { useState, useEffect } from "react";
import Answers, { Option } from "./Answers";
import GameImage from "./GameImage";
import ImageHeaderSkeleton from "./loading/ImageHeaderSkeleton";
import AnswersSkeleton from "./loading/AnswersSkeleton";

export interface ImageQuestion {
  image: string;
  author: string;
  authorLink?: string;
  answer: number;
  options: Option[];
  finished: boolean;
  questionFormat?: string;
}

interface GameQuestionProps {
  images: ImageQuestion[];
  currentIndex: number;
  increaseCorrects: (index: number, option: number, timeTaken: number) => void;
  increaseWrongs: (index: number, option: number) => void;
  loading: boolean;
  corrects: number;
  totalTime: number;
}

// Display Image Question with image, image related info and choices for questions
const GameQuestion: React.FC<GameQuestionProps> = ({
  images,
  currentIndex,
  increaseCorrects,
  increaseWrongs,
  loading,
  corrects,
  totalTime,
}) => {
  const [fade, setFade] = useState(false); // triggers fade-in(false) & fade-out(false)
  const [displayIndex, setDisplayIndex] = useState(currentIndex); // index at which to display image
  const [imageLoading, setImageLoading] = useState(true); // tracks whether image has been loaded for display
  const [startTime, setStartTime] = useState(0); // track start time of each question
  const [displayedTime, setDisplayedTime] = useState(
    (totalTime / 1000).toFixed(2)
  ); // elapsed-time to be displayed
  const [timing, setTiming] = useState(false); // tracks wether player should be being timed

  // Update time being displayed
  useEffect(() => {
    const interval = setInterval(() => {
      if (timing) {
        const timeTaken = totalTime + (Date.now() - startTime) / 1000;
        setDisplayedTime(timeTaken.toFixed(2));
      }
    }, 500);

    return () => clearInterval(interval); // Clean up on unmount
  }, [startTime, timing, totalTime]);

  // Fade out current image when current index is updated
  useEffect(() => {
    if (corrects > 0) {
      setFade(true); // Start fade out

      const timeout = setTimeout(() => {
        setDisplayIndex(currentIndex); // Update the displayed image
        setImageLoading(true); // Prepare for loading new image
      }, 200); // Time for fade-out effect

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, corrects]);

  useEffect(() => {
    if (!imageLoading) {
      // Fade back in after the new image has loaded
      const timeout = setTimeout(() => {
        setFade(false); // Fade back in
      }, 200); // Delay to ensure the image is set before fading in

      return () => clearTimeout(timeout);
    }
  }, [imageLoading]);

  return (
    <div
      className={`flex flex-col min-h-screen pb-32 transition-opacity duration-200 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Photographer information & Time Elapsed*/}
      <div className="flex justify-between mx-auto mb-2 w-4/5 ">
        <div className="flex justify-start">
          <div className="text-darkGray pr-1">Photographer: </div>
          {!loading ? (
            <>
              {images[displayIndex].authorLink ? (
                <a
                  className="h-6 text-ellipsis text-darkPurple hover:text-purple font-bold"
                  href={images[displayIndex].authorLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {images[displayIndex].author}
                </a>
              ) : (
                <div className="h-6 text-ellipsis text-black font-bold">
                  {images[displayIndex].author}
                </div>
              )}
            </>
          ) : (
            <ImageHeaderSkeleton />
          )}
        </div>
        <div className="flex justify-start   text-black">
          <div className="text-darkGray pr-1">Total Time: </div>
          {displayedTime}
        </div>
      </div>

      {/* Image container */}

      <div className="overflow-x-auto w-screen flex flex-row justify-start">
        <div className="h-auto flex justify-center">
          <div
            className={`w-4/5 max-h-full h-auto ${imageLoading || loading ? "animate-pulse bg-gray" : ""}`}
          >
            {!loading ? (
              <GameImage
                image={images[displayIndex].image}
                imageLoading={imageLoading}
                onLoad={() => {
                  setImageLoading(false);
                  setStartTime(Date.now());
                  setTiming(true);
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Choice section */}
      {!loading ? (
        <Answers
          options={images[displayIndex].options}
          answer={images[displayIndex].answer}
          increaseCorrects={(index: number, option: number) => {
            const timeTaken = (Date.now() - startTime) / 1000;
            increaseCorrects(index, option, timeTaken);
            setTiming(false);
          }}
          increaseWrongs={increaseWrongs}
          imageIndex={displayIndex}
        />
      ) : (
        <AnswersSkeleton />
      )}
    </div>
  );
};

export default GameQuestion;
