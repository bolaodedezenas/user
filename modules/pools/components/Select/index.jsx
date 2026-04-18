"use client";
import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch, FiLoader } from "react-icons/fi";

export default function Select({
  label = "Select an option",
  options = [],
  value, // 👈 NOVO
  onChange,
  onSearch, // 👈 Novo
  showSearch = false, // 👈 Novo
  isLoading = false, // 👈 Novo
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const [searchNumber, setSearchNumber] = useState("");
  const ref = useRef(null);

  // 🔍 FILTRO LOCAL: Filtra as opções conforme o usuário digita
  const filteredOptions = options.filter((option) => {
    const contestNum = option.contest_number?.toString() || "";
    const name = option.name?.toLowerCase() || "";
    const search = searchNumber.toLowerCase();

    return contestNum.includes(search) || name.includes(search);
  });

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

  // 🔄 RESET: Se o usuário apagar o campo, notifica o pai para restaurar a lista completa
  useEffect(() => {
    if (showSearch && searchNumber === "" && isOpen && value) {
      onSearch && onSearch("");
    }
  }, [searchNumber, showSearch, isOpen, value]);

  const handleSelect = (option) => {
    setSelected(option);
    onChange && onChange(option);
    setSearchNumber(""); // Limpa o campo ao selecionar
    setIsOpen(false);
  };

  const handleSearchClick = (e) => {
    e.stopPropagation(); // Impede que o select feche ao clicar no botão
    if (!searchNumber || isLoading) return;
    onSearch && onSearch(searchNumber);
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
          {selected ? selected.name || `${selected.contest_number} - ${new Date( selected.starts_at).toLocaleDateString("pt-BR")} `  : label}
        </span>
        <FiChevronDown
          className={`transition-transform duration-300 ml-2 text-[1.5rem] ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-14  w-full bg-white border border-gray-300 rounded-[5px] shadow-lg z-10 overflow-hidden">
          {showSearch && (
            <div className="p-2 border-b border-gray-200 flex gap-2 bg-gray-50">
              <input
                type="number"
                placeholder="Nº Concurso"
                className="flex-1 px-3 py-1.5 text-[0.8rem] w-full bg-white border border-gray-300 rounded focus:border-[rgb(var(--btn))] outline-none"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSearchClick}
                className="bg-[rgb(var(--btn))] text-white p-2 rounded hover:brightness-110 transition-all cursor-pointer flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <FiLoader size={20} className="animate-spin" />
                ) : (
                  <FiSearch size={20} />
                )}
              </button>
            </div>
          )}
          {isLoading ? (
            <li className="px-4 py-6 text-center flex justify-center items-center gap-2 text-zinc-500">
              <FiLoader className="animate-spin" size={18} />
              <span className="text-sm font-medium">Buscando no banco...</span>
            </li>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className="px-4 py-3 cursor-pointer hover:bg-[rgb(var(--blue-50))] border-b border-gray-200 transition-colors text-[0.9rem] text-center"
              >
                {option.name ||
                  (option.contest_number &&
                    `${option.contest_number} - ${new Date(option.starts_at).toLocaleDateString("pt-BR")} 📆`)}
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-zinc-400 text-sm italic">
              {searchNumber ? "Nada encontrado" : "Nenhuma opção disponível"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
