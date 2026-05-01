"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import  Loading from "@/components/Loading";
import { useAuthListener } from "@/modules/auth/hooks/useAuthListener";
import { useProtectedRoute } from "@/modules/auth/hooks/useProtectedRoute";

export default function Redirect() {
  useAuthListener();
  useProtectedRoute("private");

  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return <Loading />;
}
