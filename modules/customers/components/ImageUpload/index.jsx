
"use client";

import Paragraph from "@/components/paragraph";
import { useRef } from "react";
import { FaCloudUploadAlt, FaPen, FaTimes } from "react-icons/fa";
 
export default function ImageUpload({
  label = "Imagem",
  value,
  onChange,
  disabled = false,
  accept = "image/*",
  helperText = "PNG, JPG ou WEBP",
  className = "",
}) {
  const inputRef = useRef(null);

  function handleOpenFile() {
    if (!disabled) {
      inputRef.current?.click();
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    onChange?.({
      file,
      preview,
    });
  }

  function handleClearImage(e) {
    e.stopPropagation();

    onChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Input hidden */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {!value ? (
        <div className="flex items-center justify-center w-full h-full ">
          <button
            type="button"
            onClick={handleOpenFile}
            disabled={disabled}
            className="flex w-full h-full  flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="flex  p-3 items-center justify-center rounded-[10px] bg-blue-100 text-blue-600">
              <FaCloudUploadAlt size={40} />
            </div>

            <div>
              <Paragraph
                className="font-semibold text-[0.9rem] text-gray-800"
                text="Upload de imagem"
              />
              <Paragraph
                className="mt-1 text-[0.7rem] text-gray-500"
                text={helperText}
              />
            </div>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full  ">
          <button
            type="button"
            onClick={handleOpenFile}
            className="group relative w-full h-full   rounded-2xl   cursor-pointer"
          >
            {/* Imagem */}
            <img
              src={value.preview || value}
              alt="Preview"
              className="h-full w-full   transition    rounded-2xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-[rgb(var(--blue-50))]/40" />

            {/* Limpar */}
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute top-2 -right-3 flex h-8 w-8 items-center justify-center rounded-[8px] bg-red-500 text-white shadow-md transition hover:bg-red-600"
            >
              <FaTimes size={12} />
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
