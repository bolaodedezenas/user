"use client";

import { useEffect, useState } from "react";
// components
import PageLoading from "@/components/PageLoading";

export default function Raffles() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="fle-1 h-full flex justify-center items-center flex-col gap-4 text-[3rem]  ">
      Sorteios
    </section>
  );
}
