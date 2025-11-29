"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import SignInButton from "@/components/Btns/SignInButton";

export default function Welcome() {
  const { user, handleLogout, loading } = useAuth();

  useProtectedRoute();
  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--background-secundary))] p-4">
      <div className="flex flex-col items-center justify-center relative bg-white shadow-2xl  rounded-3xl p-8 w-full max-w-[600px] text-center ">
        {/* Ícone animado */}
        <div className="relative flex items-center justify-center w-25 h-25 rounded-full   ">
          <span className="text-6xl animate-spin">🕓</span>
        </div>
        <p className="text-[rgb(var(--blue-700))] text-[1.8rem] xl:text-[2.3rem] font-semibold mb-4">
          Bolão das Dezenas!
        </p>
        <p className="text-[1.6rem] xl:text-[2rem] font-extrabold text-[rgb(var(--blue-900))]  leading-snug">
          Bem-vindo(a)
        </p>
        <h2 className="text-[rgb(var(--text-title))] text-[1.1rem] xl:text-[1.3rem] mb-4">
          {user?.name}
        </h2>

        {/* Mensagem principal */}
        <p className="text-[rgb(var(--blue-700))] text-[1.3rem] mb-2">
          Seu cadastro foi concluído com sucesso 🎉
        </p>
        {/* Explicação */}
        <p className="text-gray-600 leading-relaxed mb-10 text-base">
          Agora é só aguardar um pouquinho. Nosso administrador está
          configurando seu acesso e suas permissões.
          <br />
          <span className="font-semibold text-gray-800">
            Assim que tudo estiver pronto, você poderá acessar o painel.
          </span>
        </p>
        <div className="w-[100px]">
          <SignInButton text="Sair" onClick={() => handleLogout()} />
        </div>
        <p className="text-sm text-gray-400 mt-10">
          © {new Date().getFullYear()} Bolão das Dezenas. Todos os direitos
          reservados.
        </p>
      </div>
    </div>
  );
}
