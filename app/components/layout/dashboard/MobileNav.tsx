import { Link } from 'react-router';
import { sidebarItems } from './sideBarItems';

const MobileNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around items-center p-2">
        {sidebarItems.map((item, index) => (
          <Link to={item.href} key={index} className="p-2">
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
