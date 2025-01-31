"use client";

import { useState, useEffect } from "react";
import { Option } from "./Answers";
import GameImage from "./GameImage";
import AnswersSkeleton from "./loading/AnswersSkeleton";
import ImageHeaderSkeleton from "./loading/ImageHeaderSkeleton";
import { Question } from "../services/responseInterfaces";

export interface ImageQuestion {
  image: string;
  author: string;
  authorLink?: string;
  answer: number;
  options: Option[];
  finished: boolean;
  questionFormat?:string
}

interface GameQuestionAdminProps {
  images: Question[];
  currentIndex: number;
  loading: boolean;
  totalTime:number;
}

// Display Image Question with image, image related info and choices for questions
const GameQuestionAdmin: React.FC<GameQuestionAdminProps> = ({
  images,
  currentIndex,
  loading,
  totalTime,
}) => {
  const [displayIndex, setDisplayIndex] = useState(currentIndex); // index at which to display image  
  const [imageLoading, setImageLoading] = useState(true); // tracks whether image has been loaded for display


  // Fade out current image when current index is updated
  useEffect(() => {
    setDisplayIndex(currentIndex); // Update the displayed image
    setImageLoading(true); // Prepare for loading new image
  }, [currentIndex]);

  
  return (
    <div
      className={`flex flex-col h-auto my-auto pb-20 transition-opacity duration-200`}
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
            <ImageHeaderSkeleton/>
          )}
        </div>
        <div className="flex justify-start text-black"><div className="text-darkGray pr-1">Total Time: </div>{totalTime}</div>
      </div>

      {/* Image container */}

      <div className="overflow-x-auto w-screen flex">
        <div className="relative h-[500px] md:h-[700px] min-w-[100vw] flex-shrink-0 flex justify-center items-center">
          <div className={`w-4/5 h-full ${imageLoading || loading ? "animate-pulse bg-gray" : ""}`}>
            {!loading && images[displayIndex].img ? (
              <GameImage
                image={images[displayIndex].img}
                imageLoading={imageLoading}
                onLoad={() => {
                  setImageLoading(false);
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
        <div className="h-24">
          <div className="flex flex-col py-6 items-center mx-auto md:grid md:grid-cols-2 md:gap-4 w-8/12 md:justify-items-center">
            <div className="pl-2 pr-4 bg-green">Answer: {images[displayIndex].answer}</div>
            <div className="pl-2 pr-4 text-black">{images[displayIndex].throwOffAnswer1}</div>
            <div className="pl-2 pr-4 text-black">{images[displayIndex].throwOffAnswer2}</div>
            <div className="pl-2 pr-4 text-black">{images[displayIndex].throwOffAnswer3}</div>
          </div>
        </div>
      ) : (
        <AnswersSkeleton/>
      )}
    </div>
  );
};

export default GameQuestionAdmin;
