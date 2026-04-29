"use client";

import { useId } from "react";

export default function ToggleSwitch({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  activeText = "Ativo",
  inactiveText = "Inativo",
  className = "",
}) {
  const id = useId();

  const sizes = {
    sm: {
      wrapper: "w-8 h-4",
      ball: "w-4 h-4",
      translate: "translate-x-3.5",
      text: "text-sm",
    },
    md: {
      wrapper: "w-11 h-8",
      ball: "w-6 h-6",
      translate: "translate-x-6",
      text: "text-sm",
    },
    lg: {
      wrapper: "w-11 h-9",
      ball: "w-7 h-7",
      translate: "translate-x-7",
      text: "text-base",
    },
  };

  const current = sizes[size];

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-3 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${className}`}
    >
      {label && (
        <span className={`font-medium text-gray-700 ${current.text}`}>
          {label}
        </span>
      )}

      <div className="flex items-center gap-2">
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange?.(!checked)}
          className={`
            relative rounded-full transition-all duration-300 ease-in-out cursor-pointer
            ${current.wrapper}
            ${
              checked
                ? "bg-green-500 shadow-green-200 shadow-md"
                : "bg-gray-300"
            }
          `}
        >
          <span
            className={`
              absolute left-0.5 top-0 rounded-full bg-white shadow-md
              transition-all duration-300 ease-in-out
              ${current.ball}
              ${checked ? current.translate : "translate-x-0"}
            `}
          />
        </button>

        <span className={`font-medium ${current.text}`}>
          {checked ? activeText : inactiveText}
        </span>
      </div>
    </label>
  );
}
