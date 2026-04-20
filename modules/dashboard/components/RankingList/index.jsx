"use client";

export default function RankingList({
  title = "Ranking do mês",
  subtitle = "Apostadores que mais compraram",
  data = [],
  height = "300px", // 🔥 controla o scroll
}) {
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
      <div className="p-3   overflow-y-auto"  >
        <div className="  h-[400px] flex  flex-col gap-8  ">
          {data.map((item, index) => {
            const width = (item.value / max) * 100;

            return (
              <div key={index} className="flex items-center gap-4">
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
                  <div className="mt-2 w-full h-[3px] bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>

                {/* VALOR */}
                <p className="text-sm text-gray-700 w-10 text-right">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
