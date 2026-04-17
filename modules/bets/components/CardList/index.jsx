"use client";

// 🔥 botão de ação (reaproveitado)
const ActionButton = ({ action, row }) => {
  const { icon: Icon, onClick, className } = action;

  return (
    <button
      onClick={() => onClick(row)}
      className={`p-2 rounded-lg transition-colors flex items-center justify-center ${className}`}
    >
      <Icon size={18} />
    </button>
  );
};

export default function CardList({ headers, data, actions = [] }) {
  return (
    <div className=" bg-white   rounded-lg    flex flex-wrap justify-center gap-4   h-[calc(100vh-170px)] overflow-y-auto ">
      {data.map((row) => (
        <div
          key={row.id}
          className="w-70 bg-[rgb(var(--blue-50))]/60 border border-zinc-200 rounded-2xl shadow-sm p-3 flex flex-col gap-6"
        >
          {/* 🔹 Conteúdo */}
          <div className="flex flex-col gap-2">
            {headers
              .filter((h) => h.key !== "acoes") // remove ações do corpo
              .map((header) => (
                <div
                  key={header.key}
                  className={`flex justify-between items-center text-[0.9rem] bg-[rgb(var(--blue-100))]/30 rounded-[5px] p-2 px-4
                  ${header.key === "id" && " text-[1.2rem] font-extrabold bg-transparent"}
                  `}
                >
                  <span className="text-zinc-950 font-bold">
                    {header.label}
                  </span>

                  <span
                    className={`  text-zinc-500  text-[0.8rem] text-right 
                      ${header.key === "id" && " text-[1.2rem] font-extrabold  "}
                    `}
                  >
                    {header.render
                      ? header.render(row[header.key], row)
                      : row[header.key] || "-"}
                  </span>
                </div>
              ))}
          </div>

          {/* 🔹 Ações */}
          {actions.length > 0 && (
            <div className="   rounded-[5px] flex justify-end items-center gap-2    ">
              {actions.map((act, i) => (
                <ActionButton key={i} action={act} row={row} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
