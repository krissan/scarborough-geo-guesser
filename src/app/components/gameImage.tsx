"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface GameImageProps {
  imageLoading: boolean;
  image: string;
  onLoad: ()=>void;
}

//Construct image based on question format
const GameImage: React.FC<GameImageProps> = ({
  imageLoading,
  image,
  onLoad
}) => {
  const [isBlur, setIsBlur] = useState(true); // Track pixelation state
  
  // Set blur when image is changed, before it is loaded
  useEffect(() => {
    setIsBlur(true);
  }, [image]);

  return (
    <Image
      src={image}
      alt="current"
      className={`w-full h-full object-cover ${isBlur ? "blur" : "remove-blur"} ${
        imageLoading ? "opacity-0" : "opacity-100"
      }`}
      width={1800}
      height={1800}
      onLoad={() => {
        // Clear blur when image is loaded
        onLoad();
        setIsBlur(false);
      }}
      />
  );
};


export default GameImage;
