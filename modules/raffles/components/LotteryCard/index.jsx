
import Balls from "@/components/Balls";

export default function LotteryCard({
  date,
  draw,
  time,
  results = [],
  numbers = [],
  registeredAt,
  contest,
}) {
  return (
    <div className="border border-zinc-300  bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="text-center py-2">
        <p className="text-[0.9rem] text-zinc-600">
          Resultado da Loteria Federal
        </p>
        <h2 className="text-[1rem]  font-semibold">{date}</h2>
      </div>

      <div className="border-t border-zinc-300" />

      {/* Draw Info */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 mx-3">
        <span className="text-[1rem] bg-[rgb(var(--btn))] tex-[1rem] text-white px-3 py-1 rounded-md font-semibold">
          {draw}
        </span>
        <span className="text-[1rem] font-semibold text-zinc-700">{time}</span>
      </div>

      {/* Results */}
      <div className="flex flex-col items-center mx-6 bg-[rgb(var(--blue-50))] rounded-2xl  ">
        <div className="w-full  py-2 ">
          {results.map((item, index) => (
            <div
              key={index}
              className="px-8 flex gap-10 items-center justify-evenly text-[1rem] font-semibold text-zinc-800 "
            >
              <span>{index + 1}º</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Balls */}
        <div className="border-t border-zinc-300 w-55 flex flex-wrap justify-center gap-2 py-3 p-1">
          {numbers.map((num) => (
            <Balls
              key={num}
              number={num}
              size="sm"
              className="w-8 h-8 text-[0.8rem] bg-[rgb(var(--btn))] text-white"
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className=" text-[0.9rem] text-center py-2">
        <p className="font-semibold">Cadastrado às {registeredAt}</p>
      </div>

      <div className="bg-[rgb(var(--btn))] text-white text-center py-2 rounded-b-2xl">
        <p className="text-[0.9rem]">Bolão de Segunda</p>
        <p className="text-[0.9rem]">Concurso {contest}</p>
      </div>
    </div>
  );
}

