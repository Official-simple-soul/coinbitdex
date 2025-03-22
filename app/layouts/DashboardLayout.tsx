import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import Header from '~/components/layout/dashboard/Header';
import MobileNav from '~/components/layout/dashboard/MobileNav';
import Sidebar from '~/components/layout/dashboard/Sidebar';
import { useAuth } from '~/providers/AuthProvider';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //   const [title, setTitle] = useState('Dashboard');
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      logout();
      window.location.replace('/');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'An error occurred while logging out.',
        color: 'red',
      });
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <MobileNav />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onLogout={handleLogout}
        // setTitle={setTitle}
      />

      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 px-4 pt-4 pb-24 md:p-8 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
