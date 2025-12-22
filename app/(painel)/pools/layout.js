
"use client";

// styles personalizados
import { Box, BoxLayout } from "@/app/(painel)/pools/styles";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// components
import PageLoading from "@/components/PageLoading";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import Select from "@/components/Select";
import PoolCard from "@/components/Cards/PoolCard";
import Submenu from "@/components/Submenu";

// icons
import { FaTrophy } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";

// hooks / stores
import { useToggleStore } from "@/stores/toggleStore";
import { useBetsStore } from "@/stores/useBetsStore";

// db    
import { pools, contests } from "@/DB/DB_ememory";
// hooks
import { useCountTime } from "@/hooks/useCountTime";
import { useFormatDateTime } from "@/hooks/useFormatDate";


export default function LayoutPools({ children }) {
  const { toggle } = useToggleStore();
  const { bets } = useBetsStore();

  const [loading, setLoading] = useState(true);

  const [pool, setPool] = useState(pools[0]);
  const [itemContest, setItemContest] = useState(null);

// contest time
 const countTime = useCountTime(itemContest?.startAt, itemContest?.status);
 // date format
 const { formatDate} = useFormatDateTime();
 const { date, time } = formatDate(itemContest?.startAt);



  // 🔹 Quando muda o bolão
  const handleChangePool = (item) => {
    setPool(item);
    toast.success(`Você selecionou o  ${item.name}`, { duration: 4000 });
    const firstContest = contests.find((contest) => contest.poolId === item.id);
    setItemContest(firstContest || null);
  };

  // 🔹 Quando muda o concurso
  const handleChangeContest = (item) => {
    setItemContest(item);
    toast.success(`Você mudou para o Concurso ${item.contestNumber}`, { duration: 4000 });
  };

  // 🔹 Garante concurso inicial ao carregar / trocar bolão
  useEffect(() => {
    const firstContest = contests.find((contest) => contest.poolId === pool.id);
    setItemContest(firstContest || null);
  }, [pool]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="flex-1 h-full flex flex-col gap-4 bg-[rgb(var(--blue-50))]">
      <Header>
        <section className="relative bg-white w-full flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 ml-12 xss:ml-2">
            <FaTrophy className="text-[2.2rem] text-[rgb(var(--btn))]" />
            <div>
              <Title
                text="Bolão"
                className="text-zinc-700 font-semibold text-[0.9rem]"
              />
              <Paragraph
                text="Faça suas apostas a baixo."
                className="text-zinc-500 text-[0.8rem]"
              />
            </div>
          </div>

          <Box className="flex-1 flex justify-end items-center gap-8">
            {/* SELECT BOLÕES */}
            <Select
              label={pools[0].name}
              value={pool} // ✅ CONTROLA O SELECT
              options={pools}
              onChange={handleChangePool}
              className="px-5 py-3"
            />

            <div className="relative flex items-center justify-center">
              <HiOutlineGlobeAlt
                className={`text-[3.5rem] text-[rgb(var(--btn))] ${
                  bets.length > 0 ? "animate-spin" : ""
                }`}
              />
              <p className="absolute text-white text-[1.1rem] font-bold bg-[rgb(var(--btn),0.6)] w-13 h-13 rounded-full flex items-center justify-center">
                {bets.length}
              </p>
            </div>
          </Box>
        </section>
      </Header>

      <BoxLayout
        $toggle={toggle}
        className="py-4 px-3 sm:p-4 bg-white flex flex-wrap justify-center gap-5 rounded-[10px]"
      >
        {/* CARD */}
        <div className="flex flex-col gap-5">
          <PoolCard
            title={pool.name}
            color={pool.color}
            money={itemContest?.prizeAmount}
            time={countTime}
            status={itemContest?.status}
          />
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
                      itemContest.status === "open"
                        ? "text-green-500"
                        : itemContest.status === "closed"
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
                  label={itemContest?.contestNumber}
                  value={itemContest} // ✅ ESSENCIAL
                  options={contests.filter(
                    (contest) => contest.poolId === pool.id
                  )}
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

      <section className="h-full">{children}</section>
    </section>
  );
}
