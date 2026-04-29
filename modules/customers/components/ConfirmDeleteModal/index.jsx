"use client";

import { FaTrashAlt, FaTimes } from "react-icons/fa";

export default function ConfirmDeleteModal({
  isOpen,
  title = "Confirmar exclusão",
  message = "Tem certeza que deseja excluir este item? Essa ação não poderá ser desfeita.",
  itemName = "",
  confirmText = "Excluir",
  cancelText = "Cancelar",
  loading = false,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget && !loading) {
      onClose?.();
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FaTrashAlt size={18} />
            </div>

            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {itemName && (
            <p className="mb-3 rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
              {itemName}
            </p>
          )}

          <p className="leading-relaxed text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Excluindo..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
