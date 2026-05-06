
import { HiTicket } from "react-icons/hi2";

export function BolaoCard({ title, concurso, cotas, valor, color }) {
  console.log(color);

  return (
    <div
      className="  p-2 px-3  
      flex justify-between items-center border-b border-zinc-300"
    >
      <div className="flex gap-3 items-center">
        <div
          style={{
            backgroundColor: `${color}30`, // adiciona alpha (hex)
            color: color,
          }}
          className={` p-2 rounded-lg`}
        >
          <HiTicket size={25} />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{title}</h3>
          <p className="text-xs text-zinc-500">Concurso: {concurso}</p>
        </div>
      </div>

      <div className="text-right">
        <span className="text-xs bg-[rgb(var(--blue-50))] text-[rgb(var(--blue-700)) px-2 py-1 rounded-[5px]">
          {cotas} cotas
        </span>
        <p className="font-semibold mt-1">
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </div>
  );
}
