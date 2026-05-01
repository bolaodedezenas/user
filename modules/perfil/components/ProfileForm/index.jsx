 
"use client";

import { useEffect, useState } from "react";

// components
import InputLayout from "@/components/InputLayout";
import Label from "@/components/Label";
import InputUi from "@/components/Input";
import SignInButton from "@/components/Btns/SignInButton";
import ImageUpload from "@/modules/customers/components/ImageUpload";

// schemas
import { editUserSchema } from "@/modules/auth/schemas/authSchemas";

// zustand
import { useAuthStore } from "@/modules/auth/stores/auth.store";

// hooks
import { useProfile } from "../../hooks/useProfile";

// utils
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCep } from "@/utils/formatCep";
import { buscarCEP } from "@/utils/buscaCep";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const { user } = useAuthStore();
  const { updateProfile, isSaving } = useProfile();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [avatar, setAvatar] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [focusInput, setFocusInput] = useState("");
  const [isCepValid, setIsCepValid] = useState(false);

  useEffect(() => {
    if (!user) return;

    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setCpf(user?.cpf || "");
    setAvatar(user?.avatar_url || "");
    setCep(user?.cep || "");
    setCity(user?.city || "");
    setState(user?.state || "");
    if (user?.cep?.length >= 8) setIsCepValid(true);
  }, [user]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      cpf,
      cep,
      city,
      state,
      avatar_url: typeof avatar === "string" ? avatar : avatar?.preview || null,
    };

    const zodResult = await editUserSchema.safeParseAsync(formData);

    if (!zodResult.success) {
      const Error = zodResult.error.issues[0].message;

      setFocusInput(zodResult.error.issues[0].path[0]);

      toast.error(Error);
      return;
    }

    // só envia arquivo se realmente for novo
    const avatarFile =
      avatar instanceof File
        ? avatar
        : avatar?.file instanceof File
          ? avatar.file
          : null;

    await updateProfile({
      ...formData,
      avatar_file: avatarFile,
    });
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
      toast.success("Endereço atualizado!");
    } catch (error) {
      setCity("");
      setState("");
      setIsCepValid(false);
      toast.error("Erro ao consultar o CEP.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" m-auto ">
      {/* CARD */}
      <div className="flex flex-wrap  justify-center p-5 gap-6">
        {/* FOTO */}
        <div className="h-[200px]  w-[200px]  ">
          <ImageUpload
            label="Foto de Perfil"
            value={avatar}
            onChange={(file) => setAvatar(file)}
          />
        </div>

        {/* FORMULÁRIO */}
        <div className="flex flex-col gap-2 ">
          {/* LINHA 1 */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[260px] ">
              <InputLayout>
                <Label id="name">Nome</Label>
                <InputUi
                  id="name"
                  type="text"
                  value={name}
                  disabled={true}
                  onChange={(e) => setName(e.target.value)}
                  className={` cursor-not-allowed
                    ${focusInput === "name" ? "border-1 border-red-600" : ""}
                  `}
                />
              </InputLayout>
            </div>

            <div className="flex-1 min-w-[260px] ">
              <InputLayout>
                <Label id="email">E-mail</Label>
                <InputUi
                  id="email"
                  type="email"
                  value={email}
                  disabled={true}
                  onChange={(e) => setEmail(e.target.value)}
                  className={` cursor-not-allowed
                    ${focusInput === "email" ? "border-1 border-red-600" : ""}
                  `}
                />
              </InputLayout>
            </div>
          </div>

          {/* LINHA 2 */}
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 max-xs:min-w-[250px]  ">
              <InputLayout>
                <Label id="phone">Telefone</Label>
                <InputUi
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(formatPhoneNumber(e.target.value));
                    setFocusInput("");
                  }}
                  className={
                    focusInput === "phone" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>
            </div>

            <div className="flex-1 max-xs:min-w-[250px]  ">
              <InputLayout>
                <Label id="cpf">CPF</Label>
                <InputUi
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className={
                    focusInput === "cpf" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>
            </div>
          </div>

          {/* LINHA 3 */}
          <div className="flex flex-wrap gap-2">
            <div className="flex-1  max-xs:min-w-[250px] ">
              <InputLayout>
                <Label id="cep">CEP</Label>
                <InputUi
                  id="cep"
                  type="text"
                  value={cep}
                  onChange={handleCepChange}
                  className={
                    focusInput === "cep" ? "border-1 border-red-600" : ""
                  }
                />
              </InputLayout>
            </div>

            <div className="flex-1  max-xs:min-w-[250px]  ">
              <InputLayout>
                <Label id="city">Cidade</Label>
                <InputUi
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  readOnly={isCepValid}
                  className={`
                    ${focusInput === "city" ? "border-1 border-red-600" : "" }
                    ${isCepValid ? "cursor-not-allowed" : ""}
                  `}
                />
              </InputLayout>
            </div>

            <div className="flex-1 max-xs:min-w-[250px]  ">
              <InputLayout>
                <Label id="state">Estado</Label>
                <InputUi
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  readOnly={isCepValid}
                  className={`
                    ${focusInput === "state" ? "border-1 border-red-600" : "" }
                    ${isCepValid ? "cursor-not-allowed" : ""}
                  `}
                />
              </InputLayout>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÃO */}
      <section className="flex items-center   justify-center px-5 pb-5 ">
        <div>
          <SignInButton
            text={isSaving ? "Salvando..." : "Salvar Alterações"}
            disabled={isSaving}
          />
        </div>
      </section>
    </form>
  );
}
