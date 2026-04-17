"use client";

import { FiSearch } from "react-icons/fi";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Pesquisar...",
  className = "",
}) {
  return (
    <div
      className={`flex items-center bg-white rounded-[5px] shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)] px-4 py-3  `}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 outline-none text-gray-700 placeholder-gray-500 bg-transparent ${className}`}
      />

      <FiSearch className="text-gray-500 text-xl" />
    </div>
  );
}
