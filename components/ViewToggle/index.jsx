"use client";

import { FaTable, FaThLarge } from "react-icons/fa";

export default function ViewToggle({ value, onChange }) {
  return (
    <div className="flex items-center bg-zinc-100 p-2 rounded-xl w-fit">
      {/* TABELA */}
      <button
        onClick={() => onChange(false)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
          value
            ? "bg-white shadow-sm text-[rgb(var(--btn))]"
            : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        <FaTable size={20} />
        <span className="hidden sm:inline">Tabela</span>
      </button>

      {/* CARD */}
      <button
        onClick={() => onChange(true)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
          !value
            ? "bg-white shadow-sm text-[rgb(var(--btn))]"
            : "text-zinc-500 hover:text-zinc-700"
        }`}
      >
        <FaThLarge size={20} />
        <span className="hidden sm:inline">Cards</span>
      </button>
    </div>
  );
}
