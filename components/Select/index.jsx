import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Select({
  label = "Select an option",
  options = [],
  onChange,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

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
    <div ref={ref} className={` relative font-medium ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="cursor-pointer min-w-50 flex justify-between items-center  bg-white  text-[rgb(var(--text))] rounded-[5px] px-5 py-3    transition-all duration-300
        shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] text-[1rem]
        "
      >
        <span>{selected ? selected.label : label}</span>
        <FiChevronDown
          className={`transition-transform duration-300 ml-2 text-[1.5rem] ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-14 min-w-50  bg-white border border-gray-300 rounded-[5px] shadow-lg overflow-hidden animate-fadeIn">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 cursor-pointer hover:bg-[rgb(var(--blue-50))] transition-colors text-[0.9rem]"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Animação */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease forwards;
        }
      `}</style>
    </div>
  );
}
