'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/Loading';
import Menu from '@/components/Menu';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

import { HiMenuAlt2 } from "react-icons/hi";


export default function SharedLayout({ children }) {
  useProtectedRoute();
  const [toggle, setToggle] = useState(true);
  const [toggleUser, setToggleUser] = useState(false);

  const { loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <section className="relative p-1 xxs:p-2 sm:p-2 lg:p-4 flex gap-2 sm:gap-2 h-full bg-[rgb(var(--blue-50))] ">
      <HiMenuAlt2
        onClick={() => {
          setToggle(!toggle);
          toggle && setToggleUser(false);
        }}
        className={`absolute text-[2rem] left-6 top-6 ${ toggle ? "text-white" : 'text-black' } 
        cursor-pointer hover:opacity-80   transition   duration-300 z-50
      `}
      />
      <Menu toggle={toggle} setToggle={setToggle} toggleUser={toggleUser} setToggleUser={setToggleUser} />
      <main className="w-full bg-[rgb(var(--blue-50))] overflow-auto ">
        {children}
      </main>
      {/* <Footer /> */}
    </section>
  );
}
