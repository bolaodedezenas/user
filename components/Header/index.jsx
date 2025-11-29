"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
// icons 
import { IoClose, IoSearch, IoChatbox } from 'react-icons/io5';
import { FaGear } from 'react-icons/fa6';
import { IoMdNotifications} from 'react-icons/io';
import { AiFillCloseSquare } from 'react-icons/ai';

// components
import Dropdown from "@/components/Dropdown";
// utils
import { getRecentItems, removeRecentItem } from '@/utils/saveRecentItem';
import { usePathname } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user, handleLogout } = useAuth();
  const [recentItems, setRecentItems] = useState(false);
  const [items, setItems] = useState([]);

  const pathname = usePathname(); 
  const currentRoute = "/" + pathname.split('/')[1];

  useEffect(() => {
    const res = getRecentItems();
    setItems(res);
    setRecentItems(true);
  }, [recentItems]);

  const deleteItem = (item, href) => {
    removeRecentItem(href);
    const res = getRecentItems();
    setItems(res); // atualiza lista

    if (res.length === 0) return router.replace('/home');
    if (currentRoute === href) router.push(res[0].href); // redireciona para o primeiro item
  };

  if (!user) return null;

  const userName =
    user.name?.split(' ')[0] || user.displayName?.split(' ')[0] || 'usuário';
  const photoURL = user.photoURL;

  // dropdownData.js (ou dentro do próprio Header, se preferir)
  const dropdownSections = [
    {
      title: 'Financeiro',
      items: [{ label: 'Resumo financeiro', href: '/finance' }],
    },
    {
      title: 'Jogos',
      items: [{ label: 'Resumo dos jogos', href: '/games' }],
    },
    {
      title: 'Usuários',
      items: [{ label: 'Resumo dos usuários', href: '/users' }],
    },
    {
      title: 'Sorteios',
      items: [{ label: 'Relatórios dos sorteios', href: '/raffles' }],
    },
    {
      title: 'Ganhadores',
      items: [{ label: 'Relatórios dos ganhadores', href: '/winners' }],
    },
    {
      title: 'Dashboards',
      items: [{ label: 'Resumo dos dashboards', href: '/dashboard' }],
    },
  ];

  return (
    <header
      className=' 
        w-full 
        bg-[rgb(var(--text-blue))]
        relative z-50  
        text-[rgb(var(--white))]
      '
    >
      <div
        className=' 
        h-15 w-full flex justify-between items-center
        pl-10 pr-10 
        border-b border-b-gray-100 
        
      '
      >
        <nav
          className='
          xl:h-full w-full 
          flex  items-center justify-between  flex-wrap 

        '
        >
          <section className='flex gap-10 mr-10'>
            <button
              className=' h-15 text-[1rem] font-medium hover:text-gray-300 cursor-pointer'
              onClick={() => router.push('/home')}
            >
              Home
            </button>
            {dropdownSections.map((section, index) => (
              <Dropdown
                key={index}
                setRecentItems={setRecentItems}
                recentItems={recentItems}
                title={section.title}
                items={section.items}
              />
            ))}
          </section>
          <div className='flex pr-10'>
            <input
              type='text'
              className=' bg-[rgb(var(--white))] p-1 cursor-pointer w-60 placeholder: text-gray-500 pl-5 outline-0'
              placeholder='O que você procura?'
            />
            <IoSearch className='bg-[rgb(var(--blue-500))] p-2 text-[2.2rem] cursor-pointer' />
          </div>
        </nav>

        <div className=' flex gap-5 text-[1.5rem] '>
          <IoChatbox className='cursor-pointer hover:text-[rgb(var(--white),0.7)] transition-colors duration-500' />
          <FaGear className='cursor-pointer hover:text-[rgb(var(--white),0.7)] transition-colors duration-500' />
          <IoMdNotifications className='cursor-pointer hover:text-[rgb(var(--white),0.7)] transition-colors duration-500 ' />
          <AiFillCloseSquare
            onClick={() => handleLogout()}
            className=' cursor-pointer hover:text-[rgb(var(--white),0.7)] transition-colors duration-500 '
          />
        </div>
      </div>

      <section className='w-full  flex pl-10  pt-2 h-12 '>
        <div className={`w-full flex items-center  gap-2 pr-10 `}>
          {items.map((item) => (
            <div
              key={item.href}
              className={`
              border-b-6  pl-2 
              ${
                item.href === currentRoute //comparar com url
                  ? ' border-[rgb(var(--blue-50))]'
                  : ' border-[rgb(var(--blue-700))]'
              }
              ${
                item.href === currentRoute //comparar com url
                  ? ' bg-[rgb(var(--blue-50))]'
                  : ' bg-[#d9d9d9]'
              }
              transition duration-500 h-10
              
              min-w-[35px] max-w-[250px] hover:bg-[rgb(var(--blue-50))]
              flex gap-3 items-center justify-center text-[rgb(var(--text-blue))] cursor-pointer
              `}
            >
              <div
                className='truncate min-w-0 max-sm:hidden text-[1rem] '
                onClick={() => router.push(item.href)}
              >
                {item.label}
              </div>
              <div>
                <IoClose
                  onClick={(e) => {
                    deleteItem(item, item.href);
                    e.stopPropagation();
                  }}
                  className='text-[1.5rem]'
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </header>
  );
}

