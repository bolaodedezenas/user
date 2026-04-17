
"use client";

// Sub-componente para Ações
const ActionButton = ({ action, row }) => {
  const { icon: Icon, onClick, className } = action;
  return (
    <button
      onClick={() => onClick(row)}
      className={`p-2 rounded-lg transition-colors flex items-center justify-center  ${className}`}
    >
      <Icon size={18} />
    </button>
  );
};


export default function Table({ headers, data, actions = [] }) {
  return (
    <div className="w-full h-[calc(100vh-180px)] bg-white   rounded-xl overflow-hidden">
      {/* SCROLL HORIZONTAL */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[750px]">
          {/* HEADER */}
          <div className="border-b border-zinc-300 px-12 py-4 flex items-center ">
            {headers.map((header) => (
              <div
                key={header.key}
                className={` flex items-center text-[0.9rem] font-semibold uppercase tracking-wider text-zinc-500 ${
                  header.center ? "justify-center" : "justify-start"
                }`}
                style={{ flex: header.flex || 1 }}
              >
                {header.label}
              </div>
            ))}
          </div>

          {/* BODY */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-220px)] p-5">
            {data.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center px-6 py-2 odd:bg-[rgb(var(--blue-50))] even:bg-[rgb(var(--blue-100))]/30"
              >
                {headers.map((header) => (
                  <div
                    key={header.key}
                    className={`flex items-center text-sm text-zinc-600 ${
                      header.center ? "justify-center" : "justify-start"
                    }`}
                    style={{ flex: header.flex || 1 }}
                  >
                    {header.key === "acoes" ? (
                      <div className="flex items-center justify-center w-full gap-1">
                        {actions.map((act, i) => (
                          <ActionButton key={i} action={act} row={row} />
                        ))}
                      </div>
                    ) : header.render ? (
                      header.render(row[header.key], row)
                    ) : (
                      row[header.key] || "-"
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
