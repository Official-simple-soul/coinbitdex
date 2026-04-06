import { Avatar, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowBadgeRight, IconUser } from '@tabler/icons-react';
import { NavLink } from 'react-router';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';
import { menuItems } from './data';
import { base64ToImage } from '~/utils/helper';

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

  const avatar_url = base64ToImage(user?.avatar_url || '');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Frame>
          <div className="flex flex-col items-center justify-center">
            <div
              className="rounded-full p-3"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <Avatar
                src={avatar_url?.src || null}
                alt={user?.firstName}
                size={100}
                className="rounded-full"
              >
                <IconUser size={'70px'} color="gray" />
              </Avatar>
            </div>
            <p className="mt-4 font-semibold text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="mt-1 text-sm text-slate-400">{user?.email}</p>
            <p className="mt-1 text-sm text-slate-400">{user?.phone}</p>
          </div>
        </Frame>
        <div
          className="px-5 py-3 border rounded-xl space-y-3"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255,255,255,0.08)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.28)',
          }}
        >
          <ul>
            {menuItems.map((item) => (
              <NavLink
                to={item.to}
                key={item.id}
                className="py-2 flex items-center gap-5 border-b border-white/10"
              >
                <img src={item.icon} alt="" className="size-5" />
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm text-slate-200">{item.label}</p>
                  <IconArrowBadgeRight size={'30px'} color="gray" />
                </div>
              </NavLink>
            ))}
            <div className="py-2.5 flex items-center gap-5 border-b border-white/10">
              <img src={'/images/contact-us.png'} alt="" className="size-5" />
              <div className="flex justify-between items-center w-full">
                <p className="text-sm text-slate-200">{'Contact Support'}</p>
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
