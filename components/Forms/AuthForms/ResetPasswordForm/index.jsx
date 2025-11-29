'use client';

import { useState } from 'react';
import { resetPassordSchema } from '@/schemas/authSchemas';
// components
import FormLayout from '@/components/Forms/FormLayout';
import Label from '@/components/Label';
import InputUi from '@/components/InputUi';
import SignInButton from '@/components/Btns/SignInButton';
import Title from '@/components/Title';
import InputLayout from '@/components/InputLayout';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
// toast
import toast from 'react-hot-toast';
// context
import { useAuth } from '@/context/AuthContext';
// icons
import Icon from '@/components/Icon';
import  {handleResetPassword }from '@/libs/firebase/authService';


export default function ResetPasswordForm({ oobCode }) {

  const router = useRouter();
  const { setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const hendleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // inicia loading
    try {
      if (password !== passwordConfirm) {
        toast.error('Ops!, senhas diferentes verifique e tente novamente.');
        return;
      }
      const newPassword = { password };
      const result = await resetPassordSchema.safeParseAsync(newPassword);

      if (!result.success) {
        const Error = result.error.issues[0].message;
        toast.error(Error);
        return;
      }

      const { status, message } = await handleResetPassword(oobCode, password);
      // console.log(status, message);
      if (!status) {
        switch (message) {
          case 'Firebase: Error (auth/invalid-action-code).':
            toast.error(
              'O link é inválido, já foi usado ou expirou. Solicite um novo.'
            );
            break;

          case 'auth/weak-password':
            toast.error('Senha muito fraca.');
            break;

          default:
            toast.error('Erro ao redefinir a senha.');
        }
        return;
      }

      toast.success(message, { duration: 6000 });
      setTimeout(() => {
        router.replace('/login');
        setTimeout(() => setLoading(false) , 2000);
      }, 1000);
   
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <FormLayout>
      <form
        onSubmit={(e) => hendleSubmit(e)}
        className='w-full flex flex-col items-center pt-5 pb-10'
      >
        <Icon
          className='rounded-full '
          name='Security'
          size={50}
          color='rgb(var(--icon))'
        />
        <Title text='Redefinição de Senha' />
        <p className='pl-3 pr-3 text-[1rem] text-center text-[rgb(var(--text-paragraph))] font-normal'>
          Por favor, preencha os campos abaixo!
        </p>
        <div className='w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-5'>
          <InputLayout>
            <Label id='password'>Senha *</Label>
            <InputUi
              id='password'
              type={showPassword ? 'password' : 'text'}
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
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autocomplete='new-password'
            />
          </InputLayout>
          <div className='pt-5'>
            <SignInButton text='Redefinir Senha' />
          </div>
        </div>
      </form>
    </FormLayout>
  );
}
