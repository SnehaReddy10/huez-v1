import {
  FaHeart,
  FaHistory,
  FaWallet,
  FaGift,
  FaCreditCard,
  FaQuestionCircle,
  FaMedal,
} from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  link: string;
}

function Profile() {
  const email = useSelector((state: any) => state.authSlice.email);
  const name = useSelector((state: any) => state.authSlice.name);

  const menuItems: MenuItem[] = [
    {
      icon: <FaHeart className="w-5 h-5" />,
      label: 'Favorit List',
      link: '/favorites',
    },
    {
      icon: <FaHistory className="w-5 h-5" />,
      label: 'Orders History',
      link: '/orders',
    },
    {
      icon: <FaWallet className="w-5 h-5" />,
      label: 'Wallet',
      link: '/wallet',
    },
    {
      icon: <FaGift className="w-5 h-5" />,
      label: 'Promotion',
      link: '/promotions',
    },
    {
      icon: <FaCreditCard className="w-5 h-5" />,
      label: 'Payment Method',
      link: '/payment',
    },
    {
      icon: <FaQuestionCircle className="w-5 h-5" />,
      label: 'Help',
      link: '/help',
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto bg-gray-50 min-h-screen flex flex-col gap-1">
        <div className="flex flex-col gap-1.5 h-[100dvh]">
          <div className="bg-white h-[30%] flex flex-col justify-around">
            <div className="px-5 flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold text-gray-900">
                My Account
              </h1>
              <MdOutlineEdit className="text-xl text-gray-500 cursor-pointer" />
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="relative mb-2.5 flex justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
                  alt="Profile"
                  className="w-[40%] aspect-square rounded-full object-cover"
                />
                <div className="absolute bottom-1 right-[34%] w-3.5 h-3.5 bg-green-500 rounded-full border-[2px] border-white"></div>
              </div>
              <div className="text-center">
                <h2 className="text-sm font-bold text-gray-900">{name}</h2>
                <p className="text-xs text-gray-500">{email}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 bg-white max--h-[10%]">
            <div className="bg-white flex items-center justify-center rounded-md gap-2 flex-1 px-3 py-2">
              <div className="flex items-center justify-center bg-[#2F6FED] rounded-sm p-1">
                <FaMedal className="text-white text-xs" />
              </div>
              <div>
                <p className="text-xxs font-bold text-[#2F6FED] tracking-wide leading-none mb-1">
                  PLATINUM
                </p>
                <p className="text-xs text-[#2F6FED]/80 leading-none">
                  245 Points
                </p>
              </div>
            </div>
            <div className="bg-white py-2 px-3 flex items-center justify-center gap-2 flex-1 border-l-2 border-gray-100">
              <div className="flex items-center justify-center bg-green-400 rounded-sm p-1">
                <AiFillStar className="text-white text-xs" />
              </div>
              <div>
                <p className="text-xxs font-bold text-green-400 tracking-wide leading-none mb-1">
                  RATING
                </p>
                <p className="text-green-400 font-medium text-[14px] leading-none">
                  4.35
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white h-[60%]">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex items-center px-5 py-4 hover:bg-gray-50 border-b border-gray-100"
              >
                <div className="text-gray-500 mr-4">{item.icon}</div>
                <span className="flex-grow text-[15px] text-gray-900">
                  {item.label}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
