import React from "react";
import HostButton from "./HostButton"; 
import { FaTrash } from "react-icons/fa";

interface GameRowProps {
  gameName: string;
  date: string;
  onHostClick: () => void;
  onDeleteClick: () => void;
}

const GameRow: React.FC<GameRowProps> = ({
  gameName,
  date,
  onHostClick,
  onDeleteClick,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 py-4 w-full">
      {/* Game name */}
      <span className="font-bold text-lg flex-grow break-words">{gameName}</span>

      {/* Date */}
      <span className="text-gray-500 flex-none w-32 text-center">{date}</span>

      {/* Host button */}
      <div className="flex-none">
        <HostButton text="Host" onClick={onHostClick} />
      </div>

      {/* Delete button */}
      <button
        onClick={onDeleteClick}
        className="p-2 text-red-500 hover:text-red-700 flex-none"
      >
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default GameRow;
