
import { MdPayment, MdHourglassEmpty } from "react-icons/md";
import { AiOutlineExport } from "react-icons/ai";

export default function TicketCard({ ticket, poolName, contestNumber, onView }) {
  return (
    <div className="min-w-[700px]  bg-white border shadow-md border-zinc-300 rounded-xl overflow-hidden hover:shadow-md transition-all group border-l-10 border-l-[rgb(var(--btn))] flex flex-col w-full">
      {/* HEADER */}
      <div className="  flex items-center gap-4 px-6 py-2 border-b border-zinc-300 text-[0.8rem] font-bold text-zinc-500 uppercase tracking-widest">
        <div className="flex-1 text-left  ">Nº Bilhete</div>
        <div className="flex-1 text-left  ">Bolão / Concurso</div>
        <div className="flex-1 flex justify-center">Apostas</div>
        <div className="flex-1 flex justify-center  ">Status</div>
        <div className="flex-1 flex justify-end  ">Valor Total</div>
        <div className="flex-1 flex justify-end  ">Ações</div>
      </div>

      {/* ROW */}
      <div className="flex items-center gap-4 px-6 py-4">
        {/* Coluna 1 */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 text-left">
          <span className="text-[1.2rem] md:text-base font-black text-zinc-700">
            #{ticket.ticket_number}
          </span>
        </div>

        {/* Coluna 2 */}
        <div className="flex-1 flex flex-col text-left">
          <span className="text-sm font-bold text-zinc-600 truncate">
            {poolName}
          </span>
          <span className="text-sm text-zinc-600">#{contestNumber}</span>
        </div>

        {/* Coluna 3 */}
        <div className="flex-1 flex flex-col items-center">
          <span className="text-lg font-black text-zinc-600">
            {ticket.total_bets <= 9
              ? `0${ticket.total_bets}`
              : ticket.total_bets}
          </span>
        </div>

        {/* Coluna 4 */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className={`px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse ${
              ticket.status === "completed"
                ? "bg-green-50 text-green-600"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            {ticket.status === "completed" ? (
              <MdPayment size={18} />
            ) : (
              <MdHourglassEmpty size={18} />
            )}
            <span className="text-xs font-black uppercase ">
              {ticket.status === "completed" ? "Pago" : "Pendente"}
            </span>
          </div>
        </div>

        {/* Coluna 5 */}
        <div className="flex-1 flex   justify-end">
          <span className="text-lg font-black text-[rgb(var(--btn))]">
            {ticket.total_value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        {/* Coluna 6 */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={onView}
            className="w-10 h-10 flex items-center justify-center bg-zinc-100 rounded-lg text-zinc-600 group-hover:bg-[rgb(var(--blue-50))] group-hover:text-[rgb(var(--btn))] transition-all cursor-pointer border border-zinc-100"
          >
            <AiOutlineExport size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
