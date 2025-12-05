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
      <div
        className={`absolute text-[2rem] left-3 xss:left-5  top-5 h-14 w-12 flex items-center justify-center 
          rounded-t-0 rounded-b-lg
          ${
            toggle
              ? "text-white"
              : "text-white bg-[rgb(var(--background))] xss:bg-transparent xss:text-white"
          } 
          cursor-pointer hover:opacity-80   transition   duration-300 z-50
      `}
      >
        <HiMenuAlt2
          onClick={() => {
            setToggle(!toggle);
            toggle && setToggleUser(false);
          }}
        />
      </div>

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
