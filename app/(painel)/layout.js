'use client';

import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import Loading from '@/components/Loading';

import Menu from "../../components/Menu";

export default function SharedLayout({ children }) {
  useProtectedRoute();
  const { loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <section className="p-1 sm:p-4 flex gap-5 h-screen bg-[rgb(var(--blue-50))] ">
      <Menu />
      <main className="flex-1 bg-[rgb(var(--blue-50))] overflow-x-hidden">{children}</main>
      {/* <Footer /> */}
    </section>
  );
}
