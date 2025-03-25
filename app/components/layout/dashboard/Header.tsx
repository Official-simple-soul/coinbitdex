import { IconBell, IconMenu2, IconUser } from '@tabler/icons-react';
import logo from '/images/logo.avif';
import { NavLink } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { base64ToImage } from '~/utils/helper';
import { Avatar } from '@mantine/core';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useAuth();
  const avatar_url = base64ToImage(user?.avatar_url || '');
  return (
    <header className="bg-white shadow px-4 py-3 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <button onClick={toggleSidebar} className="lg:hidden">
          <IconMenu2 className="w-6 h-6" />
        </button>
        <img src={logo} onClick={close} alt="Logo" className="h-6 md:h-12" />
        <div className="flex items-center gap-2">
          <NavLink to={'/dashboard/accounts'}>
            <Avatar
              src={avatar_url?.src || null}
              alt={user?.firstName}
              size={25}
              className="rounded-full"
            >
              <IconUser size={'40px'} color="gray" />
            </Avatar>
          </NavLink>
          <IconBell />
        </div>
      </div>
    </header>
  );
};

export default Header;
