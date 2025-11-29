"use client";


import { useEffect, useState } from "react";
import PageLoading from '@/components/PageLoading';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   setTimeout(() => setLoading(false) , 3000);
  }, []);

  if (loading) return <PageLoading />;

  return (
    <section className='fle-1 h-full flex items-center justify-center bg-[rgb(var(--blue-50))]'>
      <h2 className='text-[2rem]'>Dasboard</h2>
    </section>
  );
}
