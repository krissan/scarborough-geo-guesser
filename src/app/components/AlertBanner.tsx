import React, { useEffect, useState } from "react";

interface AlertBannerProps {
  message: string;
  timeVisible?: number; // Time visible in milliseconds (default: 15 seconds)
  onClose?: () => void; // Optional callback for when the banner closes
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  message,
  timeVisible = 15000, // Default to 15 seconds
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose(); // Trigger the optional onClose callback
    }, timeVisible);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [timeVisible, onClose]);

  if (!isVisible) return null; // Don't render if not visible

  return (
    <div className="bg-red text-white text-center py-3 px-4 shadow-md">
      {message}
    </div>
  );
};

export default AlertBanner;
