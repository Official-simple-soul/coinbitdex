import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import Footer from '~/components/layout/Footer';
import Header from '~/components/layout/Header';
import { auth } from '~/config/firebase';
import { useAuth } from '~/providers/AuthProvider';

interface UnAuthLayoutProps {
  children: ReactNode;
}

const UnAuthLayout: React.FC<UnAuthLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user && auth?.currentUser?.emailVerified) {
      navigate('/dashboard', { replace: true });
      notifications.show({
        title: 'Already logged in',
        message: 'You are already logged in',
        color: 'blue',
      });
    }
  }, [user, navigate, auth]);

  // if (loading) {
  //   return (
  //     <div className="h-screen w-full flex justify-center items-center">
  //       <Loader size={50} />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default UnAuthLayout;
