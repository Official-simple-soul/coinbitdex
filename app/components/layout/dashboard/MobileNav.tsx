import { NavLink } from 'react-router';
import { sidebarItems } from './sideBarItems';

const MobileNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="grid grid-cols-5 items-center p-2">
        {sidebarItems
          .filter((e) => e.label !== 'Transactions')
          .map((item, index) => (
            <NavLink
              to={item.href}
              key={index}
              className="p-2 flex flex-col items-center"
            >
              <item.icon className="size-5" />
              <span className="text-[10px] text-gray-800">{item.label}</span>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default MobileNav;
