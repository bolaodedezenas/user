"use client";

import { useRef } from "react";
import { FaWhatsapp, FaDownload, FaTimes, FaPrint } from "react-icons/fa";
import { MdLocalActivity } from "react-icons/md";
import { useTicketBets } from "../../hooks/useTicketBets";
import Balls from "@/components/Balls";
import { toPng } from "html-to-image";


export default function Ticket({ isOpen, onClose, ticket, poolName, contestNumber }) {
  const { bets } = useTicketBets(ticket?.id);

  const ticketRef = useRef(null);

  if (!isOpen || !ticket) return null;
 
  const handleDownload = async () => {
    if (!ticketRef.current) return;

    try {
      const { default: jsPDF } = await import("jspdf");

      const node = ticketRef.current;

      const dataUrl = await toPng(node, {
        pixelRatio: 5,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      //  largura tipo cupom (80mm ou 58mm)
      const pdfWidth = 80; // mm (tipo maquininha)

      // pega proporção da imagem
      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const ratio = img.height / img.width;

      const pdfHeight = pdfWidth * ratio;

      // cria PDF com tamanho DINÂMICO
      const pdf = new jsPDF({
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save(`bilhete-${ticket.ticket_number}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };


const handleWhatsapp = async () => {
  if (ticketRef.current && navigator.share) {
    try {
      const { default: jsPDF } = await import("jspdf");

      const node = ticketRef.current;

      //  gera imagem base (alta qualidade)
      const dataUrl = await toPng(node, {
        pixelRatio: 4,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      // formato cupom  
      const pdfWidth = 80;

      const img = new Image();
      img.src = dataUrl;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const ratio = img.height / img.width;
      const pdfHeight = pdfWidth * ratio;

      const pdf = new jsPDF({
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      // gera blob do PDF
      const pdfBlob = pdf.output("blob");

      const file = new File([pdfBlob], `bilhete-${ticket.ticket_number}.pdf`, {
        type: "application/pdf",
      });

      //  envia como arquivo (SEM compressão)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Bolão de Dezenas",
          text: `Confira meu bilhete #${ticket.ticket_number}`,
        });
        return;
      }
    } catch (error) {
      console.error("Erro ao compartilhar PDF:", error);
    }
  }

  // fallback
  const text = `Confira meu bilhete #${ticket.ticket_number} no Bolão de Dezenas (${poolName})!`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
};


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* CONTAINER DO BILHETE */}
      <div className="relative w-full max-w-md bg-zinc-100 rounded-xl shadow-2xl overflow-hidden flex flex-col pt-8 max-h-[95vh]">
        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-zinc-500 shadow-sm transition-all"
        >
          <FaTimes size={20} />
        </button>

        {/* ÁREA DO "PAPEL" */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin">
          <div
            ref={ticketRef}
            className="bg-white shadow-sm border-t-8 border-[rgb(var(--btn))] relative p-6 flex flex-col gap-6"
          >
            {/* HEADER DO BILHETE */}
            <div className="text-center border-b border-dashed border-zinc-300 pb-6">
              <p className="text-[1rem] font-black text-[rgb(var(--btn))] uppercase   mb-2">
                Bolão de Dezenas
              </p>
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 bg-[rgb(var(--blue-50))] rounded-full flex items-center justify-center text-[rgb(var(--btn))]">
                  <MdLocalActivity size={32} />
                </div>
              </div>
              <h2 className="text-xl font-black text-zinc-800 uppercase tracking-tight">
                Comprovante de Aposta
              </h2>
              <p className="text-sm font-bold text-zinc-500">
                Bilhete #{ticket.ticket_number}
              </p>
            </div>

            {/* INFOS GERAIS */}
            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase">
              <div className="flex flex-col">
                <span className="text-zinc-400">Bolão</span>
                <span className="text-zinc-700 truncate">{poolName}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-zinc-400">Concurso</span>
                <span className="text-zinc-700">#{contestNumber}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-zinc-400">Data do Sorteio</span>
                <span className="text-zinc-700">25/12/2023</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-zinc-400">Status</span>
                <span
                  className={
                    ticket.status === "completed"
                      ? "text-green-600"
                      : "text-orange-600"
                  }
                >
                  {ticket.status === "completed" ? "PAGO" : "PENDENTE"}
                </span>
              </div>
            </div>

            {/* DADOS DO APOSTADOR */}
            <div className="border-t border-dashed border-zinc-300 pt-6">
              <h3 className="text-[0.65rem] font-black text-zinc-400 uppercase mb-3 tracking-[0.2em]">
                Identificação do Apostador
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[0.7rem]">
                  <span className="font-bold text-zinc-400 uppercase">
                    Nome
                  </span>
                  <span className="font-black text-zinc-800 uppercase">
                    {ticket?.user_name || "Bolão de Dezenas"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[0.7rem]">
                  <span className="font-bold text-zinc-400 uppercase">
                    Telefone
                  </span>
                  <span className="font-black text-zinc-800 uppercase">
                    {ticket?.user_phone || "(00) 00000-0000"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[0.7rem]">
                  <span className="font-bold text-zinc-400 uppercase">
                    Cidade / UF
                  </span>
                  <span className="font-black text-zinc-800 uppercase">
                    {ticket?.user_city
                      ? `${ticket.user_city} / ${ticket.user_state || ""}`
                      : "Brasilia-DF"}
                  </span>
                </div>
              </div>
            </div>

            {/* LISTA DE JOGOS (BETS) */}
            <div className="border-t border-dashed border-zinc-300 pt-6">
              <h3 className="text-[0.65rem] font-black text-zinc-400 uppercase mb-4 tracking-[0.2em]">
                Seus Jogos
              </h3>
              <div className="flex flex-col gap-3">
                {bets?.map((bet, idx) => (
                  <div
                    key={bet.id}
                    className="flex flex-col gap-2 py-2 border-b border-zinc-200 last:border-0"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[0.7rem] font-bold text-zinc-500 uppercase">
                        Jogo #{idx + 1}
                      </span>
                      <span className="text-[0.65rem] font-bold text-zinc-400">
                        {(
                          (ticket?.total_value || 0) / (bets?.length || 1)
                        ).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1">
                      {bet.numbers.map((num) => (
                        <Balls
                          key={num}
                          number={num}
                          size="sm"
                          className="w-7 h-7 text-[0.7rem] bg-zinc-400  "
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TOTAL */}
            <div className="mt-4 pt-6 border-t-2 border-zinc-800 flex justify-between items-center">
              <span className="font-black text-zinc-800 uppercase text-sm">
                Valor Total
              </span>
              <span className="text-2xl font-black text-[rgb(var(--btn))]">
                {ticket?.total_value?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* AÇÕES FIXAS NO RODAPÉ DO MODAL */}
        <div className="p-4 bg-white border-t border-zinc-200 grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsapp}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-sm transition-all"
          >
            <FaWhatsapp size={18} /> WhatsApp
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-800 hover:bg-zinc-900 text-white rounded-lg font-bold text-sm transition-all"
          >
            <FaDownload size={18} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}
