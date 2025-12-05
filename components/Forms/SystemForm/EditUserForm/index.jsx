"use client";

import { useState, useEffect } from "react";
import { editUserSchema } from "@/schemas/authSchemas";
// components
import Label from "@/components/Label";
import InputUi from "@/components/InputUi";
import SignInButton from "@/components/Btns/SignInButton";
import InputLayout from "@/components/InputLayout";
import Title from "@/components/Title";
import ConfirmDialog from "@/components/ConfirmDialog";
// hooks
import { BiSolidEdit } from "react-icons/bi";

// toast
import toast from "react-hot-toast";
// context
import { useAuth } from "@/context/AuthContext";
//services
import { updateUserData, atualizarEmailComVerificacao } from "@/libs/firebase/authService";

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

  const [open, setOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);



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


  const salvar = async (formData) => {
    const { success } = await updateUserData(user.id, formData, photo, setUser);

    if (!success) {
      toast.error("Erro ao editar perfil, verifique e tente novamente.", {
        duration: 5000,
      });
      return;
    }

    toast.success("Perfil editado com sucesso!", { duration: 5000 });
    setFocusInput("");
  };



  const handleupdateEmail = async () => {
    const { success, error } = await atualizarEmailComVerificacao(email);

    if (!success) {
      console.error(error);

      if (error === "auth/requires-recent-login") {
        toast.error(
          "Para editar o email, é preciso refazer o login novamente. Saia da conta e entre novamente.",
          { duration: 10000 }
        );
        setOpen(false);
        return;
      }

      toast.error("Erro ao editar email, verifique e tente novamente.", {
        duration: 5000,
      });
      setConfirmEmail(false);
      return;
    }

    // Email enviado com sucesso
    setConfirmEmail(true);
    setOpen(false);

    toast.success(
      `Perfil atualizado!
      Seus dados foram salvos corretamente.
      Para concluir a troca de email, verifique sua caixa de entrada do novo endereço informado — enviamos um link de confirmação.
      Após confirmar o email, sua conta passará a utilizar o novo endereço normalmente.`,
      { duration: 8000 }
    );

    // Agora salva o resto dos dados do perfil
    const formData = {
      name,
      phone,
      cep,
      state,
      city,
      photoURL: "",
    };

    salvar(formData);
  };



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
      photoURL: "",
    };

    const result = await editUserSchema.safeParseAsync(formData);
    if (!result.success) {
      const Error = result.error.issues[0].message;
      setFocusInput(result.error.issues[0].path[0]);
      toast.error(Error);
      return;
    }

    // EMAIL MUDOU?
    if (user.email !== email && !confirmEmail) {
      setOpen(true);
      return;
    }

    // Email não mudou → salva direto
    salvar(formData);
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
      className=" bg-white  2xl:p-14 flex flex-col items-center  overflow-auto  rounded-[10px] "
    >
      <div className=" flex flex-wrap  justify-center  gap-5 2xl:gap-15 pt-3 ">
        <div
          className=" w-full  lg:h-68 
          2xl:w-[270px]  2xl:h-[250px] 
            flex items-center justify-center "
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
              className="absolute top-0 -left-5  text-[2rem] text-[rgb(var(--btn))] cursor-pointer"
            >
              <BiSolidEdit />
            </label>
            <img
              src={photo ? URL.createObjectURL(photo) : user?.photoURL}
              alt="Photo Profile"
              className={` w-30 h-30 sm:w-30 sm:h-30 lg:w-62 lg:h-62  2xl:w-[230px] 2xl:h-[230px]  trasition duration-300 rounded-full  object-cover
              `}
            />
          </div>
        </div>
        <section
          className="flex xs:gap-2 sm:gap-5 lg:gap-2 justify-center flex-wrap  
          2xl:flex-col xl:items-center overflow-auto  xd:h-auto 
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
              <InputLayout className={`w-[260px] `}>
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
              <InputLayout className={` w-[260px]`}>
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
              <InputLayout className={`w-[260px]`}>
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
              <InputLayout className={` w-[260px]`}>
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
          <div className="w-full flex items-center pt-2  justify-center  pb-3.5  ">
            <div className="w-[160px] ">
              <SignInButton text="Salvar" />
            </div>
          </div>
        </section>
      </div>
      <ConfirmDialog
        open={open}
        title="⚠️ Atenção"
        message="Você realmente deseja alterar seu email ? Por favor, confirme a ação."
        onConfirm={handleupdateEmail}
        onCancel={() => setOpen(false)}
      />
    </form>
  );
}
