"use client";

import { use, useEffect } from "react";
import { useAuthStore } from "@/modules/auth/stores/auth.store"; // pega as funções do contexto
import { useRouter } from "next/navigation";
// components
import Loading from "@/components/Loading";
import SignUpForm from "@/modules/auth/components/SignUpForm";

export default function LoginPage() {
  const router = useRouter();
  const user =  useAuthStore((state) => state.user); // pega o usuário do contexto
  const loading = useAuthStore((state) => state.loading); // pega o loading do contexto 
  const setLoading = useAuthStore((state) => state.setLoading); // pega a função de setar o loading 
  
  useEffect(() => {
    if (user) {
      router.replace("/"); // usuário já logado vai para raiz
    }
  }, [user, router]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 3000);
  // }, [router, setLoading]);

  // if (loading) return  <Loading />;

  return (
    <div
      className="
      scrollbar-transparent overflow-auto 
      min-h-full 
      flex  items-center justify-center 
      bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
      p-4
      "
    >
      <SignUpForm />
    </div>
  );
}
