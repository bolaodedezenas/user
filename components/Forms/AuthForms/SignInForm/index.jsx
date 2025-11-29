"user client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {loginWithEmail} from "@/libs/firebase/authService";
// components
import FormLayout from "@/components/Forms/FormLayout";
import Label from "@/components/Label";
import InputUi from "@/components/InputUi";
import SignInButton from "@/components/Btns/SignInButton";
import GoogleButton from "@/components/Btns/GoogleButton";
import Title from "@/components/Title";
import InputLayout from "@/components/InputLayout";
//icons
import Icon from "@/components/Icon";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
// toast
import toast from "react-hot-toast";
// context
import { useAuth } from "@/context/AuthContext";

export default function SignInForm() {
  const { setLoading, setUser, handleLoginWithGoogle, handleLoginWithEmail } = useAuth();
  const router = useRouter();
  const perfil = JSON.parse(localStorage.getItem('Photo')) || null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const hendleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Por favor, preencha todos os campos!', {duration: 5000});
    setLoading(true);
    const { user, error } = await handleLoginWithEmail(email, password);
    if (error || !user) {
      setTimeout(() => setLoading(false), 1000);
      if (error.code === 'auth/invalid-credential')
        return toast.error('Email ou senha incorretos.');
      if (error.code === 'auth/wrong-password')
        return toast.error('Email ou senha incorretos.');
       toast.error('Ops!, Seu e-mail ainda não foi verificado. Verifique sua caixa de entrada.', {duration: 8000});
      return;
    }
    
    toast.success('Login realizado com sucesso!');
  };

  // Login com Google
  const onGoogleLogin = async () => {
    setLoading(true);
    const { user, error } = await handleLoginWithGoogle();
    setUser(user);
    if (error) return setError('Erro ao entrar com Google.');
  };

  return (
    <FormLayout>
      <form
        onSubmit={(e) => hendleSubmit(e)}
        className='w-full flex flex-col items-center pt-2 pb-5'
      >
        {perfil === null ? (
          <Icon
            className='rounded-full '
            name='account_circle'
            size={50}
            color='rgb(var(--icon))'
          />
        ) : (
          <Image
            src={perfil} // caminho da imagem
            alt='Foto de perfil'
            width={50} // largura em px
            height={50} // altura em px
            className='rounded-full mb-1.5 mt-1.5'
          />
        )}
        <Title text='Acesso ao Painel' />
        <p className='pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal'>
          Entre na sua conta com seus dados abaixo:
        </p>
        <div className='w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-8 '>
          <InputLayout>
            <Label id='email'>Email</Label>
            <InputUi
              id='email'
              type='email'
              name='email'
              placeholder='Email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autocomplete='email'
            />
          </InputLayout>
          <InputLayout>
            <Label id='password'>Senha</Label>
            <InputUi
              id='password'
              type={showPassword ? 'password' : 'text'}
              name='password'
              placeholder='Digite sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete='new-password'
            />
            {showPassword ? (
              <FiEyeOff
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
                className=' 
                        text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem]  cursor-pointer position: absolute right-4'
              />
            ) : (
              <FiEye
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
                className='
                        text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4'
              />
            )}
          </InputLayout>
          <p
            onClick={() => router.push('/forgotPassword')}
            className='text-[rgb(var(--text))] text-[0.9rem] w-full text-center cursor-pointer hover:underline mb-3.5 mt-3 italic font-medium'
          >
            Esqueceu a senha?
          </p>
          <SignInButton text='Entrar' />
          <p className='text-[rgb(var(--text))] text-[0.9rem] font-medium text-center mt-1.5 mb-1.5'>
            OU CONTINUAR COM
          </p>
          <GoogleButton
            onClick={() => {
              onGoogleLogin();
            }}
          />
        </div>
        <p className=' w-[190px]  xxs:w-full  text-[rgb(var(--text))] text-[0.9rem] text-center mt-4'>
          Não tem uma conta?{' '}
          <span
            className='text-[rgb(var(--text-links))] cursor-pointer hover:underline '
            onClick={() => router.replace('/register')}
          >
            Cadastre-se agora
          </span>
        </p>
      </form>
    </FormLayout>
  );
}
