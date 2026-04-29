"use client";

import { useState, useEffect } from "react";

// schemas
import { customerSchema } from "../../schemas/customerSchema";

// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/Input";
import SignInButton from "@/components/Btns/SignInButton";
import ImageUpload from "../ImageUpload";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
import Paragraph from "@/components/paragraph";

// toast
import toast from "react-hot-toast";

import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCep } from "@/utils/formatCep";
import { buscarCEP } from "@/utils/buscaCep";
import { useCustomers } from "../../hooks/useCustomers"; // Import the correct hook
 
export default function CustomersForm({ isOpen, onClose }) {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [focusInput, setFocusInput] = useState("");
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isCepValid, setIsCepValid] = useState(false);
  const [status, setStatus] = useState(true);  

  const { createCustomer, isSaving } = useCustomers();  
 
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      phone,
      cep,
      state,
      city,
      status,
      // Enviamos a string da preview para validar no Zod (que espera string)
      avatar_url: avatar?.preview || null,
    };

    const zodResult = await customerSchema.safeParseAsync(formData);

    if (!zodResult.success) {
      const Error = zodResult.error.issues[0].message;
      setFocusInput(zodResult.error.issues[0].path[0]);
      toast.error(Error);
      return;
    }

    // Call the createCustomer function from the hook
    // Passamos os dados validados e o arquivo real para processamento de upload no hook
    const newCustomer = await createCustomer({
      ...formData,
      avatar_file: avatar?.file || null,
    });

    if (newCustomer) {
      // Reset form fields on successful creation
      setName("");
      setPhone("");
      setCep("");
      setState("");
      setCity("");
      setAvatar(null);
      setStatus(true);
      setIsCepValid(false);
      setFocusInput("");
      onClose?.(); // Close the form
    }
  };

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget && !isSaving) onClose?.();
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
      setIsCepValid(false);
      return;
    }

    if (cleanCep.length !== 8) return;

    try {
      const response = await buscarCEP(cleanCep);

      if (!response || response.erro) {
        toast.error("CEP não encontrado.");
        setCity("");
        setState("");
        setIsCepValid(false);
        return;
      }

      setCity(response.data.localidade || "");
      setState(response.data.uf || "");
      setIsCepValid(true);

      toast.success("Cidade e Estado preenchidos!");
    } catch (error) {
      setCity("");
      setState("");
      setIsCepValid(false);
      toast.error("Erro ao consultar o CEP.");
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <div className=" max-h-[98vh] overflow-y-auto rounded-3xl ">
        <FormLayout>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center py-5"
          >
            <Title
              className="font-semibold text-[1.2rem]"
              text="Cadastrar Cliente"
            />

            <Paragraph
              className="text-[0.8rem]"
              text="Preencha os campos abaixo para criar sua conta."
            />

            <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5 pr-5 mt-5">
              <div className="pb-5 w-full">
                <ImageUpload
                  label="Foto de Perfil"
                  value={avatar}
                  onChange={(file) => setAvatar(file)}
                />
              </div>

              <InputLayout>
                <Label id="name">Nome *</Label>

                <InputUi
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autocomplete="name"
                  className={
                    focusInput === "name" ? "border-1 border-red-600" : ""
                  }
                  required
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
                  className={
                    focusInput === "cep" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>

              <InputLayout>
                <Label id="uf">Estado</Label>

                <InputUi
                  id="uf"
                  type="text"
                  placeholder="UF"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setFocusInput("");
                  }}
                  readOnly={isCepValid}
                  required
                  className={
                    focusInput === "uf" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>

              <InputLayout>
                <Label id="city">Cidade</Label>

                <InputUi
                  id="city"
                  type="text"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setFocusInput("");
                  }}
                  readOnly={isCepValid}
                  className={
                    focusInput === "city" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>

              <div className="flex flex-col items-center gap-3 mt-8">
                <SignInButton text={isSaving ? "Cadastrando..." : "Cadastrar"} disabled={isSaving} />

                <SignInButton
                  type="button" // Important to prevent form submission
                  onClick={onClose}
                  className="
                    bg-[rgba(var(--blue-50))]  
                    hover:bg-[rgba(var(--blue-100))]/70 
                    text-zinc-800
                  "
                  text="Cancelar"
                  disabled={isSaving}
                />
              </div>
            </div>
          </form>
        </FormLayout>
      </div>
    </div>
  );
}
