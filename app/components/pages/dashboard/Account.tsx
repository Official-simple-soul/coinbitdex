import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconAngle, IconArrowBadgeRight, IconUser } from '@tabler/icons-react';
import { NavLink } from 'react-router';
import Frame from '~/components/common/Frame';
import DashboardLayout from '~/layouts/DashboardLayout';
import { useAuth } from '~/providers/AuthProvider';

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
              <IconUser size={'150px'} color="gray" />
            </div>
            <p className="mt-4 font-semibold text-lg">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="mt-1 text-lg text-gray-500">{user?.email}</p>
            <p className="mt-1 text-lg text-gray-500">{user?.phone}</p>
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
                <img src={item.icon} alt="" className="size-8" />
                <div className="flex justify-between items-center w-full">
                  <p className="text-lg">{item.label}</p>
                  <IconArrowBadgeRight size={'40px'} color="gray" />
                </div>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
      <Button
        radius={'lg'}
        w={'100%'}
        mt={'40px'}
        size="lg"
        color="red"
        onClick={handleLogout}
      >
        Sign Out
      </Button>
    </DashboardLayout>
  );
}

export default Account;

const menuItems = [
  {
    id: 1,
    icon: '/images/account-icon.png',
    label: 'Account Info',
    to: '/dashboard/account_info',
  },
  {
    id: 2,
    icon: '/images/kyc.png',
    label: 'KYC Status',
    to: '/dashboard/kyc',
  },
  {
    id: 3,
    icon: '/images/referrals.png',
    label: 'Referrals (10%)',
    to: '/dashboard/referral',
  },
  {
    id: 4,
    icon: '/images/contact-us.png',
    label: 'Contact Support',
    to: '/dashboard/contact_us',
  },
];
