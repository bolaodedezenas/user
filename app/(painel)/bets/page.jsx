"use client";

import { use, useEffect, useState } from "react";

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
import Pagination from "@/components/Pagination";
import { useDebounce } from "@/hooks/useDebounce";
// hooks
import { usePools } from "@/modules/pools/hooks/usePools";
import { useContests } from "@/modules/pools/hooks/useContests";
import { useTickets } from "@/modules/bets/hooks/useTickets";
// stores
import { usePoolsStore } from "@/modules/pools/stores/usePoolsStore";
// icons
import {
  FaFileInvoiceDollar,
  FaWhatsapp,
  FaReceipt,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
// toast
import toast from "react-hot-toast";
import { vi } from "zod/v4/locales";

export default function Bets() {
  // Tabela header
  const headers = [
    { label: "# Bilhete", key: "id", flex: 0.8 },
    { label: "Apostador", key: "nome", flex: 1.5 },
    { label: "Telefone", key: "telefone", flex: 1 },
    { label: "Endereço", key: "endereco", flex: 1 },
    { label: "Jogos", key: "jogos", flex: 0.8 },
    { label: "Valor", key: "valor", flex: 0.8 },
    {
      label: "Status",
      key: "status",
      flex: 1,
      render: (value) => <StatusBadge status={value} />,
    },
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

  usePools();
  const { pools } = usePoolsStore(); // Busca os concursos no store
  const [pool, setPool] = useState(null); // pool selecionado
  const [contest, setContest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600); // 🔹 Debounce de 600ms

  const [activeRemoteSearchTerm, setActiveRemoteSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [remoteEmpty, setRemoteEmpty] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const itemsPerPage = 10;

  // 🔹 Hook que busca concursos automaticamente quando o 'pool' muda
  const { contests, isLoading: isLoadingContests } = useContests(pool?.id);

  // 🔹 Hook que busca os tickets de forma real no banco (paginação e busca)
  const { tickets, totalCount, isLoading: isLoadingTickets} = useTickets(
    contest?.id,
    currentPage,
    itemsPerPage,
    activeRemoteSearchTerm,
  );

  // 🔹 Busca Local: Filtra instantaneamente o que já está na memória (Store)
  const localFilteredTickets = tickets.filter((t) => {
    if (!searchTerm) return true;
    return t.id?.toString().includes(searchTerm);
  });


  // 🔹 Lógica Híbrida: Monitora o termo digitado
  useEffect(() => {
    // 💡 Sempre que houver alteração no que foi digitado em relação à última busca processada,
    // resetamos o estado de erro e removemos o toast anterior imediatamente.
    if (searchTerm !== activeRemoteSearchTerm) {
      setRemoteEmpty(false);
      toast.dismiss("search-not-found");
    }

    if (!searchTerm) {
      setActiveRemoteSearchTerm("");
      setRemoteEmpty(false);
      return;
    }

    // 🔥 se encontrou local → cancela remoto e limpa erro
    if (localFilteredTickets.length > 0) {
      if (activeRemoteSearchTerm !== "") {
        setActiveRemoteSearchTerm("");
      }
      setRemoteEmpty(false);
      return;
    }

    // 🔥 dispara busca remota
    if (
      debouncedSearchTerm &&
      contest?.id &&
      debouncedSearchTerm !== activeRemoteSearchTerm
    ) {
      setRemoteEmpty(false); // ✅ Garante que o estado vazio anterior não dispare o toast
      setActiveRemoteSearchTerm(debouncedSearchTerm);
    }
  }, [
    debouncedSearchTerm,
    searchTerm,
    localFilteredTickets.length,
    activeRemoteSearchTerm,
    contest?.id,
  ]);


  
  useEffect(() => {
    if (!isLoadingTickets && activeRemoteSearchTerm) {
      setRemoteEmpty(totalCount === 0);
    }
  }, [isLoadingTickets, totalCount, activeRemoteSearchTerm]);

  // 🔹 Toast amigável para quando nem o banco encontra nada
  useEffect(() => {
    // 🔥 se o usuário mudou o termo → ignora tudo
    if (searchTerm !== activeRemoteSearchTerm) return;

    // 🔥 se tem resultado local → nunca mostra erro
    if (localFilteredTickets.length > 0) return;

    if (remoteEmpty && activeRemoteSearchTerm && !isLoadingTickets) {
      toast.error(
        `Bilhete "${activeRemoteSearchTerm}" não encontrado. Verifique o bolão e o concurso selecionados.`,
        { duration: 6000, id: "search-not-found", icon: "🔍" },
      );
    }
  }, [
    remoteEmpty,
    activeRemoteSearchTerm,
    searchTerm,
    localFilteredTickets.length,
    isLoadingTickets,
  ]);


  const [view, setView] = useState(true); // vizualizar  o modo card ou tabela
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChangePool = (item) => {
    setPool(item);
    setContest(null); // Reseta o concurso ao mudar o bolão
    setSearchTerm(""); // Limpa busca ao mudar bolão
    setCurrentPage(1); // Reseta para a primeira página
    toast.success(`Você selecionou o  ${item.name}`, { duration: 4000 });
    setActiveRemoteSearchTerm("");
    setRemoteEmpty(false);
  };

  const handleChangeContest = (item) => {
    setContest(item);
    setSearchTerm(""); // Limpa busca ao mudar concurso
    setActiveRemoteSearchTerm("");
    setRemoteEmpty(false);
    setCurrentPage(1); // Reseta para a primeira página
    toast.success(`Você selecionou o  ${item.contest_number}`, {
      duration: 4000,
    });
  };

  // Efeito para controlar a visibilidade dos filtros conforme a largura da tela
  useEffect(() => {
    const handleResize = () => {
      // Se a tela for desktop (>= 768px), forçamos os filtros a ficarem abertos
      if (window.innerWidth >= 768) {
        setIsFilterOpen(true);
      } else {
        // No mobile, iniciamos com eles fechados para economizar espaço
        setIsFilterOpen(false);
      }
    };

    handleResize(); // Executa ao montar o componente para definir o estado inicial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Handler para permitir apenas números no campo de busca desta página
  const handleSearchChange = (value) => {
    const numericValue = value.replace(/\D/g, "");
    setSearchTerm(numericValue);
  };

  // Resetar página ao pesquisar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    // Garante que o concurso selecionado pertença ao bolão atual
    if (contests.length > 0) {
      const isSamePool = contests[0].pool_id === pool?.id;
      if (isSamePool && (!contest || contest.pool_id !== pool?.id)) {
        setContest(contests[0]);
      }
    } else if (!isLoadingContests) {
      setContest(null);
    }
  }, [contests, contest, pool, isLoadingContests]);

  useEffect(() => {
    if (pools.length > 0 && !pool) {
      setPool(pools[0]);
    }
  }, [pools, pool]);


  const [viewLoading, setViewloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setViewloading(false);
    }, 500);
  }, [view]);

  if  (loading) return <PageLoading />;

  return (
    <section className="flex-1 min-h-full flex flex-col bg-[rgb(var(--blue-50))] overflow-hidden">
      <section className="w-full flex flex-wrap  items-center justify-between bg-white shadow-md rounded-lg  px-4 py-2 gap-2 transition-all duration-300">
        <div className=" flex flex-wrap items-center justify-between gap-2    ">
          <div className=" flex flex-col ml-8 xss:ml-0 ">
            <div className="flex gap-2 items-center  ">
              <FaFileInvoiceDollar className="text-[1.5rem] text-[rgb(var(--btn))]" />
              <Title
                text="Apostas"
                className="text-zinc-700 font-semibold text-[0.9rem]"
              />
            </div>
            <Paragraph
              text="Visualize aqui todas as apostas realizadas nos concursos."
              className="text-zinc-500 text-[0.8rem] "
            />
          </div>
        </div>

        <div className="  max-sm:flex-1 max-xs:w-full  flex items-center justify-center gap-2  ">
          <ViewToggle
            value={view}
            onChange={() => {
              setView(!view);
              setViewloading(true);
            }}
          />

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="hidden  max-md:flex  p-3 bg-zinc-100 rounded-lg text-[rgb(var(--btn))] border border-zinc-100 active:scale-95 transition-transform"
            title="Filtros"
          >
            {isFilterOpen ? <FaTimes size={20} /> : <FaFilter size={20} />}
          </button>
        </div>

        {/* Container de Filtros: Toggleable no mobile, flex-row no desktop */}
        <div
          className={`${isFilterOpen ? "flex" : "hidden"} flex-wrap justify-center items-center gap-4   max-md:w-full pb-4`}
        >
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder=" N° do Bilhete "
              className=" w-38"
            />
          </div>

          <Select
            label={pool?.name || "Selecione um Bolão"}
            value={pool}
            options={pools}
            onChange={handleChangePool}
            className="w-57 px-5 py-3"
          />
          <Select
            label={contest ? ` ${contest.contest_number} ` : "..."}
            value={contest}
            options={contests}
            isLoading={isLoadingContests}
            onChange={handleChangeContest}
            className=" w-57 px-5 py-3"
          />
        </div>
      </section>

      <div className="flex-1 flex flex-col bg-white shadow-lx rounded-lg mt-4 overflow-hidden">
        {isLoadingTickets || viewLoading ? (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <PageLoading />
          </div>
        ) : localFilteredTickets.length > 0 ? (
          <>
            {view ? (
              <section
                className=" flex-1 flex flex-col overflow-hidden min-h-0 
              "
              >
                <Table
                  headers={headers}
                  data={localFilteredTickets}
                  actions={actions}
                />
              </section>
            ) : (
              <section className=" flex-1 flex justify-center flex-wrap p-5 gap-5 overflow-y-auto min-h-0  sm:max-h-[780px] max-sm:max-h-[625px]">
                <CardList
                  headers={headers}
                  data={localFilteredTickets}
                  actions={actions}
                />
              </section>
            )}
          </>
        ) : (
          <div className="flex flex-1 flex-col justify-center items-center h-full gap-3 text-zinc-400">
            <FaReceipt className="text-5xl text-zinc-200" />
            <Paragraph
              text="Nenhuma aposta encontrada para este concurso."
              className="text-zinc-500 font-medium text-center"
            />
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
