// "use client";

// import PageLoading from "@/components/PageLoading";
// import SalesLineChart from "@/modules/dashboard/components/SalesLineChart";
// import BetCardDashboard from "@/modules/dashboard/components/BetCardDashboard";
// import RankingList from "@/modules/dashboard/components/RankingList";
// import MonthSummary from "@/modules/dashboard/components/MonthSummary";
// import Header from "@/components/Header";
// import Title from "@/components/Title";
// import Paragraph from "@/components/paragraph";
// import { FaTrophy } from "react-icons/fa";
// import { useDashboardData } from "@/modules/dashboard/hooks/useDashboardData";

// export default function Dashboard() {
//   const {
//     betsStats,
//     isLoading,
//     pizzaChartData,
//     rankingData,
//     salesLineData,
//     dailySalesData,
//   } = useDashboardData();

//   if (isLoading) return <PageLoading />;

//   return (
//     <section className="w-full min-h-screen bg-[rgb(var(--blue-50))]  ">
//       <Header>
//         <section className="relative bg-white w-full flex flex-wrap gap-4 pl-4 items-center">
//           <div className="flex justify-center flex-col gap-1 ml-10 xss:ml-0  ">
//             <div className="flex gap-3 items-center">
//               <FaTrophy className="text-[1.5rem] text-[rgb(var(--btn))]" />
//               <Title
//                 text="Dashboard"
//                 className="text-zinc-700 font-semibold text-[0.9rem]"
//               />
//             </div>
//             <Paragraph
//               text="Estatísticas de vendas e apostas"
//               className="text-zinc-500 text-[0.8rem]"
//             />
//           </div>
//         </section>
//       </Header>
//       {/* 🔥 CONTAINER PRINCIPAL */}
//       <div className="flex mt-14 flex-col lg:flex-row gap-6">
//         {/* ================= LEFT ================= */}
//         <div className="flex-2 flex flex-col gap-6">
//           {/* CHART */}
//           <div className="bg-white rounded-md shadow-md px-5  ">
//             <SalesLineChart
//               yearlyData={salesLineData}
//               monthlyData={dailySalesData}
//             />
//           </div>

//           {/* BETS */}
//           <div className="flex-1 bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
//             <div>
//               <h2 className="text-xl font-semibold">Vendas por bolão</h2>
//               <p className="text-sm opacity-90">Vendas desse mês</p>
//             </div>

//             {/* SCROLL */}
//             <div className="  flex flex-col gap-4   overflow-y-auto  ">
//               {betsStats.map((item, index) => (
//                 <BetCardDashboard
//                   key={index}
//                   title={item.title}
//                   prize={item.prize}
//                   status={item.status}
//                   sales={item.sales}
//                   $color={item.color}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ================= RIGHT ================= */}
//         <div className="flex-1   flex flex-col gap-6">
//           {/* PIE */}
//           <div className="bg-white rounded-md shadow-md  ">
//             <MonthSummary data={pizzaChartData} />
//           </div>

//           {/* RANKING */}
//           <div className=" flex-1 bg-white rounded-md shadow-md">
//             <RankingList data={rankingData} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import PageLoading from "@/components/PageLoading";
import SalesLineChart from "@/modules/dashboard/components/SalesLineChart";
import BetCardDashboard from "@/modules/dashboard/components/BetCardDashboard";
import RankingList from "@/modules/dashboard/components/RankingList";
import MonthSummary from "@/modules/dashboard/components/MonthSummary";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
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
    <section className="flex-1 h-full flex flex-col bg-[rgb(var(--blue-50))] overflow-hidden">
      {/* HEADER FIXA */}
      <section className="shrink-0 sticky top-0 z-30 w-full bg-white shadow-md rounded-lg px-4 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-col ml-10 xss:ml-0">
            <Title
              text="Gestão de Clientes"
              className="text-zinc-700 font-semibold text-[0.9rem]"
            />

            <Paragraph
              text="Visualize aqui todos os clientes cadastrados."
              className="text-zinc-500 text-[0.8rem]"
            />
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pt-4">
        {/* quebra automático ao invés de scroll lateral */}
        <div className="flex flex-wrap gap-6 items-start">
          {/* COLUNA ESQUERDA */}
          <div className="flex-1 min-w-[320px] flex flex-col gap-6">
            <div className="bg-white rounded-md shadow-md px-5 max-w-full">
              <SalesLineChart
                yearlyData={salesLineData}
                monthlyData={dailySalesData}
              />
            </div>

            <div className="bg-white rounded-md shadow-md p-5 flex flex-col gap-4 max-w-full">
              <div>
                <h2 className="text-xl font-semibold">Vendas por bolão</h2>
                <p className="text-sm opacity-90">Vendas desse mês</p>
              </div>

              <div className="flex flex-col gap-4">
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

          {/* COLUNA DIREITA */}
          <div className="flex-1 min-w-[320px] flex flex-col gap-6">
            <div className="bg-white rounded-md shadow-md max-w-full">
              <MonthSummary data={pizzaChartData} />
            </div>

            <div className="bg-white rounded-md shadow-md max-w-full">
              <RankingList data={rankingData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
