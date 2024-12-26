import React from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  loading,
  disabled = false
}) => {
  return (
      <button
        onClick={onClick}
        className="p-2 flex-none group"
        
        disabled={loading || disabled}
      >
        <FaTrash size={20} className={`${disabled ? "text-darkGray" :
          loading ? "animate-pulse text-darkRed" : "text-red group-hover:scale-105 group-hover:text-darkRed"}`}/>
      </button>
  );
};

export default DeleteButton;