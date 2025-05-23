import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import { reviews } from '../../static';

export default function CustomerReviews() {
  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const reviewVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const visibleReviews = [index, (index + 1) % reviews.length];

  return (
    <motion.div
      className="flex flex-col gap-4 md:gap-8 items-center justify-center py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col gap-2 w-full max-sm:p-4 md:w-[60%] text-center"
        variants={containerVariants}
      >
        <motion.h2
          className="text-base md:text-2xl font-serif font-bold text-balance"
          variants={reviewVariants}
        >
          See what our customers has to say
        </motion.h2>
        <motion.p
          className="text-xs text-gray-600 text-pretty"
          variants={reviewVariants}
        >
          Real stories, real flavors, and unforgettable experiences! See what
          our amazing customers have to say about their favorite dishes and
          dining moments with us!"
        </motion.p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <AnimatePresence mode="wait">
          {visibleReviews.map((i, idx) => (
            <motion.div
              key={i}
              className={`w-screen md:w-80 m-2 p-4 flex gap-4 bg-white rounded-sm text-center ${
                idx !== 0 ? 'hidden md:flex' : ''
              }`}
              variants={reviewVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.img
                src={reviews[i].image}
                alt={reviews[i].name}
                className="w-20 h-full md:w-32 md:h-40 mx-auto shadow-sm shadow-gray-300 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="flex flex-col text-start gap-2"
                variants={reviewVariants}
              >
                <h3 className="text-sm md:text-lg font-semibold">
                  {reviews[i].name}
                </h3>
                <p className="text-xs text-gray-500">{reviews[i].role}</p>
                <p className="text-gray-400 text-xs font-normal">
                  "{reviews[i].review}"
                </p>
                <div className="flex justify-start">
                  {[...Array(reviews[i].rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: j * 0.1 }}
                    >
                      <FaStar
                        size={16}
                        className="text-yellow-500"
                        fill="gold"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div className="flex gap-4" variants={containerVariants}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <PrimaryButton onClickHandler={prevReview} label="Previous" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <PrimaryButton onClickHandler={nextReview} label="Next" />
        </motion.div>
      </motion.div>

      <motion.div
        className="w-screen md:w-80 h-[2px] bg-gray-200 rounded-full overflow-hidden"
        variants={containerVariants}
      >
        <motion.div
          className="h-[2px] bg-orange-500"
          initial={{ width: 0 }}
          animate={{
            width: `${((index + 1) / reviews.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}
