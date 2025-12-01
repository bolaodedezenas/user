"user client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/InputUi";
import SignInButton from "@/components/Btns/SignInButton";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
//icons
import Icon from "@/components/Icon";
import {sendPasswordReset} from "@/libs/firebase/authService";
import { GoPasskeyFill } from "react-icons/go";

// toast
import toast from "react-hot-toast";

//context
import { useAuth } from "@/context/AuthContext";

export default function SignInForm() {
    const { setLoading } = useAuth();
    const router = useRouter();
    const perfil = JSON.parse(localStorage.getItem("Photo")) || null;
    const [email, setEmail] = useState("");
    const [time , setTime] = useState(0);

    async function checkEmail(email) {
      const res = await fetch('/api/checkEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log(data);
      return data.exists;
    }


    async function hendleSubmit(e) {
        e.preventDefault();
        if (!email) return toast.error('Por favor, preencha todos os campos!');
        if(time > 0) return toast.error('Por favor, aguarde o tempo para enviar outro e-mail.');
        const exists = await checkEmail(email);

        if (!exists){
          startCountdown(); 
          toast.error(
            `Ops!, você ainda não possui uma conta!  redirecionando você para cadastro `,
            { duration: 4000 }
          );
          setTimeout(() => {
            router.push('/register');
            toast.success('Prontinho, Cadastre-se e tenha acesso!', {
              duration: 3000,
              icon: <GoPasskeyFill className=" text-[1.5rem]" />,
            });
          }, 4000);
          return;
        }
         
        const res = await sendPasswordReset(email);
        console.log(res);
        if (res.ok === false) return toast.error(res.error);
        if (res.ok === true) {
            setTime(60);
            startCountdown();
            toast.success('Email enviado com sucesso!');
        }
    }

    // Contagem regressiva
    function startCountdown() {
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return (
      <FormLayout>
        <form
          onSubmit={(e) => hendleSubmit(e)}
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
          <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5  ">
            <span
              className={` display: ${
                time > 0 ? "block" : "hidden"
              } font-semibold text-[rgb(var(--text))] text-[1.4rem] pb-1 text-center texte-[rgb(var(--text))]`}
            >
              {time}
            </span>
            <SignInButton text="Enviar" />
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
