"use client";

import React, { useState } from "react";
import {
  XAxis,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";

export default function SalesLineChart({
  yearlyData = [],
  monthlyData = [],
  dataKey = "value",
  xKey = "name",
}) {
  const [view, setView] = useState("year"); // 'year' ou 'month'

  const data = view === "year" ? yearlyData : monthlyData;

  // Função para formatar valores em R$
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="w-full bg-white  rounded-md  py-5 ">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {view === "year" ? "Vendas Mensais" : "Vendas do Mês Atual"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {view === "year"
              ? "Resumo anual das suas vendas"
              : "Detalhamento por dia das vendas"}
          </p>
        </div>

        <div className="flex gap-2 bg-zinc-100 p-1 rounded-lg">
          <button
            onClick={() => setView("year")}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              view === "year"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Ano
          </button>
          <button
            onClick={() => setView("month")}
            className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              view === "month"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Mês
          </button>
        </div>
      </div>

      {/* CHART */}
      <section className="  overflow-x-auto scrollbar-thin">
        <div
          className={`h-[237px] transition-all duration-300 
            ${view === "month" ? "min-w-[900px]" : "min-w-[500px]"}
            `}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              style={{ outline: "none" }}
              data={data}
              onMouseDown={(e) => {
                if (document.activeElement) {
                  document.activeElement.blur();
                }
              }}
            >
              {/* 🔥 GRADIENTE */}
              <defs>
                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#e5e7eb" vertical={false} />

              <XAxis
                dataKey={xKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                interval={0}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                interval={0}
                width={30}
              />

              <Tooltip
                formatter={(value) => [formatCurrency(value), "Vendas"]}
                active={true}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
                }}
                labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
              />

              {/* O componente Area faz o papel da Linha e do Preenchimento */}
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="#3b82f6" // Cor da linha
                strokeWidth={3}
                fill="url(#gradientFill)" // O preenchimento degradê
                dot={{ r: 5, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }} // Pontos da linha
                activeDot={{ r: 7 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
