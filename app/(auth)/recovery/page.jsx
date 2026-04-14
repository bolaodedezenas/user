"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabase/client";

// icon
import Icon from "@/components/Icon";

// store
import { useAuthStore } from "@/modules/auth/stores/auth.store";

// components
import Loading from "@/components/Loading";
import ResetPasswordForm from "@/modules/auth/components/ResetPasswordForm";

export default function Recovery() {
  const { loading, setLoading } = useAuthStore();
  const router = useRouter();

  const [mode, setMode] = useState("");
  const [message, setMessage] = useState({
    title: "",
    text: "",
  });
  const [searchParams, setSearchParams] = useState(null);

  // ✅ pega os params da URL (client only - seguro pro build)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  // ✅ lógica de recovery
  useEffect(() => {
    if (!searchParams) return;

    const handleRecovery = async () => {
      setLoading(true);

      const tokenHash = searchParams.get("token_hash");
      const type = searchParams.get("type");

      // 🔐 recuperação de senha
      if (type === "recovery") {
        setMode("resetPassword");
        setLoading(false);
        return;
      }

      // 📧 verificação de email
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

          setTimeout(() => {
            router.replace("/login");
          }, 4000);
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

  // ⏳ loading global
  if (loading || !searchParams) return <Loading />;

  return (
    <div
      className="
        scrollbar-transparent overflow-auto 
        min-h-full 
        flex items-center justify-center
        bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
        p-4
      "
    >
      {mode === "resetPassword" ? (
        <ResetPasswordForm />
      ) : (
        <div className="p-5 w-full max-w-[650px] text-center">
          {message.title === "Erro ao verificar email!" ? (
            <Icon name="Warning" size={100} color="red" />
          ) : (
            <Icon name="Verified_User" size={100} color="white" />
          )}

          <h3 className="text-[rgb(var(--white))] text-[2.5rem] font-bold">
            {message.title}
          </h3>

          <p className="text-[rgb(var(--white))] text-[1.2rem] mt-2">
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
}
