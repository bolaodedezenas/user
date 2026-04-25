"use client";

import { useEffect, useState } from "react";
// components
import PageLoading from "@/components/PageLoading";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import AwardsPrizeCard from "@/modules/awards/components/AwardsPrizeCard";

export default function Awards() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="flex flex-col justify-center bg-white flex-1 rounded-2xl shadow-md   ">
      <div className="p-2 px-8 border-b border-zinc-300">
        <Title
          text="Prêmios"
          className="text-[1.2rem] font-semibold text-zinc-700  "
        />
        <Paragraph
          text="Visualize todas as prêmiações a baixo."
          className="text-[0.9rem] text-zinc-500 "
        />
      </div>

      <section
        className=" flex justify-center    gap-8 flex-wrap py-6 sm:p-6  sm:h-[505px] 
        overflow-auto  "
      >
        <AwardsPrizeCard
          points="10"
          title="Pontos"
          subtitle="Ganha ao completar 10 pontos."
          prize="R$ 60.000,00"
          winners="6 Ganhadores"
          amount="R$  10.000,00"
          waitingText="Aguardando o 1º sorteio..."
        />

        <AwardsPrizeCard
          points="09"
          title="Pontos"
          subtitle="Ganha ao completar 09 pontos."
          prize="R$ 10.000,00"
          winners="2 Ganhadores"
          amount="R$  5.000,00"
          waitingText="Aguardando o 1º sorteio..."
        />
        <AwardsPrizeCard
          points="08"
          title="Pontos"
          subtitle="Ganha ao completar 08 pontos."
          prize="R$ 5.000,00"
          winners="1 Ganhadores"
          amount="R$  5.000,00"
          waitingText="Aguardando o 1º sorteio..."
        />

        <AwardsPrizeCard
          points="06"
          title="Pontos"
          subtitle="Ganha ao completar 06 pontos na 1ª sorteio"
          prize="R$ 3.000,00"
          winners="1 Ganhadores"
          amount="R$  3.000,00"
          waitingText="Aguardando o 1º sorteio..."
        />
        <AwardsPrizeCard
          points="05"
          title="Pontos"
          subtitle="Ganha ao completar 05 pontos na 1ª sorteio"
          prize="R$ 1.000,00"
          winners=" 1 Ganhadores"
          amount="R$  1.000,00"
          waitingText="Aguardando o 1º sorteio..."
        />
        <AwardsPrizeCard
          points="0"
          title="Pontos"
          subtitle="Ganha se não pontar  até ultimo sorteio"
          prize="R$ 2.000,00"
          winners=" 1 Ganhadores"
          amount="R$  2.000,00"
          waitingText="Aguardando o ultimo sorteio..."
        />
      </section>
    </section>
  );
}
