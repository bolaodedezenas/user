'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/schemas/authSchemas';
// components
import FormLayout from '@/components/Forms/FormLayout';
import Label from '@/components/Label';
import InputUi from '@/components/InputUi';
import SignInButton from '@/components/Btns/SignInButton';
import GoogleButton from '@/components/Btns/GoogleButton';
import Title from '@/components/Title';
import InputLayout from '@/components/InputLayout';
//icons
import Icon from '@/components/Icon';
import { FiEyeOff, FiEye } from 'react-icons/fi';
// hooks
import { registerWithEmail } from '@/libs/firebase/authService';
// toast
import toast from 'react-hot-toast';
// context
import { useAuth } from '@/context/AuthContext';


export default function SignUpForm() {
  const {setLoading, handleLoginWithGoogle } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [cep, setCep] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [terms, setTerms] = useState(false);
  const [validCep, setValidCep] = useState(false);

  const [focusInput, setFocusInput] = useState('');
  
   async function buscarCEP(valor) {
     try {
       const somenteNumeros = valor.replace(/\D/g, '');
       if (somenteNumeros.length !== 8) {
          setFocusInput('cep');
          toast.error('CEP inválido, Ex: 12.345-678.');
          return;
       }
       const res = await fetch(
         `https://viacep.com.br/ws/${somenteNumeros}/json/`
       );
       const data = await res.json();
       if (data.erro) {
         toast.error('CEP não encontrado');
         setFocusInput('cep');
         setValidCep(false);
         setState('');
         setCity('');
         return;
       }
       toast.success('CEP encontrado com sucesso!');
       setValidCep(true);
       setState(data.estado);
       setCity(data.localidade);
     } catch (err) {
       console.error('Erro ao buscar CEP:', err);
       setFocusInput('cep');
       toast.error('Erro ao buscar CEP, verifique e tente novamente.');
     }
   }

  const hendleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm){
      toast.error('Ops!, senhas diferentes verifique e tente novamente.');
      setFocusInput('password');
      return; 
    } 

    if(!validCep){ 
      toast.error('CEP inválido, verifique e tente novamente.')
      setFocusInput('cep');
      setCity('');
      setState('');
      setValidCep(false);
      return; 
    };

    const formData = {
      name,
      email,
      password,
      phone,
      cep,
      state,
      city,
      terms,
      photoURL: '',
      roles: [], // Ex: 'admin', 'user'
      permissions: [], // Ex: { route: '/admin', actions: { canView: true, canEdit: false, canDelete: false} }
      status: 'bloqueado', // ativo,  bloqueado
      isAdmin: false,
    };
    
    // Validação com Zod
    const result = await registerSchema.safeParseAsync(formData);
    if (!result.success) {
      const Error = result.error.issues[0].message;
      console.log(result.error.issues[0].path);
      setFocusInput(result.error.issues[0].path[0]);
      toast.error(Error);
      return;
    }
    //Cria usuário no Firebase
    const { error } = await registerWithEmail(email, password, formData);
    //Tratar erro DO FIREBASE
    if (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Este e-mail já está em uso. Tente outro.');
        return;
      }
      // Para outros erros
      toast.error(error.message || 'Erro ao registrar');
      return;
    }

      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      setCep('');
      setPhone('');
      setState('');
      setCity('');
      setTerms(false);

      setLoading(true)
      toast.success('Conta criada com sucesso!', {duration: 8000});
      router.replace('/login' )
      setTimeout(() => {setLoading(false)} , 5000);
  };

  // Login com Google
  const onGoogleLogin = async () => {
    setLoading(true);
    const { user, error } = await handleLoginWithGoogle();
    if (error) return setError('Erro ao entrar com Google.');
    if (user) {
      router.replace('/'); // redireciona para a página raiz
    }
  };

   const handlePhoneChange = (event) => {
    setFocusInput('');
     const { value } = event.target;
     const formattedPhone = formatPhoneNumber(value);
     setPhone(formattedPhone);
   };

   function formatPhoneNumber(value) {
     // Remove qualquer caractere não numérico
     const cleanedValue = value.replace(/\D/g, '');
     // Se o valor estiver vazio, retorne uma string vazia
     if (cleanedValue.length === 0) {
       return '';
     }
     // Verifica a quantidade de números e aplica a formatação
     if (cleanedValue.length <= 2) {
       return `(${cleanedValue}`;
     } else if (cleanedValue.length <= 7) {
       return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2)}`;
     } else {
       return `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2,7)}-${cleanedValue.slice(7, 11)}`;
     }
   }

   const handleCepChange = (event) => {
     setFocusInput('');
     const { value } = event.target;
     const formatted = formatCep(value);
     setCep(formatted);
     setCity('');
     setState('');
     setValidCep(false);
   };

    function formatCep(value) {
      // Remove qualquer caractere não numérico
      const cleaned = value.replace(/\D/g, '');

      if (cleaned.length === 0) return '';

      if (cleaned.length <= 2) {
        return cleaned;
      } else if (cleaned.length <= 5) {
        return cleaned.slice(0, 2) + '.' + cleaned.slice(2);
      } else {
        return (
          cleaned.slice(0, 2) +
          '.' +
          cleaned.slice(2, 5) +
          '-' +
          cleaned.slice(5, 8)
        );
      }
    }
    


  return (
    <FormLayout>
      <form
        onSubmit={hendleSubmit}
        className='w-full flex flex-col items-center'
      >
        <Title text='Criar Conta' />
        <p className='pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal'>
          Registre-se e Comece a ganhar hoje!
        </p>
        <div className='w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-5'>
          <InputLayout>
            <Label id='name'>Nome *</Label>
            <InputUi
              id='name'
              type='text'
              placeholder='Digite seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autocomplete='name'
              className={focusInput === 'name' ? 'border-1 border-red-600' : ''}
              required
            />
          </InputLayout>
          <InputLayout>
            <Label id='email'>Email *</Label>
            <InputUi
              id='email'
              type='email'
              placeholder='Email@example.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value), setFocusInput('');
              }}
              autocomplete='email'
              required
              className={
                focusInput === 'email' ? 'border-1 border-red-600' : ''
              }
            />
          </InputLayout>
          <InputLayout>
            <Label id='password'>Senha *</Label>
            <InputUi
              id='password'
              type={showPassword ? 'password' : 'text'}
              placeholder='Digite sua senha'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value), setFocusInput('');
              }}
              autocomplete='new-password'
              required
              className={
                focusInput === 'password' ? 'border-1 border-red-600' : ''
              }
            />
            {showPassword ? (
              <FiEyeOff
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(false);
                }}
                className='text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4'
              />
            ) : (
              <FiEye
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(true);
                }}
                className='text-[rgb(var(--icon-secundary))] hover:text-[rgb(var(--icon-hover))] text-[1.2rem] cursor-pointer position: absolute right-4'
              />
            )}
          </InputLayout>
          <InputLayout>
            <Label id='passwordConfirm'>Confirmar Senha *</Label>
            <InputUi
              id='passwordConfirm'
              type={showPassword ? 'password' : 'text'}
              placeholder='Repita a sua senha'
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value), setFocusInput('');
              }}
              autocomplete='new-password'
              required
              className={
                focusInput === 'password' ? 'border-1 border-red-600' : ''
              }
            />
          </InputLayout>
          <InputLayout>
            <Label id='phone'>Telefone</Label>
            <InputUi
              id='phone'
              type='text'
              placeholder='(99) 99999-9999'
              value={phone}
              onChange={handlePhoneChange}
              autocomplete='tel'
              required
              className={
                focusInput === 'phone' ? 'border-1 border-red-600' : ''
              }
            />
          </InputLayout>
          <InputLayout>
            <Label id='cep'>CEP *</Label>
            <InputUi
              id='cep'
              type='text'
              maxLength={12}
              minLength={8}
              placeholder='00.000-000'
              value={cep}
              onChange={handleCepChange}
              // busca ao sair do campo
              onBlur={(e) => buscarCEP(e.target.value)}
              autocomplete='postal-code'
              required
              className={focusInput === 'cep' ? 'border-1 border-red-600' : ''}
            />
          </InputLayout>
          <InputLayout>
            <Label id='uf'>Estado</Label>
            <InputUi
              id='uf'
              type='text'
              placeholder='UF'
              value={state}
              onChange={(e) => {
                setState(e.target.value), setFocusInput('');
              }}
              readOnly={validCep}
              required
              className={focusInput === 'uf' ? 'border-1 border-red-600' : ''}
            />
          </InputLayout>
          <InputLayout>
            <Label id='city'>Cidade</Label>
            <InputUi
              id='city'
              type='text'
              placeholder='Cidade'
              value={city}
              onChange={(e) => {
                setCity(e.target.value), setFocusInput('');
              }}
              readOnly={validCep}
              className={focusInput === 'city' ? 'border-1 border-red-600' : ''}
            />
          </InputLayout>
          <div
            className={`flex items-center 
              mb-4 cursor-pointer gap-3
              ${
                focusInput === 'terms'
                  ? 'underline text-red-500 font-bold '
                  : ''
              }
              `}
          >
            <InputUi
              type='checkbox'
              width='20px'
              height='20px'
              checked={terms}
              required
              onChange={(e) => {
                setTerms(e.target.checked), setFocusInput('');
              }}
            />
            <p className='max-w-[90%] text-[rgb(var(--text))] text-[0.9rem] font-medium'>
              Declaro ter 18+
              <span className='text-[rgb(var(--text-links))] cursor-pointer hover:underline pl-1'>
                Termos e Condições
              </span>{' '}
              *
            </p>
          </div>
          <SignInButton text='Criar Conta' />
          <p className='text-[rgb(var(--text))] text-[0.9rem] font-medium text-center mt-1.5 mb-1.5'>
            OU CONTINUAR COM
          </p>
          <GoogleButton
            onClick={() => {
              onGoogleLogin();
            }}
          />
        </div>
        <p className='w-[190px] xxs:w-full text-[rgb(var(--text))] text-[0.9rem] text-center mt-4'>
          Já tem conta?
          <span
            className='text-[rgb(var(--text-links))] cursor-pointer hover:underline font-bold'
            onClick={() => router.replace('/login')}
          >
            {' '}
            Entrar
          </span>
        </p>
      </form>
    </FormLayout>
  );
}
