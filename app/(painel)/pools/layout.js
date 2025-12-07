"use client";
// styles personalizados
import { Box, BoxLayout } from "@/app/(painel)/pools/styles";

import { useEffect, useState } from "react";
// components
import PageLoading from "@/components/PageLoading";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import Select from "@/components/Select";
import PoolCard from "@/components/Cards/PoolCard";
import Submenu from "@/components/Submenu";
//icons
import { FaTrophy } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa";



const options = [
  { label: "Bolão de segunda", value: "1" },
  { label: "Bolão de quarta", value: "2" },
  { label: "Bolão de sexta", value: "3" },
  { label: "Bolão de sabado", value: "4" },
];

export default function LayoutPools({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="fle-1 h-full flex flex-col gap-4   bg-[rgb(var(--blue-50))]">
      <Header>
        <section
          className={`relative 
          bg-white w-full  flex  flex-wrap  gap-4 items-center 
          `}
        >
          <div className=" flex items-center justify-between  flex-wrap gap-3  ml-12 xss:ml-2  ">
            <div className="flex gap-2 items-center ">
              <FaTrophy className="text-[2.2rem] text-[rgb(var(--blue-950))]  " />
              <div>
                <Title
                  text="Bolão"
                  className={"text-zinc-700 font-semibold text-[0.9rem]  "}
                />
                <Paragraph
                  text="Faça suas apostas a baixo."
                  className={"text-zinc-500  text-[0.8rem] "}
                />
              </div>
            </div>
          </div>
          <Box
            className={`flex-1 flex justify-end  items-center gap-8 
            `}
          >
            <Select
              label={options[0].label}
              options={options}
              onChange={() => console.log("change")}
            />
            <HiShoppingCart className=" text-[2.5rem] text-[rgb(var(--blue-950))] cursor-pointer" />
          </Box>
        </section>
      </Header>
      <BoxLayout className="py-4 sm:p-4  bg-white flex flex-wrap justify-center  gap-5 rounded-[10px]">
        <div className="flex justify-center">
          <PoolCard
            title="Bolão de segunda"
            money="R$ 100.000,00"
            time="05h / 50m / 49s"
          />
        </div>
        <section className=" flex flex-col flex-wrap sm:pl-5 sm:pr-5  ">
          <div className=" border-b-2 border-zinc-300 flex justify-center md:justify-start pb-4   ">
            <div>
              <h3 className="font-bold text-[1.2rem] max-xs:pl-4 ">
                Status do bolão
              </h3>
              <div className="flex flex-wrap gap-5   ">
                <div className="max-xs:pl-4  ">
                  <div className="flex items-center gap-5 ">
                    <h4 className="font-bold">Aberto</h4>
                    <FaCircle className="text-green-500" />
                  </div>
                  <p>Aberto para realizações de apostas</p>
                </div>
                <div className="max-xs:pl-4 ">
                  <h4 className="font-bold">Prazo</h4>
                  <p>10/12/2025 até 21:30 horas</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" min-w-[290px]flex-1 flex items-center justify-center  pt-5  ">
            <Submenu />
          </div>
        </section>
      </BoxLayout>
      <section className="h-full">{children}</section>
    </section>
  );
}
