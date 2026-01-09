"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/libs/firebase/FirebaseConfig';
import { applyActionCode } from 'firebase/auth';
// icon 
import Icon from '@/components/Icon';

import { useAuth } from "@/context/AuthContext";
// components
import Loading from "@/components/Loading";
import ResetPasswordForm from "@/components/Forms/AuthForms/ResetPasswordForm";

export default function Recovery() {
  const { loading, setLoading } = useAuth(); // pega as funções do contexto
  const router = useRouter();
  const [oobCode, setOobCode] = useState('');
  const [mode, setMode] = useState('');
  const [close, setClose] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log(close);
  }, [oobCode, mode, close]);

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams(window.location.search);
    const code = query.get('oobCode');
    const modeType = query.get('mode');
    const continueUrl = query.get('continueUrl');

    // Decodifica a continueUrl (remove os %3F, %2F, etc.)
    const decodedUrl = continueUrl ? decodeURIComponent(continueUrl) : '';
    // Captura o número que vem depois de ?
    const numMatch = decodedUrl.match(/\?(\d+)/);
    const pageCode = numMatch ? numMatch[1] : null;

    setOobCode(code);
    setMode(modeType);
    setClose(pageCode);

    console.log(modeType);
    console.log(code);

    if (!code) return router.replace('/not-found');
    
    // Se for verificação de email
    if (modeType === "verifyEmail" || modeType === "verifyAndChangeEmail") {
      applyActionCode(auth, code)
        .then(() => {
          setMessage({
            title: "Email verificado com sucesso!",
            text: "Agora vocé pode fazer login com seu email.",
          });
        })
        .catch((error) => {
          console.error(error);
          setMessage({
            title: "Erro ao verificar email!",
            text: "Link expirado ou inválido, solicite um novo link de verificação.",
          });
        });
      setTimeout(() => router.replace(`/login`), 10000);
    }
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <div
      className="
      scrollbar-transparent overflow-auto 
      min-h-full 
      flex items-center  justify-center
      bg-gradient-to-t from-[rgb(var(--background-secundary))] to-[rgb(var(--background))]
      p-4
      "
    >
      {mode === "resetPassword" ? (
        <ResetPasswordForm oobCode={oobCode} />
      ) : (
        <div className=" p-5 w-full max-w-[650px] text-center  ">
          {message.title === "Erro ao verificar email!" ? (
            <Icon name="Warning" size={100} color="red" />
          ) : (
            <Icon name="Verified_User" size={100} color="white" />
          )}
          <h3 className="text-[rgb(var(--white))] text-[2.8rem] ">
            {message.title}
          </h3>
          <p className="text-[rgb(var(--white))] text-[1.3rem] ">
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
}


