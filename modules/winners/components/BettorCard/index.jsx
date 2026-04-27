"use client";

import Image from "next/image";
import { FaWhatsapp, FaShareAlt } from "react-icons/fa";
import Balls from "@/components/Balls";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";

// icons
import { BsPersonCircle } from "react-icons/bs";


export default  function BettorCard({
  name,
  avatar,
  ticketNumber,
  totalGames,
  prizes = [],
  onWhatsappClick,
  onShareClick,
}) {
  return (
    <div className="  w-[350px] overflow-hidden rounded-2xl shadow-lg border border-zinc-200 bg-white  ">
      {/* Header */}
      <div className="flex gap-5  p-4 pb-4 ">
        {/* Avatar */}
        <div className=" relative flex justify-center items-center  w-14 h-14 shrink-0 overflow-hidden rounded-full">
         {true  ? <BsPersonCircle className="w-full h-full text-zinc-400" /> :
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="240px" 
          />}
        </div>

        {/* Dados */}
        <div className="flex flex-1 flex-col justify-center">
          <Title text="Apoiador (a)" className="text-zinc-700 font-semibold text-[1rem]" />
          <Paragraph text={name} className="text-[0.9rem] font-semibold pb-1" />
          <div className=" flex justify-between items-center  gap-6">
            <div className="flex flex-col justify-center   ">
              <Title text="Nº Bilhete" className="text-zinc-700 font-semibold text-[1rem]" />
              <Paragraph text={ticketNumber} className="block text-[0.9rem] font-semibold  "/>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <Title text="Jogos" className="text-zinc-700 font-semibold text-[1rem]" />
              <Paragraph text={totalGames} className="block text-[0.9rem] font-semibold  ]"/>
            </div>
          </div>
        </div>
      </div>

      {/* Linha */}
      <div className="border-t border-zinc-200 " />

      {/* Títulos */}
      <div className="flex justify-between px-7 py-1">
        <Title text="Prêmios | Pontos" className={"text-zinc-700 font-semibold text-[1rem]  "} />
        <Title text="Ações" className={"text-zinc-700 font-semibold text-[1rem]  "} />
      </div>

      {/* Rodapé */}
      <div className=" flex  items-center bg-[rgb(var(--btn))] justify-between text-white text-[24px] px-6 py-2">
        {/* Regras ganhas */}
        <div className="flex-1 flex gap-3 justify-start items-center">
          {prizes.map((item, index) => (
            <Balls
              key={index}
              number={item}
              className="  bg-white text-[rgb(var(--btn))] 
              w-[30px] h-[30px]  text-[0.9rem]  "
            />
          ))}
        </div>

        {/* Ações */}
        <div className="flex gap-4">
          <FaWhatsapp size={20} />
          <FaShareAlt size={20} />
        </div>
      </div>


    </div>
  );
}
