"use client";

import { useState } from "react";
// stores
import { useBetsStore } from "@/stores/useBetsStore";
// components
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import Button from "@/components/Btns/Button";
import Select from "@/components/Select";
import Balls from "@/components/Balls";
// json
import  balls  from "@/components/Balls/balls";
// lib
import { generateBets } from "@/libs/bets/generateBets";
// toast
import toast from "react-hot-toast";


const options = [
  { label: "Todas as Dezenas", value: "1" },
  { label: "Mais Sorteadas ", value: "2" },
  { label: "Mais Atrasadas", value: "3" },
];

export default function Pools() {
  const { selectedBalls, setBall } = useBetsStore();
  const [gamesCount, setGamesCount] = useState(1); // 👈 AQUI

  const increaseGames = () => {
    setGamesCount((prev) => prev === 100 ? 100 : prev + 1);
    if (gamesCount === 100) return toast.error("Ops, você so pode gerar 100 jogos por vez", { duration: 3000 });
  };

  const decreaseGames = () => {
    setGamesCount((prev) => (prev > 1 ? prev - 1 : 1));
  };


  return (
    <section className="fle-1 min-h-full flex justify-center   text-[2rem] tb-1  ">
      <div className="py-3 px-5 sm:py-8 sm:px-6 bg-white rounded-[10px] shadow-lg w-full min-h-full">
        <div className="flex flex-wrap border-b-2 border-zinc-300 justify-between pb-5 gap-4">
          <div className="">
            <Title
              text="Escolha 10 Dezenas"
              className={"text-zinc-700 font-semibold  "}
            />
            <Paragraph
              text="Selecione como quiser ou gere jogos aleatórios."
              className={"text-zinc-500 "}
            />
          </div>
          <div className="flex flex-col gap-3 ">
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex gap-2 items-center ">
                <div
                  onClick={decreaseGames}
                  className="w-10 h-10 flex items-center justify-center rounded-[5px] bg-[rgb(var(--blue-50))] 
                 shadow-lg  cursor-pointer "
                >
                  -
                </div>
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-[5px]
                  text-[1.5rem] font-bold
                 "
                >
                  {gamesCount}
                </div>
                <div 
                onClick={increaseGames}
                className="w-10 h-10 flex items-center justify-center rounded-[5px] bg-[rgb(var(--blue-50))] shadow-lg cursor-pointer ">
                  +
                </div>
              </div>
              <div>
                <Button
                  onClick={() => {generateBets(balls, gamesCount)
                    setGamesCount(1)
                  }}
                  text="Gerar"
                  className="h-10 flex items-center"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap-reverse justify-between py-5">
          <div>
            <Title
              text="Todas as Dezenas"
              className={"text-zinc-700 font-semibold  "}
            />
            <Paragraph
              text="Marque  suas dezenas a baixo."
              className={"text-zinc-500 "}
            />
          </div>
          <div>
            <Select
              label={options[0].label}
              options={options}
              onChange={() => console.log("change")}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-8  bg-[rgb(var(--blue-50))] rounded-[5px] px-5 py-3 ">
          <div className="flex gap-4 items-center justify-center">
            <h3 className="font-bold">{selectedBalls.length}</h3>
            <p className="text-[1.2rem] ">Dezenas</p>
          </div>
          <div className="flex-1 flex  gap-2 flex-wrap  min-w-[220px]   max-sm:justify-center ">
            {selectedBalls.length > 0 &&
              selectedBalls.map((ball, index) => (
                <Balls
                  key={index}
                  number={ball}
                  className="bg-gradient-to-l from-[rgb(var(--blue-400))] to-[rgb(var(--background))] w-[35px] h-[35px]"
                />
              ))}
          </div>
        </div>
        <div className="flex justify-center ">
          <div className=" flex  gap-2  flex-wrap  py-8   max-sm:justify-center md:w-[70%] ">
            {balls.map((ball, index) => (
              <Balls
                onClick={() => setBall(ball)}
                key={index}
                number={ball}
                className={`  w-[35px] h-[35px] hover:bg-gradient-to-l from-[rgb(var(--blue-400))] to-[rgb(var(--background))] 
                 ${
                   selectedBalls.includes(ball)
                     ? "bg-gradient-to-l from-[rgb(var(--blue-400))] to-[rgb(var(--background))] "
                     : "bg-zinc-400"
                 }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
