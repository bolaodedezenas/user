'use client';

import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import Loading from '@/components/Loading';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SharedLayout({ children }) {
  useProtectedRoute();
  const { loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
