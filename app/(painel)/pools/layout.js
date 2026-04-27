"use client";

// styles personalizados
import { Box, BoxLayout } from "@/app/(painel)/pools/styles";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

// components
import PageLoading from "@/components/PageLoading";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import Select from "@/modules/pools/components/Select";
import PoolCard from "@/modules/pools/components/PoolCard";
import Submenu from "@/modules/pools/components/Submenu";
import Cart from "@/modules/pools/components/Cart";

// icons
import { FaTrophy } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";

// hooks / stores
import { useToggleStore } from "@/stores/toggleStore";
import { useBetsStore } from "@/modules/pools/stores/useBetsStore";

// hooks
import { useCountTime } from "@/modules/pools/utils/countTime";
import { useFormatDateTime } from "@/hooks/useFormatDate";
import { usePools } from "@/modules/pools/hooks/usePools";
import { usePoolsStore } from "@/modules/pools/stores/usePoolsStore";
import { useContests } from "@/modules/pools/hooks/useContests";

export default function LayoutPools({ children }) {
  const { toggle } = useToggleStore();
  const {setActiveContest, setActivePool } = useBetsStore();
  // console.log(bets);

  usePools(); // Dispara a busca inicial se necessário
  const { pools, isLoading: isLoadingPools } = usePoolsStore();
  const [initialLoading, setInitialLoading] = useState(true);

  // console.log(pools[0]);

  const [pool, setPool] = useState(null);

  // 🔹 Hook que busca concursos automaticamente quando o 'pool' muda
  const { contests, isLoading: isLoadingContests, searchContestByNumber } = useContests(pool?.id);
  // console.log(contests);
  const [itemContest, setItemContest] = useState(null);

  //  date format
  const { formatDate } = useFormatDateTime();
  const { date, time } = formatDate(itemContest?.starts_at);

  // contest time
  const countTime = useCountTime(itemContest?.starts_at, itemContest?.status);

  // 🔹 Quando muda o bolão
  const handleChangePool = (item) => {
    setPool(item);
    toast.success(`Você selecionou o  ${item.name}`, { duration: 4000 });
  };

  // 🔹 Quando muda o concurso
  const handleChangeContest = (item) => {
    setItemContest(item);
    toast.success(`Você mudou para o Concurso: ${item.contest_number}`, {
      duration: 4000,
    });
  };

  // 🔹 Quando busca um concurso específico pelo número
  const handleSearchContest = useCallback(async (number) => {
    const contest = await searchContestByNumber(pool?.id, number);
    
    if (contest) {
      setItemContest(contest);
    }
  }, [pool?.id, searchContestByNumber]);

  // 🔹 Define o concurso inicial assim que a lista de concursos carregar para o pool selecionado
  useEffect(() => {
    if (contests.length > 0) {
      // Define o concurso mais recente como ativo por padrão
      setItemContest(contests[0]);
    } else {
      setItemContest(null);
    }
  }, [contests]);

  // 🔹 Define o primeiro bolão quando a lista carregar do Supabase
  useEffect(() => {
    if (pools.length > 0 && !pool) {
      setPool(pools[0]);
    }
  }, [pools, pool]);

  useEffect(() => {
    if (itemContest) {
      setActiveContest(itemContest);
    }
  }, [itemContest, setActiveContest]);

  useEffect(() => {
    if (pool) {
      setActivePool(pool);
    }
  }, [pool, setActivePool]);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading || isLoadingPools) return <PageLoading />;

  return (
    <section className="flex-1 h-full flex flex-col gap-4 bg-[rgb(var(--blue-50))]">
      <Header>
        <section className="relative bg-white w-full flex flex-wrap gap-4 items-center">
          <div className="flex  flex-col   ml-14 xss:ml-2  ">
            <div className="flex gap-3 items-center">
              <FaTrophy className="text-[1.5rem] text-[rgb(var(--btn))]" />
              <Title
                text="Bolão"
                className="text-zinc-700 font-semibold text-[0.9rem]"
              />
            </div>
            <Paragraph
              text="Faça suas apostas a baixo."
              className="text-zinc-500 text-[0.8rem]"
            />
          </div>

          <Box className="flex-1 flex justify-end items-center gap-8">
            {/* SELECT BOLÕES */}
            <Select
              label={pool?.name || "Selecione um Bolão"}
              value={pool} // sincroniza o valor selecionado com o primeiro bolão da lista
              options={pools}
              onChange={handleChangePool}
              className="px-5 py-3"
            />
          </Box>
        </section>
      </Header>

      <BoxLayout
        $toggle={toggle}
        className="py-4 px-3 sm:p-4 bg-white flex flex-wrap justify-center gap-5 rounded-[10px]"
      >
        {/* CARD */}
        <div className="flex flex-col gap-5">
          {pool && (
            <PoolCard
              name={pool?.name}
              color={pool?.color}
              money={itemContest?.total_prize}
              time={countTime}
              status={itemContest?.status}
            />
          )}
        </div>

        {/* INFO */}
        <section className="flex flex-col sm:px-5">
          <div className="border-b-2 border-zinc-300 pb-4">
            <h3 className="font-bold text-[1.2rem]">Status do bolão</h3>

            <div className="flex flex-wrap gap-5">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold">
                    {itemContest?.status === "open"
                      ? "Aberto"
                      : itemContest?.status === "closed"
                        ? "Fechado"
                        : "Finalizado"}
                  </h4>
                  <FaCircle
                    className={`${
                      itemContest?.status === "open"
                        ? "text-green-500 animate-pulse"
                        : itemContest?.status === "closed"
                          ? "text-orange-400"
                          : "text-red-500"
                    } `}
                  />
                </div>
                <p>
                  {itemContest?.status === "open"
                    ? "Aberto para Realizações de Apostas"
                    : itemContest?.status === "closed"
                      ? "Apostas encerradas"
                      : "Bolão finalizado"}
                </p>
              </div>

              <div>
                <h4 className="font-bold">Prazo</h4>
                <p>{` ${date} até ${time} horas`}</p>
              </div>

              {/* SELECT CONCURSOS */}
              <div>
                <h4 className="font-bold">Concurso</h4>
                <Select
                  label={itemContest?.contest_number}
                  value={itemContest} // ✅ ESSENCIAL
                  options={contests}
                  isLoading={isLoadingContests}
                  showSearch={true}
                  onSearch={handleSearchContest}
                  onChange={handleChangeContest}
                  className="shadow-none"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center pt-5">
            <Submenu itemContest={itemContest} />
          </div>
        </section>
      </BoxLayout>

      <section className=" flex-1  ">{children}</section>
      <Cart />
    </section>
  );
}
