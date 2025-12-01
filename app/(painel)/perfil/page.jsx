"use client";

import { useEffect, useState } from "react";
// components
import Header from "@/components/Header";
import Title from "@/components/Title";
import Paragraph from "@/components/paragraph";
import PageLoading from "@/components/PageLoading";
import EditUserForm from "@/components/Forms/SystemForm/EditUserForm";

// icons
import { FaUser } from "react-icons/fa";


export default function Perfil() {

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false) , 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className=" flex gap-2 flex-col  bg-[rgb(var(--blue-50))]">
      <Header>
        <FaUser className="text-[2rem] text-[rgb(var(--blue-950))] ml-8 " />
        <div>
          <Title
            text="Perfil"
            className={"text-zinc-700 font-semibold text-[0.9rem]"}
          />
          <Paragraph
            text="Edite seus dados a baixo"
            className={"text-zinc-500  text-[0.8rem]"}
          />
        </div>
      </Header>
      <EditUserForm />
    </section>
  );
}
