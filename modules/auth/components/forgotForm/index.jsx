"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/Input";
import SignInButton from "@/components/Btns/SignInButton";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
//icons
import Icon from "@/components/Icon";
import { supabase } from "@/libs/supabase/client";
// toast
import toast from "react-hot-toast";
// zustand store
import { useAuthStore } from "@/modules/auth/stores/auth.store";

export default function RecoveryForm() {
  const { setLoading } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(0);
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Efeito para gerenciar a contagem regressiva de forma segura
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer); // Limpa o timer se o componente desmontar
    }
  }, [time]);

  // Carrega a foto do localStorage após o componente montar para evitar erros de hidratação
  useEffect(() => {
    try {
      const photo = localStorage.getItem("Photo");
      if (photo) {
        setPerfil(JSON.parse(photo));
      }
    } catch (error) {
      console.error("Erro ao ler foto do localStorage:", error);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return toast.error("Por favor, preencha todos os campos!");
   
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/recovery?type=recovery`,
      });

      if (error) throw error;

      setTime(60);
      toast.success("Email enviado com sucesso!");
    } catch (error) {
       if (error?.message?.includes("only request this after")) {
         toast.error("Por favor, aguarde antes de solicitar outro e-mail.");
         return;
       }
       toast.error(error.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center pt-2 pb-5"
      >
        {perfil === null ? (
          <Icon
            className="rounded-full "
            name="account_circle"
            size={50}
            color="rgb(var(--icon))"
          />
        ) : (
          <img
            src={perfil}
            alt="Foto de perfil"
            className="rounded-full mb-1.5 mt-1.5 h-16 w-16"
          />
        )}
        <Title text="Recuperar Senha" />
        <p className="pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal">
          Entre com seus dados abaixo:
        </p>
        <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-8 ">
          <InputLayout>
            <Label id="email">Email *</Label>
            <InputUi
              id="email"
              type="email"
              placeholder="Email@example.com"
              autocomplete="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputLayout>
        </div>
        <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mb-4">
          Lembrou sua senha?{" "}
          <span
            className="text-[rgb(var(--text-links))] font-bold cursor-pointer hover:underline text-[1rem]"
            onClick={() => router.replace("/login")}
          >
            Entrar
          </span>
        </p>
        <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 relative  ">
          {time > 0 ? (
            <span
              className="flex items-center justify-center w-full h-12 font-semibold text-[rgb(var(--text))] text-[1.4rem] text-center border rounded-md"
            >
              Aguarde {time}s
            </span>
          ) : (
            <SignInButton text="Enviar" />
          )}
        </div>
        <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4">
          Não tem uma conta?{" "}
          <span
            className="text-[rgb(var(--text-links))] cursor-pointer hover:underline "
            onClick={() => router.replace("/register")}
          >
            Cadastre-se agora
          </span>
        </p>
      </form>
    </FormLayout>
  );
}
