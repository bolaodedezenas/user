"use client";

import { useState } from "react";
// components
import PageLoading from "@/components/PageLoading";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import Select from "@/modules/pools/components/Select";
import SearchInput from "@/components/SearchInput";
// icons
import { FaSearch, FaReceipt } from "react-icons/fa";
// stores / hooks
import { useBetsStore } from "@/modules/pools/stores/useBetsStore";
import { useMyTickets } from "@/modules/myBets/hooks/useMyBets";
import TicketCard from "@/modules/myBets/components//TicketCard";
import Ticket from "@/modules/myBets/components/Ticket";

const statusOptions = [
  { name: "Todos", id: "all" },
  { name: "Pagos", id: "completed" },
  { name: "Pendentes", id: "pending" },
];

export default function MyBets() {
  const { activePool, activeContest } = useBetsStore();
  const { myTickets, isLoading } = useMyTickets(activePool?.id, activeContest?.id);

  const [searchNumber, setSearchNumber] = useState("");
  const [statusFilter, setStatusFilter] = useState(statusOptions[0]);
  const [selectedTicket, setSelectedTicket] = useState(null);


  // Filtro local para busca e status
  const filteredTickets = myTickets.filter((ticket) => {
    const matchesNumber =
      searchNumber === "" ||
      ticket.ticket_number?.toString().includes(searchNumber);
    const matchesStatus =
      statusFilter.id === "all" || ticket.status === statusFilter.id;
    return matchesNumber && matchesStatus;
  });

  if (isLoading) return <PageLoading />;

  return (
    <section className="  bg-[rgb(var(--blue-50))]">
      <div className=" bg-white rounded-xl shadow-md p-3 sx:p-8 w-full min-h-full flex flex-col gap-6">
        {/* HEADER COM CONTADOR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-300 pb-4">
          <div>
            <Title text="Minhas Apostas" className="text-zinc-700 font-bold" />
            <Paragraph
              text="Acompanhe seus jogos realizados neste concurso."
              className="text-zinc-500"
            />
          </div>

          {/* FILTROS */}
          <div className="flex  flex-wrap items-center justify-center gap-10 bg-zinc-0 p-4 rounded-xl border border-zinc-100">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <SearchInput
                value={searchNumber}
                onChange={setSearchNumber}
                placeholder="Nº do bilhete"
                className="w-48"
              />
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                className=" w-60 py-3 px-4"
              />

              <div className="bg-[rgb(var(--blue-50))] px-6 py-3 rounded-[0.6rem] flex  items-center  gap-6">
                <FaReceipt className="text-[rgb(var(--btn))] text-xl" />
                <div className="flex  items-center gap-4 ">
                  <span className="text-[1rem] uppercase font-bold text-zinc-400">
                    Bilhetes
                  </span>
                  <span className="text-[1.2rem] font-black text-black leading-none">
                    {filteredTickets.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LISTAGEM COM ROLAGEM */}
        <section className="overflow-auto py-4 ">
          <div
            className="flex flex-wrap  justify-center  gap-6  px-4  rounded-lg   overflow-auto 
            min-w-[760px]
            max-h-[390px] scrollbar-thin"
          >
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  poolName={activePool?.name}
                  contestNumber={activeContest?.contest_number}
                  onView={() => setSelectedTicket(ticket)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center   gap-3">
                <FaReceipt className="text-5xl text-zinc-200" />
                <span className="text-zinc-400 italic">
                  Nenhum bilhete encontrado para estes filtros.
                </span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* MODAL DO BILHETE */}
      <Ticket
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket} // Passar o objeto completo, não apenas o ID
        poolName={activePool?.name}
        contestNumber={activeContest?.contest_number}
      />
    </section>
  );
}
