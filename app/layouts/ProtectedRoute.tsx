import { useAuth } from '~/providers/AuthProvider';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Loader } from '@mantine/core';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate('/login');
  //   }
  // }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader size={50} />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
