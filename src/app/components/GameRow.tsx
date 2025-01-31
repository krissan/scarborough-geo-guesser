import React from "react";
import HostButton from "./buttons/HostButton"; 
import DeleteButton from "./buttons/DeleteButton";

interface GameRowProps {
  gameName: string;
  date: string;
  onHostClick: () => void;
  onDeleteClick: () => void;
  onUnHostClick?: () => void;
  loading?: boolean;
  selected?: boolean;
}

const GameRow: React.FC<GameRowProps> = ({
  gameName,
  date,
  onHostClick,
  onDeleteClick,
  onUnHostClick,
  loading,
  selected=false
}) => {
  return (
    <div className={`flex items-center justify-between gap-4 py-2 w-full`}>
      {/* Game name */}
      <span className="font-bold text-lg flex-grow break-words">{gameName}</span>

      {/* Date */}
      <span className="text-darkGray flex-none w-32 text-center">{date.slice(0,10)}</span>

      {/* Host button */}
      <div className="flex-none">
        <HostButton text={selected ? "Un-Host" : "Host"} onClick={selected ? onUnHostClick : onHostClick } loading={loading}  />
      </div>

      {/* Delete button */}
      <DeleteButton onClick={onDeleteClick} loading={loading} disabled={selected} />
    </div>
  );
};

export default GameRow;
