import React from "react";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";

export function PaymentMethodCard({
  icon,
  className = "bg-gray-100",
  title,
  status,
  statusColor = "green",
  selected,
  onClick,
}) {
  console.log(selected);

  return (
    <div
      onClick={onClick}
      className={`
        w-full p-2 rounded-xl border flex items-center justify-between cursor-pointer transition
        ${selected ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-white"}
      `}
    >
      {/* LEFT */}
      <div className="flex gap-3 items-center ">
        {/* Ícone */}
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-lg ${className}`}
        >
          {icon}
        </div>

        {/* Textos */}
        <div>
          <div>
            <Title text={title} className="text-[1rem] font-semibold" />
          </div>
          {status && (
            <Paragraph
              text={"✔ " + status}
              className={`text-[0.9rem] font-semibold
                ${statusColor === "green" ? "text-green-600!" : "text-orange-500!"}`
              }
            />
          )}
        </div>
      </div>

      {/* RADIO */}
      <div>
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center
          ${selected ? "border-blue-600" : "border-gray-300"}`}
        >
          {selected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
        </div>
      </div>
    </div>
  );
}
