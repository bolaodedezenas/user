"use client";

import { useEffect, useState } from "react";

// components
import PageLoading from "@/components/PageLoading";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import Select from "@/modules/pools/components/Select";
import SearchInput from "@/components/SearchInput";
import Table from "@/components/Table";
import StatusBadge from "@/modules/bets/components/StatusBadge";
import CardList from "@/modules/bets/components/CardList";
import ViewToggle from "@/components/ViewToggle";

// hooks  
import { usePools } from "@/modules/pools/hooks/usePools";
// stores
import { usePoolsStore } from "@/modules/pools/stores/usePoolsStore";
// icons 
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
// toast
import toast from "react-hot-toast";


export default function Users() {

  // Tabela header 
  const headers = [
    { label: "#", key: "id", flex: 0.4 },
    { label: "Apostador", key: "nome", flex: 1},
    { label: "Telefone", key: "telefone", flex: 1 },
    { label: "Endereço", key: "endereco", flex: 1 },
    { label: "Jogos", key: "jogos", flex: 0.8 },
    { label: "Status", key: "status", flex: 1, render: (value) => <StatusBadge status={value} />},
    { label: "Ações", key: "acoes", flex: 0.4, center: true },
  ];

 

  // Ações para cada linha da tabela
  const actions = [
    {
      icon: FaWhatsapp,
      onClick: (row) => {
        window.open(
          `https://wa.me/55${row.telefone.replace(/\D/g, "")}`,
          "_blank",
        );
      },
      className:
        "text-zinc-600 hover:bg-green-200 hover:text-[rgb(var(--blue-800))] cursor-pointer",
    },
    {
      icon: AiOutlineExport,
      onClick: (row) => {
        console.log("Exportar:", row);
      },
      className:
        "text-zinc-800 hover:bg-[rgb(var(--blue-100))] hover:text-[rgb(var(--blue-800))] cursor-pointer",
    },
  ];

  // Dados da tabela (Exemplo Estático, Substituir pela API)
  const data = [
    {
      id: 1,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
    {
      id: 2,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pendente",
    },
    {
      id: 3,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
    {
      id: 4,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pendente",
    },
    {
      id:5,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
    {
      id: 6,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pendente",
    },
    {
      id: 7,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
    {
      id: 8,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pendente",
    },
    {
      id: 9,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
    {
      id: 10,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pendente",
    },
    {
      id: 11,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
    {
      id: 12,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pendente",
    },
    {
      id: 13,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
    {
      id: 14,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pendente",
    },
    {
      id: 15,
      nome: "Manoel Fernando",
      telefone: "(74)93505-0160",
      endereco: "Trindade-PE",
      jogos: 10,
      status: "Pago",
    },
  ];

  usePools();// Busca os concursos
  const { pools } = usePoolsStore();// Busca os concursos no store
  console.log(pools);
  const [pool, setPool] = useState(null);// pool selecionado

  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(true); // vizualizar  o modo card ou tabela


  const handleChangePool = (item) => {
    setPool(item);
    toast.success(`Você selecionou o  ${item.name}`, { duration: 4000 });
  };
  
  useEffect(() => {
    setTimeout(() => setLoading(false) , 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="fle-1 h-full flex flex-col  bg-[rgb(var(--blue-50))]">
      <section className=" w-full flex flex-wrap items-center justify-between bg-white shadow-md rounded-lg p-4 gap-6">
        <div className="flex flex-wrap items-center gap-3 pl-8   ">
          <FaFileInvoiceDollar className="text-[3rem] text-[rgb(var(--btn))]" />
          <div className="flex flex-col">
            <Title
              text="Apostas"
              className="text-zinc-700 font-semibold text-[0.9rem]"
            />
            <Paragraph
              text="Visualize aqui todas as apostas realizadas nos concursos."
              className="text-zinc-500 text-[0.9rem] max-w-95"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-center">
          <ViewToggle value={view} onChange={() =>  setView(!view)} />

          <SearchInput
            value=""
            onChange={() => {}}
            placeholder="Pesquisar..."
            className="w-38"
          />
          <Select
            label={pool?.name || "Selecione um Bolão"}
            value={pool} // sincroniza o valor selecionado com o primeiro bolão da lista
            options={pools}
            onChange={handleChangePool}
            className="px-5 py-3"
          />
        </div>
      </section>
      <div className=" bg-white shadow-md rounded-lg mt-3    p-4 py-6 h-[calc(100%)]   ">
        { view ? (
          <Table headers={headers} data={data} actions={actions} />
        ) : (
          <CardList headers={headers} data={data} actions={actions} />
        )}
      </div>
    </section>
  );
}
