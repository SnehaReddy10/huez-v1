import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import Offer from '../Offer';
import { useGetOffersQuery } from '../../store';
import { ToastContext } from '../../context/ToastContext';
import Loader from '../common/Loader';

interface Offer {
  id: number;
  name: string;
  discount: string;
  image: string;
  description: string;
}

const Offers: React.FC = () => {
  const {
    data: offers,
    isFetching: fetchingOffers,
    error: fetchingOffersFailed,
  } = useGetOffersQuery({});

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (!toastContext) {
      throw new Error('useContext must be used within a ToastProvider');
    }
    const { showToast } = toastContext;

    if (fetchingOffersFailed) {
      const r = fetchingOffersFailed as any;
      showToast(r.data?.message ?? r.data?.error[0], 'error', 'right-0 top-10');
    }
  }, [fetchingOffersFailed]);

  if (fetchingOffers) {
    return <Loader />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="p-6 pb-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="w-full text-center py-4 text-2xl font-bold"
        variants={titleVariants}
      >
        Exclusive Deals & Special Offers
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {offers?.data?.map((offer: any, index: number) => (
          <Offer key={offer._id} offer={offer} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Offers;
