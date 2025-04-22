import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoMdStar } from 'react-icons/io';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import QuantityControlGroup from '../common/QuantityControlGroup';
import { useNavigate } from 'react-router-dom';

interface MenuItemCardProps {
  item: {
    _id: string;
    name: string;
    imageUrl: string;
    price: number;
    rating?: number;
  };
  addProductToCart: (product: any) => void;
  index: number;
}

export const MenuItemCard = ({
  item,
  addProductToCart,
  index,
}: MenuItemCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -10,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.1,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1 + 0.2,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-sm p-4 max-md:w-full w-64 max-md:h-64 overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-32 object-cover rounded-sm"
        variants={imageVariants}
        onClick={() => navigate(`/menu-item/${item._id}`)}
      />

      <motion.div className="mt-3" variants={contentVariants}>
        <h3 className="text-gray-800 font-semibold text-xs">{item.name}</h3>
        <div className="mt-2 flex gap-2 justify-between items-center">
          <QuantityControlGroup
            item={{ menuItem: item, quantity }}
            decrementProductQuantity={() => setQuantity((x) => x - 1)}
            incrementProductQuantity={() => setQuantity((x) => x + 1)}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <PrimaryButton
              label="+ ADD"
              className="bg-black-900 px-4 py-1 rounded-md w-max text-[0.5rem] text-white font-semibold shadow-md hover:bg-[#E65A00] transition"
              onClickHandler={() =>
                addProductToCart({ menuItemId: item._id, quantity })
              }
            />
          </motion.div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-bold">${item.price}</span>
          <span className="font-medium flex gap-[1px] items-center text-sm">
            <span className="text-sm">
              <IoMdStar color="#cf5a58" />
            </span>
            {item.rating ?? 4}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
