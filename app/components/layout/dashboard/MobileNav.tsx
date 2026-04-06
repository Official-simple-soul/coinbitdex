import { NavLink } from 'react-router';
import { sidebarItems } from './sideBarItems';
import { IconHome } from '@tabler/icons-react';

const MobileNav = () => {
  const getRenderableIcon = (icon: any) => {
    if (typeof icon === 'function') return icon;
    if (icon && typeof icon === 'object' && '$$typeof' in icon) return icon;
    return IconHome;
  };

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        background: 'rgba(8, 14, 30, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="grid grid-cols-5 items-center p-2">
        {sidebarItems
          .filter((e) => e.label !== 'Transactions')
          .map((item, index) => {
            const ItemIcon = getRenderableIcon(item.icon);
            return (
              <NavLink
                to={item.href}
                key={index}
                className={({ isActive }) =>
                  `p-2 flex flex-col items-center rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'text-slate-300 hover:text-white'
                  }`
                }
              >
                <ItemIcon className="size-5" />
                <span className="text-[10px]">{item.label}</span>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default MobileNav;
