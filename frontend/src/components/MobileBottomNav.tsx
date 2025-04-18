import { FaRegUser } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { LuInbox, LuShoppingBag } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const navItems = [
  {
    id: 1,
    label: 'Home',
    path: '/',
    icon: <IoHomeOutline size={24} />,
  },
  {
    id: 2,
    label: 'Explore',
    path: '/search',
    icon: <BsSearch size={24} />,
  },
  {
    id: 3,
    label: 'Menu',
    path: '/menu',
    icon: <LuShoppingBag size={24} />,
  },
  {
    id: 4,
    label: 'Inbox',
    path: '/notifications',
    icon: <LuInbox size={24} />,
  },
  {
    id: 5,
    label: 'Profile',
    path: '/profile',
    icon: <FaRegUser size={22} />,
  },
];

function MobileBottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="safe-area-inset-bottom">
        <div className="flex justify-around items-center px-6 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div
                className={`${
                  pathname === item.path ? 'text-black' : 'text-gray-400'
                }`}
              >
                {item.icon}
              </div>
              <span
                className={`text-[10px] ${
                  pathname === item.path
                    ? 'text-black font-medium'
                    : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
