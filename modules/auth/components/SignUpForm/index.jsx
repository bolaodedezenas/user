

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// schemas
import { registerSchema } from "@/modules/auth/schemas/authSchemas";

// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/Input";
import SignInButton from "@/components/Btns/SignInButton";
import GoogleButton from "@/components/Btns/GoogleButton";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
// icons
import { FiEyeOff, FiEye } from "react-icons/fi";
// toast
import toast from "react-hot-toast";
// zustand
import { useAuthStore } from "@/modules/auth/stores/auth.store";
// hooks
import { useAuth } from "@/modules/auth/hooks/useAuth";
// utils
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCep } from "@/utils/formatCep";
import { buscarCEP } from "@/utils/buscaCep";

export default function SignUpForm() {
  const { loginWithGoogle, register } = useAuth();
  const setLoading = useAuthStore((state) => state.setLoading);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Verifica se o CEP atual tem 8 dígitos para bloquear a edição de cidade/estado
  const [isCepValid,  setIsCepValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Ops!, senhas diferentes verifique e tente novamente.");
      setFocusInput("password");
      return;
    }

    const formData = {
      name,
      email,
      password,
      phone,
      terms,
      cep,
      state,
      city,
    };

    const zodResult = await registerSchema.safeParseAsync(formData);
    console.log(zodResult);

    if (!zodResult.success) {
      const Error = zodResult.error.issues[0].message;

      setFocusInput(zodResult.error.issues[0].path[0]);

      toast.error(Error);
      return;
    }

    const result = await register(formData);

    if (result.error) {
      if (result.error.message === "User already registered") {
        toast.error("Ops!, esse e-mail ja possui uma conta!", {
          duration: 8000,
        });
        return;
      }

      toast.error(result.error.message, {
        duration: 8000,
      });

      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setPhone("");
    setCep("");
    setState("");
    setCity("");
    setTerms(false);
    setLoading(true);

    toast.success("Conta criada com sucesso!", {
      duration: 8000,
    });
    router.replace("/login");
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const onGoogleLogin = async () => {
    setLoading(true);
    const { user, error } = await loginWithGoogle();
    if (error) {
      toast.error(error.message, { duration: 8000 });
      return;
    }
    if (user) router.replace("/");
  };

  const handlePhoneChange = (event) => {
    setFocusInput("");
    const { value } = event.target;
    setPhone(formatPhoneNumber(value));
  };

  const handleCepChange = async (e) => {
    setFocusInput("");
    const rawValue = e.target.value;
    const formattedCep = formatCep(rawValue);
    setCep(formattedCep);
    const cleanCep = rawValue.replace(/\D/g, "");

    if (cleanCep.length < 8) {
      setCity("");
      setState("");
      return;
    }

    if (cleanCep.length !== 8) return toast.error("CEP inválido.");

    try {
      const response = await buscarCEP(cleanCep);

      if (!response.data.cep || response.data.erro) {
        toast.error("CEP não encontrado.", {duration: 5000} );
        setIsCepValid(false);
        setCity("");
        setState("");
        return;
      }

      setIsCepValid(true);
      setCity(response.data?.localidade || "");
      setState(response.data?.uf || "");
     
      toast.success("Cidade e Estado preenchidos!", { duration: 5000 });
    } catch (error) {
      setCity("");
      setState("");

      toast.error("Erro ao consultar o CEP.", { duration: 5000 });
     
    }
  };


  return (
    <FormLayout>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center"
      >
        <Title text="Criar Conta" />

        <p className="pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal">
          Registre-se e Comece a ganhar hoje!
        </p>

        <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5 pr-5 mt-5">
          <InputLayout>
            <Label id="name">Nome *</Label>

            <InputUi
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autocomplete="name"
              className={focusInput === "name" ? "border-1 border-red-600" : ""}
              required
            />
          </InputLayout>

          <InputLayout>
            <Label id="email">Email *</Label>

            <InputUi
              id="email"
              type="email"
              placeholder="Email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFocusInput("");
              }}
              autocomplete="email"
              required
              className={
                focusInput === "email" ? "border-1 border-red-600" : ""
              }
            />
          </InputLayout>

          <InputLayout>
            <Label id="password">Senha *</Label>

            <InputUi
              id="password"
              type={showPassword ? "password" : "text"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFocusInput("");
              }}
              autocomplete="new-password"
              required
              className={
                focusInput === "password" ? "border-1 border-red-600" : ""
              }
            />

            {showPassword ? (
              <FiEyeOff
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
                className="text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4"
              />
            ) : (
              <FiEye
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
                className="text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4"
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
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                setFocusInput("");
              }}
              autocomplete="new-password"
              required
              className={
                focusInput === "password" ? "border-1 border-red-600" : ""
              }
            />
          </InputLayout>

          <InputLayout>
            <Label id="phone">Telefone</Label>

            <InputUi
              id="phone"
              type="text"
              placeholder="(99) 99999-9999"
              value={phone}
              onChange={handlePhoneChange}
              autocomplete="tel"
              required
              className={
                focusInput === "phone" ? "border-1 border-red-600" : ""
              }
            />
          </InputLayout>

          <InputLayout>
            <Label id="cep">CEP *</Label>

            <InputUi
              id="cep"
              type="text"
              maxLength={12}
              minLength={8}
              placeholder="00.000-000"
              value={cep}
              onChange={handleCepChange}
              autocomplete="postal-code"
              required
              className={focusInput === "cep" ? "border-1 border-red-600" : ""}
            />
          </InputLayout>

          <InputLayout>
            <Label id="uf">Estado</Label>

            <InputUi
              id="uf"
              type="text"
              placeholder="UF"
              value={ state }
              onChange={(e) => {
                setState(e.target.value);
                setFocusInput("");
              }}
              readOnly={isCepValid}
              required
              className={focusInput === "uf" ? "border-1 border-red-600" : ""}
            />
          </InputLayout>

          <InputLayout>
            <Label id="city">Cidade</Label>

            <InputUi
              id="city"
              type="text"
              placeholder="Cidade"
              value={ city }
              onChange={(e) => {
                setCity(e.target.value);
                setFocusInput("");
              }}
              readOnly={isCepValid}
              className={focusInput === "city" ? "border-1 border-red-600" : ""}
            />
          </InputLayout>

          <div
            className={`flex items-center mb-4 cursor-pointer gap-3 ${
              focusInput === "terms" ? "underline text-red-500 font-bold " : ""
            }`}
          >
            <InputUi
              type="checkbox"
              width="20px"
              height="20px"
              checked={terms}
              required
              onChange={(e) => {
                setTerms(e.target.checked);
                setFocusInput("");
              }}
            />

            <p className="max-w-[90%] text-[rgb(var(--text))] text-[0.9rem] font-medium">
              Declaro ter 18+
              <span className="text-[rgb(var(--text-links))] cursor-pointer hover:underline pl-1">
                Termos e Condições
              </span>{" "}
              *
            </p>
          </div>

          <SignInButton text="Criar Conta" />

          <p className="text-[rgb(var(--text))] text-[0.9rem] font-medium text-center mt-1.5 mb-1.5">
            OU CONTINUAR COM
          </p>

          <GoogleButton
            onClick={() => {
              onGoogleLogin();
            }}
          />
        </div>

        <p className="w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4">
          Já tem conta?
          <span
            className="text-[rgb(var(--text-links))] cursor-pointer hover:underline font-bold"
            onClick={() => router.replace("/login")}
          >
            {" "}
            Entrar
          </span>
        </p>
      </form>
    </FormLayout>
  );
}
