"use client";

import Link from 'next/link';
// icons
import { FaBuildingShield } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { MdEditSquare } from 'react-icons/md';

// context
import { useAuth } from '@/context/AuthContext';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer
      className='
        w-full 
        bg-[rgb(var(--secondary))] 
        text-[rgb(var(--text-blue))]
        font-bold
        text-[1rem]
        justify-center
        flex 
        gap-4
        flex-wrap
        pt-2 pb-2
        items-center 
      '
    >
      <div className='flex items-center gap-4 pl-8 pr-8 border-r border-b-gray-400 '>
        {user?.photoURL ? (
          <img
            src={user?.photoURL}
            alt='Foto de perfil'
            className='w-10 h-10 rounded-full object-cover'
          />
        ) : (
          <FaUser className='text-2xl' />
        )}
        <h4>{user?.name?.split(' ')[0].toUpperCase()}</h4>
        <MdEditSquare className='text-2xl' />
      </div>
      <section className='md:flex-1 flex  justify-between pl-8 flex-wrap'>
        <div className='flex items-center gap-4'>
          <FaBuildingShield className='text-2xl' />
          <h4 className='whitespace-nowrap uppercase'>
            Bolão de Dezenas 2025 - Versão 0.0.1
          </h4>
        </div>
      </section>
      <Link
        className='whitespace-nowrap text-center pl-10 pr-8 uppercase'
        href='https://www.rixxer.com.br/'
        target='_blank'
      >
        Desenvolvido pela Rixxer
      </Link>
    </footer>
  );
}
