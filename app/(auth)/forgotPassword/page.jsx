"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import RecoveryForm from "@/components/Forms/AuthForms/forgotForm";


export default function RecoveryPage() {
  const router = useRouter();
  const { user, loading,} = useAuth(); // pega as 

   useEffect(() => {
    if (user) {
      router.replace("/"); // usuário já logado vai para raiz
    }
  }, [user, router]);


   if (loading) return  <Loading />;

  return (
    <div
      className="
      scrollbar-transparent overflow-auto 
      min-h-full 
      flex items-center  justify-center
      bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
      p-4
      "
    >
      <RecoveryForm />
    </div>
  );
}
