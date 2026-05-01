"use client";

import { useState, useEffect } from "react";

export default function RankingList({
  title = "Ranking do mês",
  subtitle = "Apostadores que mais compraram",
  data = [],
}) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 MAIOR VALOR
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="  w-full bg-white rounded-md  p-4  ">
      {/* HEADER */}
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="border-t border-gray-300" />

      {/* 🔥 LISTA COM SCROLL */}
      <div className="p-2   overflow-y-auto">
        <div className=" flex-1 h-[285px] flex  flex-col gap-8  ">
          {data.map((item, index) => {
            const width = (item.value / max) * 100;

            return (
              <div key={index} className="flex items-center gap-3 ">
                {/* AVATAR */}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* NOME + BARRA */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>

                  {/* BARRA */}
                  <div className="mt-2 w-full h-[5px] bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: showAnimation ? `${width}%` : "0%",
                      }}
                    />
                  </div>
                </div>

                {/* VALOR */}
                <p className="   text-[0.8rem] text-gray-800  text-right">
                  {item.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
