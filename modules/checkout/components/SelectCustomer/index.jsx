"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch, FiLoader } from "react-icons/fi";

export default function SelectCustomer({
  label = "Buscar cliente",
  options = [],
  value,
  onChange,
  onSearch,
  isLoading = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value || null);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  // filtro local
  const filteredOptions = options.filter((option) => {
    const name = option.name?.toLowerCase() || "";
    const phone = option.phone?.toLowerCase() || "";
    const s = search.toLowerCase();

    return name.includes(s) || phone.includes(s);
  });

  // sync valor externo
  useEffect(() => {
    setSelected(value || null);
  }, [value]);

  // fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
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

  const handleSearchClick = (e) => {
    e.stopPropagation();
    if (isLoading) return;
    onSearch && onSearch(search);
  };

  return (
    <div ref={ref} className="relative">
      {/* botão */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex  gap-4 items-center  bg-white  rounded-lg px-3 py-3 text-sm shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] "
      >
        {selected?.avatar_url && (
          <img
            src={selected?.avatar_url}
            className="rounded-full w-8 h-8 "
            alt=""
          />
        )}
        <span>
          {selected
            ? `${selected.name} ${selected.phone ? `- ${selected.phone}` : ""}`
            : label}
        </span>

        <FiChevronDown
          className={`absolute right-4 font-black text-[1.5rem]   ransition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute top-12 w-full bg-white rounded-lg z-10 ">
          {/* search */}
          <div className="p-2 flex gap-2  ">
            <input
              type="text"
              placeholder="Nome ou telefone"
              value={search}
              onChange={(e) => {
                const val = e.target.value;
                setSearch(val);
                // Se o usuário limpar o campo, notificamos o pai para resetar a lista
                if (val === "") {
                  onSearch?.("");
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick(e)}
              className="bg-zinc-100 flex-1 outline-none border-0 rounded px-2 py-3 text-sm"
            />

            <button
              onClick={handleSearchClick}
              className="bg-[rgb(var(--blue-700))] text-white    px-3 rounded"
            >
              {isLoading ? (
                <FiLoader className="animate-spin " />
              ) : (
                <FiSearch />
              )}
            </button>
          </div>

          {/* lista */}
          <div className="max-h-48 overflow-auto shadow-md rounded-lg border-t border-gray-300">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-gray-500">
                Buscando...
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className="flex gap-2 items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  <div className="w-10 h-10">
                    <img
                      src={option?.avatar_url}
                      className="w-full h-full rounded-full"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="font-medium">{option.name}</div>
                    <div className="text-xs text-gray-500">{option.phone}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-400">
                Nenhum cliente encontrado
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
