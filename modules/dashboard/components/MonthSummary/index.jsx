"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function MonthSummary({ title = "Mês Atual", data = [] }) {
  return (
    <div className="w-full bg-white rounded-md   p-5">
      {/* HEADER */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800  ">{title}</h2>
        <p className="text-sm text-gray-500">Total de vendas</p>
      </div>

      <div className="flex flex-wrap-reverse items-center justify-center gap-6">
        {/* 🔹 LEGEND */}
        <div className="flex flex-col gap-2 flex-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex gap-10 items-center justify-between"
            >
              <div className="flex items-center gap-2">
                {/* cor */}
                <span
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />

                {/* label */}
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>

              {/* valor */}
              <span className="text-sm font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* 🔵 CHART */}
        <div className="w-[270px] h-[270px]  ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
