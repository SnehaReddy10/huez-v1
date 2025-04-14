import { FaRegUser } from 'react-icons/fa';
import { IoHomeOutline } from 'react-icons/io5';
import { LuShoppingBag } from 'react-icons/lu';
import { IoCartOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  {
    id: 1,
    label: 'Home',
    path: '/',
    icon: <IoHomeOutline size={24} />,
  },
  {
    id: 2,
    label: 'Menu',
    path: '/menu',
    icon: <LuShoppingBag size={24} />,
  },
  {
    id: 3,
    label: 'Cart',
    path: '/cart',
    icon: <IoCartOutline size={24} />,
  },
  {
    id: 4,
    label: 'Profile',
    path: '/profile',
    icon: <FaRegUser size={22} />,
  },
];

function MobileBottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      style={{
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="safe-area-inset-bottom">
        <div className="flex justify-around items-center px-6 py-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1.5"
              whileTap={{ scale: 0.9 }}
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
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

export default MobileBottomNav;
