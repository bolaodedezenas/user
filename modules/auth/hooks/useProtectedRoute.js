
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/auth.store";

export const useProtectedRoute = (type = "private") => {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (loading) return; //  ainda carregando

    // rota privada protegida, redireciona para login se não tiver usuário
    if (type === "private" && !user) router.replace("/login");

    // rota pública protegida, redireciona para dashboard se tiver usuário
    if (type === "public" &&  user) router.replace("/dashboard");
  }, [user, loading, router, type]);
};
