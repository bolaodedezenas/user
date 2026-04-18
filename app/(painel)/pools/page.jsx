"use client";

import { useState, useEffect } from "react";
// stores
import { useBetsStore } from "@/modules/pools/stores/useBetsStore";
// components
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import Button from "@/components/Btns/Button";
import Select from "@/modules/pools/components/Select";
import Balls from "@/components/Balls";
import PageLoading from "@/components/PageLoading";
// json
import balls from "@/components/Balls/balls";
// lib
import { generateBets } from "@/modules/pools/utils/generateBets";
// toast
import toast from "react-hot-toast";

const options = [
  { name: "Todas as Dezenas", id: 1 },
  { name: "Mais Sorteadas " , id: 2 },
  { name: "Mais Atrasadas", id: 3 },
];

export default function Pools() {
  const { selectedBalls, setBall, removeBall } = useBetsStore();
  const [gamesCount, setGamesCount] = useState(1);

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const handleIncrementGamesCount = () => {
    if (gamesCount >= 100) {
      toast.error("Ops, você só pode gerar 100 jogos por vez", {
        duration: 3000,
      });
      return;
    }
    setGamesCount((prev) => prev + 1);
  };

  const handleDecrementGamesCount = () => {
    setGamesCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <PageLoading />;
  

  return (
    <section className="fle-1 min-h-full flex justify-center ">
      <div className="py-3 px-3 sm:py-8 sm:px-6 bg-white rounded-[10px] shadow-lg w-full min-h-full">
        <div className="flex flex-wrap border-b-2 border-zinc-300 justify-between pb-3 gap-4">
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
                  onClick={handleDecrementGamesCount}
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
                  onClick={handleIncrementGamesCount}
                  className="w-10 h-10 flex items-center justify-center rounded-[5px] bg-[rgb(var(--blue-50))] shadow-lg cursor-pointer "
                >
                  +
                </div>
              </div>

              <div>
                <Button
                  onClick={() => {
                    generateBets(balls, gamesCount);
                    setGamesCount(1);
                  }}
                  text="Gerar"
                  className="h-10 flex items-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap-reverse justify-between py-3">
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
              value={options[0].label}
              options={options}
              onChange={() => console.log("change")}
              className={` px-5 py-3 `}
            />
          </div>
        </div>

        <div className="flex gap-3 items-center justify-center">
          <h3 className="font-bold text-3xl ">
            {selectedBalls.length === 0
              ? "0"
              : selectedBalls.length < 10
              ? `0${selectedBalls.length}`
              : selectedBalls.length}
          </h3>
          <p className="text-[1.4rem] ">Dezenas</p>
        </div>

        <div className="flex flex-wrap items-center justify-center  gap-0 sm:gap-8  bg-[rgb(var(--blue-50))] rounded-[10px] px-2 py-3 sm:py-4 sm:px-4  max-xss:h-26 min-h-18 ">
          <div
            className="  flex justify-center  gap-1.5 flex-wrap 
             max-xs:w-[230px]  w-full "
          >
            {selectedBalls.length > 0 &&
              selectedBalls.map((ball, index) => (
                <Balls
                  $anima={true}
                  $close="visible"
                  onClick={() => removeBall(ball)}
                  key={index}
                  number={ball}
                  className="  bg-gradient-to-l from-[rgb(var(--blue-400))] to-[rgb(var(--background))] w-[35px] h-[35px] text-[1rem]  "
                />
              ))}
          </div>
        </div>

        <div className="flex justify-center pt-10">
          <div className=" flex  gap-2  flex-wrap  max-sm:justify-center md:max-w-[950px] p-4 max-h-[340px] overflow-auto   scrollbar-transparent ">
            {balls.map((ball, index) => (
              <Balls
                $anima={false}
                onClick={() => setBall(ball)}
                key={index}
                number={ball}
                className={` w-[38px] h-[38px]  hover:bg-gradient-to-l from-[rgb(var(--blue-400))] to-[rgb(var(--background))]
                 ${
                   selectedBalls.includes(ball)
                     ? "bg-gradient-to-l from-[rgb(var(--blue-400))] to-[rgb(var(--background))] "
                     : "bg-zinc-400"
                 }
                text-[1rem]`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
