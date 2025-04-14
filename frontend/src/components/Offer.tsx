import { motion } from 'framer-motion';
import PrimaryButton from './buttons/primary-button/PrimaryButton';

interface OfferProps {
  offer: {
    _id: string;
    name: string;
    discount: string;
    image: string;
    description: string;
  };
  index: number;
}

function Offer({ offer, index }: OfferProps) {
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
        delay: index * 0.15,
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

  const badgeVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.15 + 0.2,
        duration: 0.4,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.15 + 0.1,
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
        delay: index * 0.15 + 0.3,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      key={offer._id}
      className="relative p-4 border rounded-lg shadow-lg bg-white flex flex-col gap-2 overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.span
        className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded"
        variants={badgeVariants}
      >
        {offer.discount}
      </motion.span>

      <motion.img
        src={offer.image}
        alt={offer.name}
        className="w-full h-32 object-cover rounded-md"
        variants={imageVariants}
      />

      <motion.div variants={contentVariants}>
        <h3 className="text-lg font-semibold mt-3">{offer.name}</h3>
        <p className="text-gray-600 text-xs">{offer.description}</p>
      </motion.div>

      <motion.div
        variants={contentVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PrimaryButton
          label="Claim Offer"
          onClickHandler={() => {}}
          className="px-4 py-1 mt-2"
        />
      </motion.div>
    </motion.div>
  );
}

export default Offer;
