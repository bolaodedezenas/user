"use client";

import { useEffect, useState } from "react";
// components
import Header from "@/components/Header";
import PageLoading from "@/components/PageLoading";

export default function Perfil() {

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false) , 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className="fle-1 h-full   bg-[rgb(var(--blue-50))]">
      <Header></Header>
    </section>
  );
}
