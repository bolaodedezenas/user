"use client";

import { useEffect, useState } from "react";

// react-icons
import { MdOutlineContentCopy, MdCheck, MdClose } from "react-icons/md";
import { FaClock } from "react-icons/fa6";


export default function PixPaymentModal({ open, onClose, paymentData }) {
  const [copied, setCopied] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 min

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  async function handleCopyPix() {
    try {
      await navigator.clipboard.writeText(paymentData?.qr_code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0",
    )}:${String(secs).padStart(2, "0")}`;
  }

  if (!open || !paymentData) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-black/10
        backdrop-blur-sm
        flex items-center justify-center
        p-4
      "
    >
      <div
        className="
          w-full max-w-[420px]
          bg-[rgb(var(--blue-800))]
          border border-white/10
          rounded-3xl
          p-6
          flex flex-col
          items-center
          gap-5
          relative
          shadow-md
        "
      >
        {/* fechar */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            text-zinc-400
            hover:text-white
            transition
          "
        >
          <MdClose size={22} />
        </button>

        {/* titulo */}
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold">Pagamento PIX</h2>

          <p className="text-zinc-400 text-sm mt-1">
            Escaneie o QR Code abaixo
          </p>
        </div>

        {/* timer */}
        <div
          className="
            bg-yellow-500/10
            border border-yellow-500/20
            text-yellow-400
            px-4 py-2
            rounded-full
            text-sm font-medium
          "
        >
          Expira em {formatTime(timeLeft)}
        </div>

        {/* qrcode */}
        <div className="bg-white rounded-2xl shadow-md">
          <img
            src={`data:image/png;base64,${paymentData.qr_code_base64}`}
            alt="QR Code PIX"
            className="w-[240px] h-[240px] object-contain rounded-2xl"
          />
        </div>

        {/* copia e cola */}
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm text-zinc-400">Código PIX Copia e Cola</span>
          <button
            onClick={handleCopyPix}
            className="
            w-full
            flex items-center justify-center gap-2
            bg-green-500
            hover:bg-green-400
            text-white
            font-medium
            py-3
            rounded-xl
            transition
          "
          >
            {copied ? (
              <>
                <MdCheck size={20} />
                Código copiado!
              </>
            ) : (
              <>
                <MdOutlineContentCopy size={20} />
                Copiar código PIX
              </>
            )}
          </button>
        </div>

        {/* status */}
        <div
          className="
            flex items-center gap-5
            justify-center
            w-full
            bg-white/10
            rounded-[10px]
            p-4
            text-center
          "
        >
          <p className="text-white text-[0.8rem]">
            Aguardando confirmação do pagamento
          </p>
          <div>
            <FaClock size={20} className="text-white animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
}
