import {
  IconLogout,
  IconPhone,
  IconUserCircle,
  IconX,
  IconUser,
} from '@tabler/icons-react';
import { sidebarItems } from './sideBarItems';
import { NavLink } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';
import { base64ToImage } from '~/utils/helper';
import { Avatar, Button } from '@mantine/core';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
  handleChangeLanguageVisibility: () => void;
}

const Sidebar = ({
  isOpen,
  toggleSidebar,
  onLogout,
  handleChangeLanguageVisibility,
}: SidebarProps) => {
  const { user } = useAuth();
  const avatar_url = base64ToImage(user?.avatar_url || '');

  return (
    <div
      className={`fixed lg:sticky lg:top-0 lg:flex lg:flex-col w-64 text-white h-screen transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } transition-transform duration-300 ease-in-out z-50 border-r`}
      style={{
        background: 'rgba(8, 14, 30, 0.95)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <Avatar
            src={avatar_url?.src || null}
            alt={user?.firstName}
            size={40}
            className="rounded-full"
          >
            <IconUser size={'70px'} color="gray" />
          </Avatar>
          <div className="">
            <h2 className="text font-semibold">{user?.firstName}</h2>
            <p className="text-xs line-clamp-1 text-slate-400">
              Referral ID: {user?.referral_id || ''}
            </p>
          </div>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden text-slate-300 hover:text-white">
          <IconX className="w-6 h-6" />
        </button>
      </div>
      <div className="my-4 px-4">
        <h1 className="text-slate-400 font-semibold">{'Balance'}</h1>
        <p className="text-xl font-bold">${user?.balance?.toLocaleString()}</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-blue-500/20 border border-blue-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <NavLink
          to={''}
          className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
        >
          <IconPhone className="w-6 h-6" />
          <span>{'Support'}</span>
        </NavLink>
        <button
          className="w-full text-left text-sm font-normal underline mt-4 text-slate-300 hover:text-white"
          onClick={handleChangeLanguageVisibility}
        >
          Change Language
        </button>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 text-red-400 hover:text-red-300 mt-7"
        >
          <IconLogout className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
