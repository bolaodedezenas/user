"use client";

import PageLoading from "@/components/PageLoading";
import SalesLineChart from "@/modules/dashboard/components/SalesLineChart";
import BetCardDashboard from "@/modules/dashboard/components/BetCardDashboard";
import RankingList from "@/modules/dashboard/components/RankingList";
import MonthSummary from "@/modules/dashboard/components/MonthSummary";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import { FaTrophy } from "react-icons/fa";
import { useDashboardData } from "@/modules/dashboard/hooks/useDashboardData";

export default function Dashboard() {
  const {
    betsStats,
    isLoading,
    pizzaChartData,
    rankingData,
    salesLineData,
    dailySalesData,
  } = useDashboardData();

  if (isLoading) return <PageLoading />;

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
          <div className="bg-white rounded-md shadow-md px-5  ">
            <SalesLineChart
              yearlyData={salesLineData}
              monthlyData={dailySalesData}
            />
          </div>

          {/* BETS */}
          <div className="flex-1 bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold">Vendas por bolão</h2>
              <p className="text-sm opacity-90">Vendas desse mês</p>
            </div>

            {/* SCROLL */}
            <div className="  flex flex-col gap-4   overflow-y-auto  ">
              {betsStats.map((item, index) => (
                <BetCardDashboard
                  key={index}
                  title={item.title}
                  prize={item.prize}
                  status={item.status}
                  sales={item.sales}
                  $color={item.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex-1   flex flex-col gap-6">
          {/* PIE */}
          <div className="bg-white rounded-md shadow-md  ">
            <MonthSummary data={pizzaChartData} />
          </div>

          {/* RANKING */}
          <div className=" flex-1 bg-white rounded-md shadow-md">
            <RankingList data={rankingData} />
          </div>
        </div>
      </div>
    </section>
  );
}
