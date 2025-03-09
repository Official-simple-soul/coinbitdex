import { IconMenu2 } from '@tabler/icons-react';
import { useLocation } from 'react-router';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { pathname } = useLocation();

  return (
    <header className="bg-white shadow p-4 sticky top-0 z-40">
      <div className="flex justify-between items-center">
        <button onClick={toggleSidebar} className="lg:hidden">
          <IconMenu2 className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold capitalize">
          {pathname.split('/').at(-1)}
        </h1>
      </div>
    </header>
  );
};

export default Header;
