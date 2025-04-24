import { FaShoppingCart } from 'react-icons/fa';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { MdLocalOffer, MdMenuBook } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken, logout } from '../utitlities';
import { LuLogOut } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { cartApi } from '../store/cart/cartApi';
import { FaUser } from 'react-icons/fa';

const navItems = [
  {
    id: 1,
    label: 'Home',
    path: '/',
    icon: <IoHome color="white" size={15} fill="white" />,
  },
  // {
  //   id: 2,
  //   label: 'Restaurants',
  //   path: '/restaurants',
  //   icon: <IoIosRestaurant color="white" size={20} fill="white" />,
  // },
  {
    id: 3,
    label: 'Menu',
    path: '/menu',
    icon: <MdMenuBook color="white" size={20} fill="white" />,
  },
  {
    id: 4,
    label: 'Cart',
    path: '/cart',
    icon: <FaShoppingCart color="white" size={15} fill="white" />,
  },
  {
    id: 5,
    label: 'Offers',
    path: '/offers',
    icon: <MdLocalOffer color="white" size={15} fill="white" />,
  },
  {
    id: 6,
    label: 'About',
    path: '/about',
    icon: <IoMdInformationCircle color="white" size={15} fill="white" />,
  },
];

const authItems = [
  {
    id: 1,
    label: 'Register',
    path: '/register',
  },
  {
    id: 2,
    label: 'Login',
    path: '/login',
  },
];

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    dispatch(cartApi.util.resetApiState());
    handleOnClick('/');
  };

  return (
    <div className="hidden md:flex z-10 gap-4 sticky top-0 justify-around text-xxs py-3 bg-black-900 text-white">
      <div className="flex gap-8 justify-center">
        <span className="pr-10 text-sm font-bold text-orange-500 selection:text-white">
          Huez
        </span>
        {navItems.map((x) => (
          <div
            key={x.id}
            onClick={() => handleOnClick(x.path)}
            className="flex flex-col gap-[0.12rem] cursor-pointer"
          >
            <div className="flex gap-1 items-center">
              {x.icon}
              <span>{x.label}</span>
            </div>
            {x.path === pathname && (
              <span className="bg-orange-500 h-[0.12rem] rounded-full w-6"></span>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center">
        {getToken() === null ? (
          <>
            {' '}
            {authItems.map((x) => (
              <div
                key={x.id}
                onClick={() => handleOnClick(x.path)}
                className="flex flex-col gap-[0.12rem] cursor-pointer"
              >
                <span>{x.label}</span>
                {x.path === pathname && (
                  <span className="bg-orange-500 h-[0.12rem] rounded-full w-3"></span>
                )}
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              onClick={() => handleOnClick('/profile')}
              className="flex gap-1 cursor-pointer items-center justify-center"
            >
              <FaUser size={13} fill="white" />
              <span>Profile</span>
            </div>
            <div
              onClick={handleLogout}
              className="flex gap-1 cursor-pointer items-center justify-center"
            >
              <span>Logout</span>
              <LuLogOut size={15} fill="white" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
