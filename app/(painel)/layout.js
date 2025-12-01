'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/Loading';
import Menu from '@/components/Menu';

import { HiMenuAlt2 } from "react-icons/hi";


export default function SharedLayout({ children }) {
  const [toggle, setToggle] = useState(true);
  const [toggleUser, setToggleUser] = useState(false);

  const { loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <section className="relative p-1 xxs:p-2 sm:p-2 lg:p-4 flex gap-2 sm:gap-2 lg:gap-4  bg-[rgb(var(--blue-50))] 
       w-full h-screen
    ">
      <HiMenuAlt2
        onClick={() => {
          setToggle(!toggle);
          toggle && setToggleUser(false);
        }}
        className={`absolute text-[2rem] left-6 lg:left-8.5 top-6 ${
          toggle ? "text-white" : "text-black xss:text-white"
        } 
        cursor-pointer hover:opacity-80   transition   duration-300 z-50
      `}
      />
      <Menu
        toggle={toggle}
        setToggle={setToggle}
        toggleUser={toggleUser}
        setToggleUser={setToggleUser}
      />
      <section className="flex-1 bg-[rgb(var(--blue-50))] overflow-auto ">
        {children}
      </section>
      {/* <Footer /> */}
    </section>
  );
}
