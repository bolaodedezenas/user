
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/Input";
import SignInButton from "@/components/Btns/SignInButton";
import GoogleButton from "@/components/Btns/GoogleButton";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
// icons
import Icon from "@/components/Icon";
import { FiEye, FiEyeOff } from "react-icons/fi";
// toast
import toast from "react-hot-toast";
// zustand
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function SignInForm() {
  const { login, loginWithGoogle } = useAuth();

  const router = useRouter();

  const [perfil, setPerfil] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);

  // pegar foto do localStorage (client-safe)
  useState(() => {
    const photo = localStorage.getItem("Photo");
    if (photo) setPerfil(JSON.parse(photo));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Por favor, preencha todos os campos!", {
        duration: 5000,
      });
    }

    try {
      await login(email, password);

      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error) {
      
      console.log(error);
      if (error.message?.includes("Invalid login credentials")) {
        return toast.error("Email ou senha incorretos.");
      }

      if (error.message?.includes("Email not confirmed")) {
        return toast.error("Verifique seu e-mail antes de fazer login.", {
          duration: 6000,
        });
      }

      toast.error("Erro ao fazer login.");
    }
  };

  // Google login
  const onGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Supabase redireciona automaticamente
    } catch {
      toast.error("Erro ao entrar com Google.");
    }
  };

  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center pt-2 pb-5"
      >
        {perfil === null ? (
          <Icon
            className="rounded-full"
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

        <Title text="Acesso ao Painel" />

        <p className="pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal">
          Entre na sua conta com seus dados abaixo:
        </p>

        <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5 pr-5 mt-8">
          <InputLayout>
            <Label id="email">Email</Label>
            <InputUi
              id="email"
              type="email"
              name="email"
              placeholder="Email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </InputLayout>

          <InputLayout>
            <Label id="password">Senha</Label>
            <InputUi
              id="password"
              type={visiblePassword ? "password" : "text"}
              name="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            { visiblePassword ? (
              <FiEyeOff
                onClick={(e) => {
                  e.stopPropagation();
                  setVisiblePassword(false);
                }}
                className="text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer absolute right-4"
              />
            ) : (
              <FiEye
                onClick={(e) => {
                  e.stopPropagation();
                  setVisiblePassword(true);
                }}
                className="text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer absolute right-4"
              />
            )}
          </InputLayout>

          <p
            onClick={() => router.push("/forgotPassword")}
            className="text-[rgb(var(--text))] text-[0.9rem] w-full text-center cursor-pointer hover:underline mb-3.5 mt-3 italic font-medium"
          >
            Esqueceu a senha?
          </p>

          <SignInButton text={"Entrar"} />

          <p className="text-[rgb(var(--text))] text-[0.9rem] font-medium text-center mt-1.5 mb-1.5">
            OU CONTINUAR COM
          </p>

          <GoogleButton onClick={onGoogleLogin} />
        </div>

        <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4">
          Não tem uma conta?{" "}
          <span
            className="text-[rgb(var(--text-links))] cursor-pointer hover:underline"
            onClick={() => router.replace("/register")}
          >
            Cadastre-se agora
          </span>
        </p>
      </form>
    </FormLayout>
  );
}
