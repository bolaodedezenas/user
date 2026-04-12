"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import RecoveryForm from "@/modules/auth/components/forgotForm";

export default function RecoveryPage() {
  const router = useRouter();
  const { user, loading, setLoading } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.replace("/"); // usuário já logado vai para raiz
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000); // simula carregamento por 3 segundos
  }, [user, router]);

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
      {loading && <Loading />}
      <RecoveryForm />
    </div>
  );
}
