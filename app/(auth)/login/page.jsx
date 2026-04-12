"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// components
import Loading from "@/components/Loading";
import SignInForm from "@/modules/auth/components/SignInForm";

import { useProtectedRoute } from "@/modules/auth/hooks/useProtectedRoute";
import { useAuthStore } from "@/modules/auth/stores/auth.store";


export default function LoginPage() {
  useProtectedRoute("public");

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user); // pega as funções do contexto

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, [user, router]);

  if (loading) return <Loading />;

  return (
    <div
      className="
        scrollbar-transparent overflow-auto 
        min-h-full 
        flex  flex-col items-center 
        bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
        p-4
      "
    >
      <SignInForm />
      <p className={`font-light text-[0.9rem] text-[rgb(var(--white))] mt-8`}>
        Tecnologia desenvolvida pela Rixxer
      </p>
    </div>
  );
}
