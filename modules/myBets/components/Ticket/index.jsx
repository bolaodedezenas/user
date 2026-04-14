"use client";


import { FaWhatsapp, FaDownload, FaTimes, FaPrint } from "react-icons/fa";
import { MdLocalActivity } from "react-icons/md";
import { useTicketBets } from "../../hooks/useTicketBets";
import Balls from "@/components/Balls";

export default function Ticket({ isOpen, onClose, ticket, poolName, contestNumber }) {
  const { bets } = useTicketBets(ticket?.id);
  
  if (!isOpen || !ticket) return null;

  const handleDownload = () => {
    window.print(); // Simples para demonstração, pode ser substituído por html2canvas
  };

  const handleWhatsapp = () => {
    const text = `Confira meu bilhete #${ticket.ticket_number} no bolão ${poolName}!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* CONTAINER DO BILHETE */}
      <div className="relative w-full max-w-md bg-zinc-100 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-zinc-500 shadow-sm transition-all"
        >
          <FaTimes size={20} />
        </button>

        {/* ÁREA DO "PAPEL" */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin">
          <div className="bg-white shadow-sm border-t-8 border-[rgb(var(--btn))] relative p-6 flex flex-col gap-6">
            {/* Efeito de recorte serrilhado (opcional/estilizado) */}
            <div className="absolute -bottom-2 left-0 right-0 h-4 bg-[url('https://www.transparenttextures.com/patterns/zigzag.png')] opacity-10"></div>

            {/* HEADER DO BILHETE */}
            <div className="text-center border-b border-dashed border-zinc-300 pb-6">
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 bg-[rgb(var(--blue-50))] rounded-full flex items-center justify-center text-[rgb(var(--btn))]">
                  <MdLocalActivity size={32} />
                </div>
              </div>
              <h2 className="text-xl font-black text-zinc-800 uppercase tracking-tight">
                Comprovante de Aposta
              </h2>
              <p className="text-sm font-bold text-zinc-400">
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

            {/* LISTA DE JOGOS (BETS) */}
            <div className="border-t border-dashed border-zinc-300 pt-6">
              <h3 className="text-[0.65rem] font-black text-zinc-400 uppercase mb-4 tracking-[0.2em]">
                Seus Jogos
              </h3>
              <div className="flex flex-col gap-3">
                {bets?.map((bet) => (
                  <div
                    key={bet.id}
                    className="flex items-center justify-between py-2 border-b border-zinc-200 last:border-0"
                  >
                    {/* <span className="text-[0.7rem] font-bold text-zinc-400">Jogo #{idx + 1}</span> */}
                    <div className="flex flex-wrap justify-end gap-1  ">
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
