import React from "react";

export default function ConfirmDialog({
  open,
  title = "Confirmar ação",
  message = "Tem certeza que deseja continuar?",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-90 p-5 rounded-xl shadow-xl animate-fadeIn">
        {/* Título */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>

        {/* Mensagem */}
        <p className="text-gray-600 mb-5">{message}</p>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
