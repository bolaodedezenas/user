'use client';
import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Select({
  label = "Select an option",
  options = [],
  value, // 👈 NOVO
  onChange,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const ref = useRef(null);

  // 🔑 SINCRONIZA quando o pai mudar o valor (bolão ou concurso)
  useEffect(() => {
    setSelected(value || null);
  }, [value, options]);

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onChange && onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative font-medium">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer min-w-50 flex justify-between items-center bg-white text-[rgb(var(--text))] rounded-[5px]
        shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] text-[1rem] ${className}`}
      >
        <span>
          {selected ? selected.name || selected.contestNumber : label}
        </span>
        <FiChevronDown
          className={`transition-transform duration-300 ml-2 text-[1.5rem] ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-14 min-w-50 bg-white border border-gray-300 rounded-[5px] shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 cursor-pointer hover:bg-[rgb(var(--blue-50))] border-b border-gray-200 transition-colors text-[0.9rem] text-center"
            >
              {option.name || option.contestNumber && `${option.contestNumber} - ${new Date(option.startAt).toLocaleDateString("pt-BR")} 📆`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
