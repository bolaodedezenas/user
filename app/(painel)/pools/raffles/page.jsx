"use client";

import { useEffect, useState } from "react";
// components
import PageLoading from "@/components/PageLoading";
import LotteryCard from "@/modules/raffles/components/LotteryCard";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
// stores 
import { useSelectedPoolStore } from "@/modules/pools/stores/useSelectedPoolStore";

export default function Raffles() {
  const selectedPool = useSelectedPoolStore((state) => state.selectedPool);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className=" h-full bg-white flex-1 rounded-2xl shadow-md   ">
      <div className="p-4 px-8 border-b border-zinc-300">
        <Title text="Sorteios" />
        <Paragraph text="5 Sorteios = 40 Dezenas sorteadas" />
      </div>
      <section className="flex justify-center gap-6 flex-wrap p-5 max-h-[560px] overflow-auto scrollbar-thin">
        <LotteryCard
          date="Segunda, 26/nov/25"
          draw="2º Sorteio"
          time="21h RIO"
          results={["60.64", "22.50", "89.39", "77.73", "78.07"]}
          numbers={[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]}
          registeredAt="20:13h"
          contest="21033"
          color={selectedPool.color}
        />
        <LotteryCard
          date="Segunda, 26/nov/25"
          draw="2º Sorteio"
          time="21h RIO"
          results={["60.64", "22.50", "89.39", "77.73", "78.07"]}
          numbers={[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]}
          registeredAt="20:13h"
          contest="21033"
          color={selectedPool.color}
        />
        <LotteryCard
          date="Segunda, 26/nov/25"
          draw="2º Sorteio"
          time="21h RIO"
          results={["60.64", "22.50", "89.39", "77.73", "78.07"]}
          numbers={[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]}
          registeredAt="20:13h"
          contest="21033"
          color={selectedPool.color}
        />
        <LotteryCard
          date="Segunda, 26/nov/25"
          draw="2º Sorteio"
          time="21h RIO"
          results={["60.64", "22.50", "89.39", "77.73", "78.07"]}
          numbers={[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]}
          registeredAt="20:13h"
          contest="21033"
          color={selectedPool.color}
        />
        <LotteryCard
          date="Segunda, 26/nov/25"
          draw="2º Sorteio"
          time="21h RIO"
          results={["60.64", "22.50", "89.39", "77.73", "78.07"]}
          numbers={[10, 10, 10, 10, 10, 10, 10, 10, 10, 10]}
          registeredAt="20:13h"
          contest="21033"
          color={selectedPool.color}
        />
      </section>
    </section>
  );
}
