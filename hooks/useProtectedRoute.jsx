"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const useProtectedRoute = () => {
  const { user, loading} = useAuth();
  const router = useRouter();

  const pathname = usePathname();
  const currentRoute = "/" + pathname.split("/")[1];

  useEffect(() => {
    if (!user) {
      return router.replace("/login"); // se não estiver logado, redireciona para login
    }
  }, [user, loading, router]);
};


