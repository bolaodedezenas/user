"use client";

import { useEffect, useState } from "react";
import PageLoading from "@/components/PageLoading";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="h-full flex  items-center  justify-center p-4 bg-white rounded-[20px] shadow-2xl ">
      {/* <FallingBalls count={8} /> Número de bolas */}
      <h1 className=" text-[2rem] sm:text-[4.3rem] lg:text-[6rem] text-center  text-black font-bold justify-center position:relative z-10 ">
        {" "}
        Bolão de Dezenas
      </h1>
    </section>
  );
}
