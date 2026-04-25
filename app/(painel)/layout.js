'use client';

import { useState, useEffect } from 'react';
import Menu from '@/components/Menu';
import Loading from '@/components/Loading';

import { HiMenuAlt2 } from "react-icons/hi";
//stores
import { useToggleStore } from "@/stores/toggleStore";
import { useAuthListener } from "@/modules/auth/hooks/useAuthListener";
import { useProtectedRoute } from "@/modules/auth/hooks/useProtectedRoute";


export default function SharedLayout({ children }) {
  // para re-renderizar quando o usuário mudar
  useAuthListener();
  useProtectedRoute("private");

  const { toggle, setToggle } = useToggleStore();
  const [toggleUser, setToggleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => setLoading(false), 2000);
    }, []);
  
    if (loading) return <Loading />;

  return (
    <section
      className=" relative  overflow-auto   flex   gap-2 sm:gap-2 lg:gap-4  bg-[rgb(var(--blue-50))] 
      flex-1  p-3
    "
    >
      <HiMenuAlt2
        className={`absolute text-[2.4rem] left-6 max-xss:left-4 xss:left-7   top-4  flex items-center justify-center 
          rounded-t-0 rounded-b-lg  text-[rgb(var(--btn))]
          cursor-pointer hover:opacity-80   transition   duration-300 z-60
        `}
        onClick={() => {
          setToggle(!toggle);
          toggle && setToggleUser(false);
        }}
      />
      <Menu toggleUser={toggleUser} setToggleUser={setToggleUser} />
      <section className="flex-1 bg-[rgb(var(--blue-50))] overflow-auto ">
        {children}
      </section>
    </section>
  );
}
