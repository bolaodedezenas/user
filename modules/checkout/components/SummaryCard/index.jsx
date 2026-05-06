import Paragraph from "@/components/paragraph";
import Title from "@/components/Title";
// stores
import { useBetsStore } from "@/modules/pools/stores/useBetsStore";


export function SummaryCard() {
  const { tickets } = useBetsStore();
  
  return (
    <div className="bg-[rgb(var(--blue-100))] rounded-xl p-4 px-6">
      <Title text="Resumo da compra" className=" text-[1rem]" />
      <div className="text-[0.9rem]  ">
        <div className="flex justify-between py-1 ">
          <Paragraph text="Total de bolões:" className="font-semibold" />
          <span className=" font-black">{tickets.length}</span>
        </div>
        <div className="flex justify-between py-1 ">
          <Paragraph text="Total de jogos:" className="font-semibold" />
          <span className=" font-black">
            {tickets.reduce((acc, curr) => acc + curr.bets.length, 0)}
          </span>
        </div>
      </div>
      <div className="flex justify-between py-1 ">
        <Paragraph text="Valor total" className="font-semibold" />
        <span className=" font-black">
          {tickets
            .reduce((acc, curr) => acc + curr.total_value, 0)
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </span>
      </div>
    </div>
  );
}
