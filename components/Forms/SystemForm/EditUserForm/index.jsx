"use client";

import { useState, useEffect } from "react";
import { editUserSchema } from "@/schemas/authSchemas";
// components
import Label from "@/components/Label";
import InputUi from "@/components/InputUi";
import SignInButton from "@/components/Btns/SignInButton";
import InputLayout from "@/components/InputLayout";
import Image from "next/image";
import Title from "@/components/Title";
// hooks
import { BiSolidEdit } from "react-icons/bi";

// toast
import toast from "react-hot-toast";
// context
import { useAuth } from "@/context/AuthContext";
//services
import { updateUserData } from "@/libs/firebase/authService";

export default function EditUserForm() {
  const { user, setUser} = useAuth();

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [validCep, setValidCep] = useState(false);

  const [focusInput, setFocusInput] = useState("");



  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      if (user.cep) setValidCep(true);
      setCep(user.cep)
      setState(user.state);
      setCity(user.city);
    }
  }, [user]);


  async function buscarCEP(valor) {
    console.log("buscando cep", valor);
    try {
      const somenteNumeros = valor.replace(/\D/g, "");
      if (somenteNumeros.length !== 8) {
        setFocusInput("cep");
        toast.error("CEP inválido, Ex: 12.345-678.");
        return;
      }
      const res = await fetch(
        `https://viacep.com.br/ws/${somenteNumeros}/json/`
      );
      const data = await res.json();
      if (data.erro) {
        toast.error("CEP não encontrado");
        setFocusInput("cep");
        setValidCep(false);
        setState("");
        setCity("");
        return;
      }
      
      setValidCep(true);
      setState(data.estado);
      setCity(data.localidade);
      toast.success("CEP encontrado com sucesso!");
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      setFocusInput("cep");
      toast.error("Erro ao buscar CEP, verifique e tente novamente.");
    }
  }

  const hendleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validCep) {
      toast.error("CEP inválido, verifique e tente novamente.");
      setFocusInput("cep");
      setCity("");
      setState("");
      setValidCep(false);
      return;
    }

    const formData = {
      name,
      email,
      phone,
      cep,
      state,
      city,
      photoURL: '',
    };

    // Validação com Zod
    const result = await editUserSchema.safeParseAsync(formData);
    if (!result.success) {
      const Error = result.error.issues[0].message;
      console.log(result.error.issues[0].path);
      setFocusInput(result.error.issues[0].path[0]);
      toast.error(Error);
      return;
    }
    //Cria usuário no Firebase
    const { success } = await updateUserData(user.id, formData, photo, setUser); // trocar por editeuser //////////////////////
    //Tratar erro DO FIREBASE
    if (!success) {
      toast.error("Erro ao editar perfil, verifique e tente novamente.", {
        duration: 5000,
      });
      return
    }

    //Tratar sucesso
    toast.success("Pefil  editado com sucesso!", { duration: 5000 });
    setFocusInput("");
  };


  const handlePhoneChange = (event) => {
    setFocusInput("");
    const { value } = event.target;
    const formattedPhone = formatPhoneNumber(value);
    setPhone(formattedPhone);
  };

  function formatPhoneNumber(value) {
    // Remove qualquer caractere não numérico
    const cleanedValue = value.replace(/\D/g, "");
    // Se o valor estiver vazio, retorne uma string vazia
    if (cleanedValue.length === 0) {
      return "";
    }
    // Verifica a quantidade de números e aplica a formatação
    if (cleanedValue.length <= 2) {
      return `(${cleanedValue}`;
    } else if (cleanedValue.length <= 7) {
      return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2)}`;
    } else {
      return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(
        2,
        7
      )}-${cleanedValue.slice(7, 11)}`;
    }
  }

  const handleCepChange = (event) => {
    setFocusInput("");
    const { value } = event.target;
    const formatted = formatCep(value);
    setCep(formatted);
    setCity("");
    setState("");
    setValidCep(false);
  };

  function formatCep(value) {
    // Remove qualquer caractere não numérico
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 0) return "";

    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 5) {
      return cleaned.slice(0, 2) + "." + cleaned.slice(2);
    } else {
      return (
        cleaned.slice(0, 2) +
        "." +
        cleaned.slice(2, 5) +
        "-" +
        cleaned.slice(5, 8)
      );
    }
  }

  return (
    <form
      onSubmit={hendleSubmit}
      className="h-full lg:h-auto bg-white p-4 2xl:p-14 flex flex-col   sm:gap-4  overflow-auto "
    >
      <div className=" flex flex-wrap items-center justify-center  gap-5 2xl:gap-30  ">
        <div
          className=" w-full  lg:h-68 
          2xl:w-[350px]  2xl:h-[350px] 
            flex items-center justify-center  "
        >
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <div className="relative ">
            <label
              htmlFor="imageUpload"
              className="absolute top-0 -left-4 text-[1.6rem] text-[rgb(var(--blue-950))] cursor-pointer"
            >
              <BiSolidEdit />
            </label>
            <img
              src={photo ? URL.createObjectURL(photo) : user?.photoURL}
              alt="Photo Profile"
              className={` w-30 h-30 sm:w-50 sm:h-50 lg:w-62 lg:h-62  2xl:w-[320px] 2xl:h-[320px]  trasition duration-300 rounded-full  object-fill
              `}
            />
          </div>
        </div>
        <section
          className="flex sm:gap-2 lg:gap-10 justify-center flex-wrap flex-1 
          2xl:flex-col
         "
        >
          <section className="2xl:flex-col ">
            <Title
              text="Dados pessoais"
              className="text-zinc-700 font-bold text-[1rem] pb-1"
            />
            <div className="2xl:flex 2xl:gap-10">
              <InputLayout className={` w-[260px]`}>
                <Label id="name">Nome *</Label>
                <InputUi
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autocomplete="name"
                  disabled
                  className={`
                    ${
                      focusInput === "name"
                        ? "border-1 border-red-600"
                        : "border-transparent"
                    }
                  `}
                  required
                />
              </InputLayout>
              <InputLayout className={` max-w-[300px]`}>
                <Label id="email">Email *</Label>
                <InputUi
                  id="email"
                  type="email"
                  placeholder="Email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value), setFocusInput("");
                  }}
                  autocomplete="email"
                  required
                  className={
                    focusInput === "email" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>
              <InputLayout className={` max-w-[300px]`}>
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
            </div>
          </section>

          <section className=" ">
            <Title
              text="Endereço"
              className="text-zinc-700 font-bold text-[1rem] pb-1"
            />
            <div className="2xl:flex 2xl:gap-10">
              <InputLayout className={` w-[260px]`}>
                <Label id="cep">CEP *</Label>
                <InputUi
                  id="cep"
                  type="text"
                  maxLength={12}
                  minLength={8}
                  placeholder="00.000-000"
                  value={cep}
                  onChange={handleCepChange}
                  // busca ao sair do campo
                  onBlur={(e) => buscarCEP(e.target.value)}
                  autocomplete="postal-code"
                  required
                  className={
                    focusInput === "cep" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>
              <InputLayout className={` max-w-[300px]`}>
                <Label id="uf">Estado</Label>
                <InputUi
                  id="uf"
                  type="text"
                  placeholder="UF"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value), setFocusInput("");
                  }}
                  readOnly={validCep}
                  required
                  className={
                    focusInput === "uf" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>
              <InputLayout className={` max-w-[300px]`}>
                <Label id="city">Cidade</Label>
                <InputUi
                  id="city"
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value), setFocusInput("");
                  }}
                  readOnly={validCep}
                  className={
                    focusInput === "city" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>
            </div>
          </section>
        </section>
      </div>

      <div className="flex items-center justify-center 2xl:justify-start xl:ml-12 2xl:ml-23 ">
        <div className="w-[160px]">
          <SignInButton text="Salvar" />
        </div>
      </div>
    </form>
  );
}
