"use client";

import { FaSackDollar } from "react-icons/fa6";


export default function BetCardDashboard({
  title,
  prize,
  status,
  sales,
  $color = "#3b82f6",
}) {
  return (
    <div
      className="w-full shadow-xl rounded-xl p-4 flex gap-4 flex-wrap items-center justify-between   text-white"
      style={{
        background: `linear-gradient(to right, ${$color}, ${$color}B3)`,
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-lg">
          <FaSackDollar className="text-white text-[2rem]" />
        </div>

        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm opacity-90">Estimativa de prêmio</p>
          <p className="text-sm font-medium">{prize}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="max-xs:w-full  flex justify-between items-center gap-10">
        <div className="text-center">
          <p className="text-sm opacity-90">Status</p>
          <p className="font-semibold">{status}</p>
        </div>

        <div className="text-center">
          <p className="text-sm opacity-90">Vendas</p>
          <p className="text-xl font-bold">{sales}</p>
        </div>
      </div>
    </div>
  );
}
