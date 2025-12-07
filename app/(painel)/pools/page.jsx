"use client";

import { useEffect, useState } from "react";
// components
import PageLoading from "@/components/PageLoading";

export default function Pools() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="fle-1 h-full flex justify-center items-center  text-[2rem]  ">
      Apostar
    </section>
  );
}
