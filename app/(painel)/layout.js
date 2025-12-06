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
    <section
      className=" h-fit overflow-auto  relative  flex   gap-2 sm:gap-2 lg:gap-4  bg-[rgb(var(--blue-50))] 
      flex-1  p-3
    "
    >
      <HiMenuAlt2
        className={`absolute text-[2rem] left-6 xss:left-7  top-7  flex items-center justify-center 
          rounded-t-0 rounded-b-lg  text-[rgb(var(--btn))]
          cursor-pointer hover:opacity-80   transition   duration-300 z-50
        `}
        onClick={() => {
          setToggle(!toggle);
          toggle && setToggleUser(false);
        }}
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
