import { IconBell, IconMenu2, IconUser } from '@tabler/icons-react';
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
    <header
      className="px-4 py-3 sticky top-0 z-40 border-b"
      style={{
        background: 'rgba(6, 9, 20, 0.9)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-slate-300 hover:text-white transition-colors"
        >
          <IconMenu2 className="w-6 h-6" />
        </button>
        <div className="flex flex-col leading-none">
          <span
            className="font-display text-sm md:text-base font-bold tracking-wide"
            style={{
              background:
                'linear-gradient(135deg, #93c5fd 0%, #60a5fa 45%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            COINBITDEX
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-1">
            Dashboard
          </span>
        </div>
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
          <IconBell className="text-slate-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;
