"use client";

import React, { useState } from "react";
import { useBetsStore } from "@/modules/pools/stores/useBetsStore";
import Ball from "@/components/Balls";
import {
  FaEdit,
  FaCheck,
  FaWindowClose,
  FaShoppingCart,
  FaChevronRight,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useCheckout } from "../../hooks/useCheckout";
import toast from "react-hot-toast";

export default function Cart() {
  const { tickets, setTickets, removeTicket } = useBetsStore();
  const [editingPath, setEditingPath] = useState(null); // { pool_id, contest_id, betIndex }
  const [isOpen, setIsOpen] = useState(false);
  const [tempBet, setTempBet] = useState([]);

  const { handleCheckout, isPending } = useCheckout();

  // console.log(tickets);

  // Função para deletar um bilhete inteiro
  const handleDeleteTicket = (pool_id, contest_id) => {
    removeTicket(pool_id, contest_id);
  };

  // Função para deletar um jogo individual
  const handleDeleteGame = (pool_id, contest_id, betIndex) => {
    const newTickets = tickets
      .map((ticket) => {
        if (ticket.pool_id === pool_id && ticket.contest_id === contest_id) {
          const updatedBets = ticket.bets.filter((_, i) => i !== betIndex);
          return {
            ...ticket,
            bets: updatedBets,
            total_bets: updatedBets.length,
            total_value: updatedBets.length * ticket.bet_price,
          };
        }
        return ticket;
      })
      .filter((ticket) => ticket.bets.length > 0);
    setTickets(newTickets);
    toast.success("Jogo removido!");
  };

  // Se não houver jogos, não renderiza nada
  if (tickets.length === 0) {
    return null;
  }

  // Iniciar modo de edição
  const handleEdit = (pool_id, contest_id, betIndex, balls) => {
    setEditingPath({ pool_id, contest_id, betIndex });
    setTempBet([...balls]);
  };

  // Salvar as alterações
  const handleSave = (pool_id, contest_id, betIndex) => {
    // Validação: Verifica se todos os campos estão preenchidos e se são exatamente 10 dezenas
    const isValid = tempBet.every((num) => num && num.trim() !== "");

    if (!isValid || tempBet.length !== 10) {
      toast.error("O jogo deve conter exatamente 10 dezenas preenchidas!");
      return;
    }

    const newTickets = tickets.map((ticket) => {
      if (ticket.pool_id === pool_id && ticket.contest_id === contest_id) {
        const newBets = ticket.bets.map((b, i) =>
          i === betIndex ? { ...b, numbers: tempBet } : b,
        );
        return { ...ticket, bets: newBets };
      }
      return ticket;
    });

    setTickets(newTickets);
    setEditingPath(null);
    toast.success("Jogo atualizado com sucesso!");
  };

  // Cancelar edição
  const handleCancel = () => {
    setEditingPath(null);
    setTempBet([]);
  };

  // Atualizar dezena individual durante a edição
  const handleInputChange = (val, i) => {
    const numericValue = val.replace(/\D/g, "").slice(0, 2); // Apenas números e máx 2 dígitos
    const newTempBet = [...tempBet];
    newTempBet[i] = numericValue;
    setTempBet(newTempBet);
  };

  // Cálculos de Totalizadores
  const totalGamesCount = tickets.reduce((acc, t) => acc + t.total_bets, 0);
  const grandTotal = tickets.reduce((acc, t) => acc + t.total_value, 0);

  return (
    <>
      {/* BOTÃO FLUTUANTE (Quando fechado) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-6 bg-[rgb(var(--btn))] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group cursor-pointer"
        >
          <div className="relative">
            <FaShoppingCart size={24} />
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
              {totalGamesCount}
            </span>
          </div>
          <span className="font-bold text-sm hidden group-hover:block transition-all">
            Ver Jogos
          </span>
        </button>
      )}

      {/* OVERLAY (Escurecer fundo quando aberto) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* PAINEL DO CARRINHO */}
      <div
        className={`rounded-2xl fixed top-[1.5%] right-3 h-[97%] bg-white shadow-2xl z-[60] overflow-hidden
         transition-transform duration-300 ease-in-out w-full max-w-[320px] flex flex-col ${isOpen ? "translate-x-0" : "translate-x-[115%]"}`}
      >
        {/* HEADER DO PAINEL */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-zinc-50">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-zinc-700 uppercase tracking-tight">
              Meus Jogos
            </h2>
            <span className="bg-[rgb(var(--btn))] text-white text-[10px] px-2 py-0.5 rounded-full font-black">
              {totalGamesCount}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 cursor-pointer hover:bg-zinc-200 rounded-full transition-colors text-zinc-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* LISTA DE JOGOS (Scrollable) */}
        <div
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-zinc-50/50
        
        "
        >
          {tickets.map((ticket, tIdx) => (
            <div
              key={tIdx}
              className={`flex flex-col gap-2 mb-6 p-3  
              rounded-2xl border border-zinc-300/60 shadow`}
            >
              {/* Cabeçalho do Bilhete por Concurso */}
              <div className="flex justify-between items-start px-1 mb-1">
                <span className="text-[1rem] text-black font-black  uppercase tracking-widest leading-tight">
                  <span>
                    {ticket.pool_name}
                  </span>
                  <br />
                  <span className="text-[0.8rem] text-zinc-500">
                    Concurso: #{ticket.contest_number}
                  </span>
                </span>
                <button
                  onClick={() =>
                    handleDeleteTicket(ticket.pool_id, ticket.contest_id)
                  }
                  className="text-red-500 p-1 hover:bg-red-50 rounded cursor-pointer transition-colors"
                >
                  <MdDeleteForever size={25} title="Excluir Bilhete Inteiro" />
                </button>
              </div>

              {/* Lista de Jogos dentro deste bilhete */}
              <div className="flex flex-col gap-3">
                {ticket.bets.map((bet, betIdx) => {
                  const isEditing =
                    editingPath?.pool_id === ticket.pool_id &&
                    editingPath?.contest_id === ticket.contest_id &&
                    editingPath?.betIndex === betIdx;

                  return (
                    <div
                      key={`${ticket.contest_id}-${betIdx}`}
                      className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col gap-4"
                    >
                      <div className="flex justify-between items-start border-b border-zinc-100 pb-2">
                        <div className="flex flex-col">
                          <span className="text-xs pb-1 font-black text-zinc-500 tracking-widest uppercase">
                            JOGO {betIdx + 1}
                          </span>
                          <span className="text-[1rem] font-bold text-black">
                            {ticket.bet_price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() =>
                                  handleSave(
                                    ticket.pool_id,
                                    ticket.contest_id,
                                    betIdx,
                                  )
                                }
                                className="text-green-600 hover:scale-110 transition-all cursor-pointer"
                              >
                                <FaCheck size={20} />
                              </button>
                              <button
                                onClick={handleCancel}
                                className="text-zinc-400 hover:text-zinc-600 cursor-pointer"
                              >
                                <FaWindowClose size={20} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleEdit(
                                    ticket.pool_id,
                                    ticket.contest_id,
                                    betIdx,
                                    bet.numbers,
                                  )
                                }
                                className="text-blue-500 hover:scale-110 transition-all cursor-pointer"
                              >
                                <FaEdit size={20} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteGame(
                                    ticket.pool_id,
                                    ticket.contest_id,
                                    betIdx,
                                  )
                                }
                                className="text-red-400 hover:scale-110 transition-all cursor-pointer"
                              >
                                <MdDeleteForever size={23} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* GRID DE BOLAS (5 por linha) */}
                      <div className="grid grid-cols-5 gap-2 place-items-center py-1">
                        {isEditing
                          ? tempBet.map((val, i) => (
                              <input
                                key={i}
                                type="text"
                                value={val}
                                onChange={(e) =>
                                  handleInputChange(e.target.value, i)
                                }
                                className="w-8 h-8 text-center border-2 border-blue-100 rounded-lg font-bold text-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-inner text-[0.8rem]"
                              />
                            ))
                          : bet.numbers.map((num, i) => (
                              <Ball
                                key={i}
                                number={num}
                                className="bg-gradient-to-l from-[rgb(var(--blue-400))] to-[rgb(var(--background))] w-[28px] h-[28px] text-[0.8rem] font-bold text-white shadow-md"
                              />
                            ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RODAPÉ DO BILHETE (Subtotal do Concurso) */}
              <div className="mt-1 mb-1 px-2 py-2  rounded-lg flex justify-between items-center  ">
                <span className="text-[0.9rem] font-bold text-zinc-500 uppercase">
                  Subtotal Bilhete
                </span>
                <span className="text-[1rem] font-black text-zinc-800">
                  {ticket.total_value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RODAPÉ DO PAINEL (Ações globais) */}
        <div className="p-5 border-t border-zinc-100 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-zinc-500 font-bold text-sm uppercase">
              Total
            </span>
            <span className="text-[rgb(var(--btn))] font-black text-xl">
              {grandTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isPending}
            className="w-full bg-[rgb(var(--btn))] text-white font-bold py-4 rounded-xl shadow-lg hover:brightness-110 
            transition-all flex items-center justify-center gap-2 cursor-pointer uppercase text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              "Enviando..."
            ) : (
              `Finalizar ${totalGamesCount} ${totalGamesCount === 1 ? "Aposta" : "Apostas"}`
            )}
          </button>
        </div>
      </div>
    </>
  );
}
