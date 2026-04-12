"use client";

import { useState } from "react";
import { resetPassordSchema } from "@/schemas/authSchemas";
// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/Input";
import SignInButton from "@/components/Btns/SignInButton";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";
// toast
import toast from "react-hot-toast";
// zustand store
import { useAuthStore } from "@/modules/auth/stores/auth.store";
// icons
import Icon from "@/components/Icon";
import { supabase } from "@/libs/supabase/client";

export default function ResetPasswordForm() {
  const router = useRouter();
  const { setLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // inicia loading
    try {
      if (password !== passwordConfirm) {
        toast.error("Ops!, senhas diferentes verifique e tente novamente.");
        return;
      }
      const newPassword = { password };
      const result = await resetPassordSchema.safeParseAsync(newPassword);

      if (!result.success) {
        const errorMessage = result.error.issues[0].message;
        toast.error(errorMessage);
        return;
      }

      // No Supabase, a redefinição é feita atualizando o usuário logado via link de recuperação
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.log(error.message);
        toast.error("Erro! Não foi possível redefinir a senha. Tente novamente. ou solicite um novo link de recuperação.", { duration: 8000 });
        return;
      }

      toast.success("Senha redefinida com sucesso!", { duration: 6000 });
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center pt-5 pb-10"
      >
        <Icon
          className="rounded-full "
          name="Security"
          size={50}
          color="rgb(var(--icon))"
        />
        <Title text="Redefinição de Senha" />
        <p className="pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal">
          Por favor, preencha os campos abaixo!
        </p>
        <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-5">
          <InputLayout>
            <Label id="password">Senha *</Label>
            <InputUi
              id="password"
              type={showPassword ? "password" : "text"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="new-password"
            />
            {showPassword ? (
              <FiEyeOff
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
                className="text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer absolute right-4"
              />
            ) : (
              <FiEye
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
                className="text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer absolute right-4"
              />
            )}
          </InputLayout>
          <InputLayout>
            <Label id="passwordConfirm">Confirmar Senha *</Label>
            <InputUi
              id="passwordConfirm"
              type={showPassword ? "password" : "text"}
              placeholder="Repita a sua senha"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autocomplete="new-password"
            />
          </InputLayout>
          <div className="pt-5">
            <SignInButton text="Redefinir Senha" />
          </div>
          <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4">
            Lembrou sua senha?{" "}
            <span
              className="text-[rgb(var(--text-links))] font-bold cursor-pointer hover:underline text-[1rem]"
              onClick={() => router.replace("/login")}
            >
              Entrar
            </span>
          </p>
        </div>
      </form>
    </FormLayout>
  );
}
