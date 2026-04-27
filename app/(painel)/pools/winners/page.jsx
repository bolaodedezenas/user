"use client";

import { useEffect, useState } from "react";
// components
import PageLoading from "@/components/PageLoading";
import BettorCard from "@/modules/winners/components/BettorCard";
import Paragraph from "@/components/paragraph";
import Title from "@/components/Title";
import Select from "@/modules/pools/components/Select";
import SearchInput from "@/components/SearchInput";
import Pagination from "@/components/Pagination";


const bettors = [
  {
    id: 1,
    name: "Manoel Fernando",
    avatar: "/images/user.jpg",
    ticketNumber: "23454323",
    totalGames: 10,
    prizes: [10, 5],
  },
  {
    id: 2,
    name: "Carlos Silva",
    avatar: "/images/user2.jpg",
    ticketNumber: "99881234",
    totalGames: 6,
    prizes: [9, 6],
  },
  {
    id: 3,
    name: "Juliana Souza",
    avatar: "/images/user3.jpg",
    ticketNumber: "77445566",
    totalGames: 15,
    prizes: [10, 9, 8],
  },
  {
    id: 4,
    name: "Manoel Fernando",
    avatar: "/images/user.jpg",
    ticketNumber: "23454323",
    totalGames: 10,
    prizes: [10, 5],
  },
  {
    id: 5,
    name: "Carlos Silva",
    avatar: "/images/user2.jpg",
    ticketNumber: "99881234",
    totalGames: 6,
    prizes: [9, 6],
  },
  {
    id: 6,
    name: "Juliana Souza",
    avatar: "/images/user3.jpg",
    ticketNumber: "77445566",
    totalGames: 15,
    prizes: [10, 9, 8],
  },
];

const statusOptions = [
  { name: "Todos", id: 1 },
  { name: "!0 pontos", id: 2 },
  { name: "09 pontos", id: 3 },
  { name: "08 pontos", id: 4 },
  { name: "06 pontos", id: 5 },
  { name: "05 pontos", id: 6 },
  { name: "0 pontos", id: 7 },
];



export default function Winners() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className=" bg-white fle-1 h-full flex flex-col   rounded-2xl shadow-md ">
      <section className="flex flex-wrap justify-between items-center gap-4  px-6 py-4 border-b border-zinc-300">
        <div>
          <Title
            text="Lista de ganhadores."
            className="text-zinc-700 font-bold"
          />
          <Paragraph
            text="Visualize  a baixo todos os ganhadores."
            className="text-zinc-500 text-[0.8rem]"
          />
        </div>
        <div className="flex flex-wrap items-center gap-4   ">
          <SearchInput className=" w-47  " />
          <Select
            options={statusOptions}
            value={statusOptions[0]}
            onChange={(e) => console.log(e)}
            className=" w-60 py-3 px-4"
          />
        </div>
      </section>
      <div
        className=" w-full flex-1 flex justify-center items-center
        gap-3 flex-wrap p-2 xs:p-4 max-xs:min-h-[580px] max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent 
      "
      >
        {bettors.map((bettor) => (
          <BettorCard
            name={bettor.name}
            key={bettor.id}
            avatar={bettor.avatar}
            ticketNumber={bettor.ticketNumber}
            totalGames={bettor.totalGames}
            prizes={bettor.prizes}
          />
        ))}
      </div>
      {/* <Pagination
        currentPage={20}
        totalItems={3}
        itemsPerPage={""}
        onPageChange={ () => {}}
      /> */}
    </section>
  );
}
