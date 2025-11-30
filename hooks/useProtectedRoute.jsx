"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const useProtectedRoute = () => {
  const { user, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // se não estiver logado, redireciona para login
    }
    if (user?.status === "bloqueado") return router.replace('/');
    if (user?.status === "ativo") return router.replace('/home');
  }, [user, loading, router]);
};

export default useProtectedRoute;
