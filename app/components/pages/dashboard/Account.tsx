import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAngle, IconArrowBadgeRight, IconUser } from '@tabler/icons-react';
import { NavLink } from 'react-router';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import { menuItems } from './data';

function Account() {
  const { user, logout } = useAuth();

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Frame>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-100 rounded-full p-3">
              <IconUser size={'70px'} color="gray" />
            </div>
            <p className="mt-4 font-semibold text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
            <p className="mt-1 text-sm text-gray-500">{user?.phone}</p>
          </div>
        </Frame>
        <div className="px-5 py-3 bg-white shadow-md border rounded-xl space-y-3">
          <ul>
            {menuItems.map((item) => (
              <NavLink
                to={item.to}
                key={item.id}
                className="py-2 flex items-center gap-5 border-b"
              >
                <img src={item.icon} alt="" className="size-5" />
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm">{item.label}</p>
                  <IconArrowBadgeRight size={'30px'} color="gray" />
                </div>
              </NavLink>
            ))}
            <div className="py-2.5 flex items-center gap-5 border-b">
              <img src={'/images/contact-us.png'} alt="" className="size-5" />
              <div className="flex justify-between items-center w-full">
                <p className="text-sm">{'Contact Support'}</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <Button
        radius={'md'}
        w={'100%'}
        mt={'40px'}
        color="red"
        onClick={handleLogout}
      >
        Sign Out
      </Button>
    </DashboardLayout>
  );
}

export default Account;
