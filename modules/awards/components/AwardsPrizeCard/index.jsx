// components
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";

// icons
import { IoTime } from "react-icons/io5";

export default function AwardsPrizeCard({
  points = "08",
  title = "Pontos",
  subtitle = "Ganha ao completar 08 pontos",
  prize = "R$ 10.000,00",
  winners = "66 Ganhadores",
  amount = "R$ 75,76",
  waitingText = "Aguardando o 1º sorteio...",
}) {
  return (
    <div className=" h-fit w-100  min-w-[280px] overflow-hidden  rounded-2xl bg-white border border-zinc-300 shadow-md">
      {/* Top */}
      <div className="flex items-center gap-5 px-6 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#35549B] text-[1rem] font-bold text-white">
          {points}
        </div>

        <div className="leading-tight">
          <Title text={title} className="text-[1rem] font-bold text-zinc-700" />
          <Paragraph
            text={subtitle}
            className="text-[0.9rem] font-medium text-zinc-600"
          />
        </div>
      </div>

      <div className="h-px bg-zinc-300" />

      <div className="py-1 text-center">
        <h3 className="text-[1.4rem] font-bold text-black">{prize}</h3>
      </div>

      <div className="flex items-center justify-between   px-4 pb-3">
        <div className="rounded-md bg-[rgb(var(--blue-50))] px-2 xs:px-4 py-2 text-center text-[0.8rem] font-medium text-zinc-800">
          {winners}
        </div>

        <div className="rounded-md bg-[rgb(var(--blue-50))] px-2 xs:px-4 py-2 text-center text-[0.8rem] font-bold text-zinc-800">
          {amount}
          <span className="ml-2 font-semibold text-zinc-400">p/ cada</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#35549B] px-6 py-3 text-white">
        <span className="text-[1rem] font-medium">{waitingText}</span>
        <IoTime className="text-[1.8rem] animate-spin" />
      </div>
    </div>
  );
}

