"use client";

import { useEffect, useState } from "react";

// components
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import PageLoading from "@/components/PageLoading";
import ProfileForm from "@/modules/perfil/components/ProfileForm";

// icons
import { FaUser } from "react-icons/fa";

export default function Perfil() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  // if (loading) return <PageLoading />;

  return (
    <section
      className="flex-1 min-h-0 h-full flex gap-4 flex-col bg-[rgb(var(--blue-50))]
       overflow-hidden"
    >
      {/* HEADER FIXO */}
      <section className="w-full flex flex-wrap  items-center justify-between bg-white shadow-md 
         rounded-lg  px-4 py-2 gap-2 transition-all duration-300">
        <div className=" flex flex-wrap items-center justify-between gap-2    ">
          <div className=" flex flex-col ml-10 xss:ml-0 ">
            <div className="flex gap-2 items-center  ">
              <FaUser className="text-[1.5rem] text-[rgb(var(--btn))]" />
              <Title
                text="Perfil"
                className="text-zinc-700 font-semibold text-[0.9rem]"
              />
            </div>
            <Paragraph
              text="Edite seus dados a baixo"
              className="text-zinc-500 text-[0.8rem]"
            />
          </div>
        </div>
      </section>

      {/* CONTEÚDO COM SCROLL */}
      {loading ? (
        <PageLoading />
      ) : (
        <div
          className=" flex-1 flex justify-center  overflow-y-auto bg-white shadow-lg rounded-lg 
          sx:p-6 py-6  "
        >
          <ProfileForm />
        </div>
      )}
    </section>
  );
}
