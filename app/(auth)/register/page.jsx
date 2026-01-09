"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
// components
import Loading from "@/components/Loading";
import SignUpForm from "@/components/Forms/AuthForms/SignUpForm";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth(); // pega as funções do contexto

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
      flex  items-center justify-center 
      bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
      p-4
      "
    >
      <SignUpForm />
    </div>
  );
}
