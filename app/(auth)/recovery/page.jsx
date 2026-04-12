"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/libs/supabase/client";
// icon
import Icon from "@/components/Icon";

import { useAuthStore } from "@/modules/auth/stores/auth.store";
// components
import Loading from "@/components/Loading";
import ResetPasswordForm from "@/modules/auth/components/ResetPasswordForm";

export default function Recovery() {
  const { loading, setLoading } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleRecovery = async () => {
      setLoading(true);

      // No Supabase, os params comuns são token_hash e type
      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type"); // 'signup', 'recovery', 'email_change'

      // Se for apenas uma recuperação de senha (o Supabase lida com o token via hash automaticamente)
      if (type === "recovery") {
        setMode("resetPassword");
        setLoading(false);
        return;
      }

      // Se for verificação de email (signup ou change)
      if (tokenHash && (type === "signup" || type === "email_change")) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: type,
        });

        if (!error) {
          setMessage({
            title: "Email verificado com sucesso!",
            text: "Agora você pode acessar sua conta.",
          });
          setTimeout(() => router.replace("/login"), 5000);
        } else {
          setMessage({
            title: "Erro ao verificar email!",
            text: "Link expirado ou inválido. Solicite um novo link.",
          });
        }
      }

      setLoading(false);
    };

    handleRecovery();
  }, [searchParams, router, setLoading]);

  if (loading) return <Loading />;

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
      {mode === "resetPassword" ? (
        <ResetPasswordForm />
      ) : (
        <div className=" p-5 w-full max-w-[650px] text-center  ">
          {message.title === "Erro ao verificar email!" ? (
            <Icon name="Warning" size={100} color="red" />
          ) : (
            <Icon name="Verified_User" size={100} color="white" />
          )}
          <h3 className="text-[rgb(var(--white))] text-[2.8rem] ">
            {message.title}
          </h3>
          <p className="text-[rgb(var(--white))] text-[1.3rem] ">
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
}
