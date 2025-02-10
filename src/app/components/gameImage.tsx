"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

interface GameImageProps {
  imageLoading: boolean;
  image: string;
  onLoad: () => void;
}

const GameImage: React.FC<GameImageProps> = ({
  imageLoading,
  image,
  onLoad
}) => {
  const [isBlur, setIsBlur] = useState(true); // Track pixelation state
  const [isImageValid, setIsImageValid] = useState(true); // Track if the image is valid

  // Set blur when image is changed, before it is loaded
  useEffect(() => {
    setIsBlur(true);
    setIsImageValid(true); // Reset image validity on change
  }, [image]);

  const handleError = (e) => {
    console.error(e.target.id);
    setIsImageValid(false); // Set image as invalid if error occurs
  };

  if (!isImageValid) {
    return <div>Image is not supported or invalid.</div>; // Show fallback message
  }

  return (
    <Image
      src={image}
      alt="current"
      className={`max-w-full max-h-[60vh] object-contain ${isBlur ? "blur" : "remove-blur"} ${imageLoading ? "opacity-0" : "opacity-100"}`}
      width={1800}
      height={1800}
      onLoad={() => {
        // Clear blur when image is loaded
        onLoad();
        setIsBlur(false);
      }}
      onError={handleError} // Handle image loading error
    />
  );
};

export default GameImage;
