import { NavLink } from 'react-router';
import { sidebarItems } from './sideBarItems';

const MobileNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around items-center p-2">
        {sidebarItems
          .filter((e) => e.label !== 'Transactions')
          .map((item, index) => (
            <NavLink
              to={item.href}
              onClick={() => console.log('clicked')}
              key={index}
              className="p-2 flex flex-col items-center"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs text-gray-800">{item.label}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default MobileNav;
