import React from "react";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export default function ActionButton({ label, onClick, isActive }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 m-1 text-white ${isActive ? "bg-blue-600" : "bg-gray-400"} rounded`}
    >
      {label}
    </button>
  );
}
