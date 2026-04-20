"use client";

import {
  LineChart,
  Line,
  XAxis,
  AreaChart,
  Area, 
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
 
} from "recharts";

export default function SalesLineChart({
  title = "Vendas mensal",
  subtitle = "Resumo anual das suas vendas",
  data = [],
  dataKey = "value",
  xKey = "name",
}) {
  return (
    <div className="w-full bg-white  rounded-md   p-5  ">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          {title}
        </h2>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>

      {/* CHART */}
      <section className=" p-2 overflow-x-auto ">
        <div className="w-full min-w-[500px] h-[210px]   ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
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
                tick={{ fill: "#6b7280", fontSize: 16 }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 16 }}
                domain={[0, "auto"]}
                width={20}
              />
              <Tooltip />

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
