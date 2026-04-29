
"use client";

export default function CardList({ schemaCard = [], data = [] }) {
  if (!Array.isArray(schemaCard) || !Array.isArray(data)) return null;

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {data.map((row) => (
        <div
          key={row.id}
          className=" w-68  h-fit bg-[rgb(var(--blue-50))]/60 border border-zinc-200 rounded-2xl shadow-sm p-2 flex flex-col gap-4"
        >
          {/* 🔹 BODY */}
          <div className="flex flex-col gap-2">
            {schemaCard.map((col, index) => {
              const key = col.key || `col-${index}`;

              // =========================
              // 🔥 GROUP (MULTI FIELDS)
              // =========================
              if (col.type === "group") {
                return (
                  <div
                    key={key}
                    className={`flex    text-[0.9rem] bg-[rgb(var(--blue-100))]/30 rounded-[5px] p-2 px-4 ${col.className || ""}`}
                  >
                    <span className="text-zinc-950 font-bold">{col.label}</span>

                    <div className="flex items-center gap-2">
                      {col.fields?.map((f, i) => (
                        <div
                          key={`${key}-field-${i}`}
                          className={f.className || ""}
                        >
                          {f.render
                            ? f.render(row[f.key], row)
                            : (row[f.key] ?? "-")}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              // =========================
              // 🔥 NORMAL FIELD
              // =========================
              if (col.type === "normal") {
                return (
                  <div
                    key={key}
                    className={`flex justify-between items-center text-[0.9rem] bg-[rgb(var(--blue-100))]/30 rounded-[5px] p-2 px-4 ${col.className || ""}`}
                  >
                    <span className="text-zinc-950 font-bold">{col.label}</span>

                    <span className="text-zinc-500 text-[0.8rem] text-right">
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] ?? "-")}
                    </span>
                  </div>
                );
              }

              // =========================
              // 🔥 ACTIONS
              // =========================
              if (col.type === "action") {
                return (
                  <div
                    key={key}
                    className={`flex justify-end gap-2 pt-2 border-t border-zinc-200/50 ${col.className || ""}`}
                  >
                    {col.actions?.map((act, i) => {
                      const Icon = act.icon;

                      return (
                        <button
                          key={`${key}-action-${i}`}
                          onClick={() => act.onClick(row)}
                          className={`p-2 rounded-lg transition-colors flex items-center justify-center ${act.className || ""}`}
                        >
                          <Icon size={18} />
                        </button>
                      );
                    })}
                  </div>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
