"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Answers, { Option } from "./answers";

export interface ImageQuestion {
  image: string;
  author: string;
  authorLink?: string;
  answer: number;
  options: Option[];
  finished: boolean;
}

interface ImageCarouselProps {
  images: ImageQuestion[]; // Array of image URLs
  currentIndex: number; // The current index of the displayed image
  increaseCorrects: (index: number, option: number) => void;
  increaseWrongs: (index: number, option: number) => void;
  loading: boolean;
  corrects: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  currentIndex,
  increaseCorrects,
  increaseWrongs,
  loading,
  corrects
}) => {
  const [isFading, setIsFading] = useState(false); // Track fading state
  const [displayIndex, setDisplayIndex] = useState(currentIndex); // The image being displayed
  const [imageLoading, setImageLoading] = useState(true);
  // Fade out, switch image, then fade in
  useEffect(() => {
    if(corrects > 0) {
      setIsFading(true); // Start fade out

      const timeout = setTimeout(() => {
        setDisplayIndex(currentIndex); // Update the displayed image
        setImageLoading(true);
        setIsFading(false); // Fade back in
      }, 500); // 500ms for the fade-out effect

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, corrects]);

  useEffect(()=>{
    console.log(loading);
    console.log(imageLoading);
  },[imageLoading, loading])

  return (
    <div
      className={`flex flex-col h-auto my-auto pb-20 transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Photographer information */}
      <div className="flex mx-auto mb-2 w-4/5 justify-start">
        <div className="text-darkGray pr-1">Photographer: </div>
        {!loading ? <>{images[displayIndex].authorLink ? (
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
        )}</>:<div className="animate-pulse h-6 w-12"></div>}
      </div>

      {/* Image container */}
      <div className="relative h-[500px] md:h-[700px] flex justify-center items-center w-screen ">
        <div className={`w-4/5 h-full mx-auto ${imageLoading || loading ? "animate-pulse bg-gray" : ""}`}>
        {!loading ?
          <Image
            src={images[displayIndex].image}
            alt="current"
            className={`w-full h-full object-cover ${imageLoading ? "opacity-1" : "opacity-100"}`}
            width={1800}
            height={1800}
            onLoad={() => {console.log("loaded");setImageLoading(false)}}
          />
          :<></>}
        </div>
      </div>

      {/* Answer section */}
      {!loading ?
        <Answers
        options={images[displayIndex].options}
        answer={images[displayIndex].answer}
        increaseCorrects={increaseCorrects}
        increaseWrongs={increaseWrongs}
        imageIndex={displayIndex}
        />
        :
        <div className="flex flex-col items-center mx-auto md:grid md:grid-cols-2 md:gap-4 w-8/12 md:justify-items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-row items-center justify-start p-2 mt-4 rounded-lg border-black border-2 w-48 min-h-10 text-left
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-300"
            >
              <div className="pl-2 pr-4 h-4 w-6 bg-gray-400 rounded-md"></div>
              <div className="h-4 w-3/5 bg-gray-400 rounded-md"></div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default ImageCarousel;