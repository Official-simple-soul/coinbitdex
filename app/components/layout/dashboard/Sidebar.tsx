import { IconLogout, IconX } from '@tabler/icons-react';
import { sidebarItems } from './sideBarItems';
import { NavLink } from 'react-router';
import { useAuth } from '~/providers/AuthProvider';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar, onLogout }: SidebarProps) => {
  const { user } = useAuth();
  return (
    <div
      className={`fixed lg:sticky lg:top-0 lg:flex lg:flex-col w-64 bg-gray-800 text-white h-screen transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex">
          <div className="">
            <h2 className="text-xl font-semibold">{user?.firstName}</h2>
            <p className="text-xs line-clamp-1">
              Referral ID: {user?.referral_id || ''}
            </p>
          </div>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden">
          <IconX className="w-6 h-6" />
        </button>
      </div>
      <div className="my-4 px-4">
        <h1 className="text-lg text-gray-400 font-semibold">{'Balance'}</h1>
        <p className="text-2xl font-bold">{user?.balance || '$ 20.0'}</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-8">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.href}
                className="flex items-center space-x-2 hover:text-gray-400"
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 text-red-500 hover:text-gray-400"
        >
          <IconLogout className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
