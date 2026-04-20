"use client";

import { useEffect, useState } from "react";
import PageLoading from "@/components/PageLoading";
import SalesLineChart from "@/modules/dashboard/components/SalesLineChart";
import BetCardDashboard from "@/modules/dashboard/components/BetCardDashboard";
import RankingList from "@/modules/dashboard/components/RankingList";
import MonthSummary from "@/modules/dashboard/components/MonthSummary";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import { FaTrophy } from "react-icons/fa";


 
const data = [
  { name: "Jan", value: 15 },
  { name: "Fev", value: 20 },
  { name: "Mar", value: 25 },
  { name: "Abr", value: 35 },
  { name: "Mai", value: 27 },
  { name: "Jun", value: 30 },
  { name: "Jul", value: 46 },
  { name: "Ago", value: 38 },
  { name: "Set", value: 33 },
  { name: "Out", value: 37 },
  { name: "Nov", value: 37 },
  { name: "Dez", value: 34 },
];

const bets = [
  {
    title: "Bolão de Segunda",
    prize: "R$ 100.000,00",
    status: "Aberto",
    sales: 10,
    color: "#3b82f6",
  },
  {
    title: "Bolão de quarta",
    prize: "R$ 100.000,00",
    status: "Fechado",
    sales: 200,
    color: "#111827",
  },
  {
    title: "Bolão de sexta",
    prize: "R$ 100.000,00",
    status: "Aberto",
    sales: 50,
    color: "#10b981",
  },
  {
    title: "Bolão de sexta",
    prize: "R$ 100.000,00",
    status: "Aberto",
    sales: 100,
    color: "#9ca3af",
  },
];

const ranking = [
  {
    name: "Felipe Santos silva",
    value: 200,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Felipe Santos silva",
    value: 180,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Felipe Santos silva",
    value: 150,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Felipe Santos silva",
    value: 120,
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Felipe Santos silva",
    value: 100,
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Felipe Santos silva",
    value: 150,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Felipe Santos silva",
    value: 120,
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Felipe Santos silva",
    value: 100,
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

const graficPizza = [
  { label: "Total", value: 100, color: "#22c55e" },
  { label: "Hoje", value: 50, color: "#06b6d4" },
  { label: "Confirmadas", value: 80, color: "#3b82f6" },
  { label: "Fiado", value: 10, color: "#f97316" },
  { label: "Não pagas", value: 4, color: "#ef4444" },
  { label: "Em Pix", value: 80, color: "#d4d4d4" },
  { label: "Em Dinheiro", value: 80, color: "#525252" },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="w-full min-h-screen bg-[rgb(var(--blue-50))] pt-8 ">
      <Header>
        <section className="relative bg-white w-full flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-3 ml-14 xss:ml-2">
            <FaTrophy className="text-[2.2rem] text-[rgb(var(--btn))]" />
            <div>
              <Title
                text="Dashboard"
                className="text-zinc-700 font-semibold text-[0.9rem]"
              />
              <Paragraph
                text="Estatísticas de vendas e apostas"
                className="text-zinc-500 text-[0.8rem]"
              />
            </div>
          </div>          
        </section>
      </Header>
      {/* 🔥 CONTAINER PRINCIPAL */}
      <div className="flex mt-14 flex-col lg:flex-row gap-6">
        {/* ================= LEFT ================= */}
        <div className="flex-2 flex flex-col gap-6">
          {/* CHART */}
          <div className="bg-white rounded-md shadow-md  ">
            <SalesLineChart data={data} />
          </div>

          {/* BETS */}
          <div className=" bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold">Vendas por bolão</h2>
              <p className="text-sm opacity-90">Vendas desse mês</p>
            </div>

            {/* SCROLL */}
            <div className="flex flex-col gap-4   overflow-y-auto  ">
              {bets.map((item, index) => (
                <BetCardDashboard
                  key={index}
                  title={item.title}
                  prize={item.prize}
                  status={item.status}
                  sales={item.sales}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex-1   flex flex-col gap-6">
          {/* PIE */}
          <div className="bg-white rounded-md shadow-md  ">
            <MonthSummary data={graficPizza} />
          </div>

          {/* RANKING */}
          <div className=" flex-1 bg-white rounded-md shadow-md">
            <RankingList data={ranking}   />
          </div>
        </div>
      </div>
    </section>
  );
}