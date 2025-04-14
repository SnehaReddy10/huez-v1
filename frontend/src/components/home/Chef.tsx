import { motion } from 'framer-motion';
import PrimaryButton from '../buttons/primary-button/PrimaryButton';
import chefImage from '../../assets/images/Chef-img.png';
import { useNavigate } from 'react-router-dom';

const Chef = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="w-[60%] flex flex-col md:flex-row items-center justify-center bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="md:w-1/2 flex justify-center"
        variants={imageVariants}
      >
        <motion.img
          src={chefImage}
          alt="Chef talking about healthy food"
          className="w-64 h-auto rounded-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <motion.div
        className="md:w-1/2 text-center md:text-left mt-6 md:mt-0"
        variants={textVariants}
      >
        <motion.h2
          className="text-2xl font-bold text-gray-900 font-serif"
          variants={textVariants}
        >
          Healthy Food for a Healthier Life
        </motion.h2>
        <motion.p
          className="mt-4 text-gray-600 text-xs"
          variants={textVariants}
        >
          Our expert chefs craft dishes with fresh, wholesome ingredients to
          help you live a vibrant and healthy life.
        </motion.p>
        <motion.p
          className="mt-2 text-gray-600 text-xs"
          variants={textVariants}
        >
          Enjoy delicious meals packed with essential nutrients, carefully
          designed to support your wellness journey.
        </motion.p>
        <motion.div
          variants={textVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PrimaryButton
            onClickHandler={() => {
              navigate('/menu');
            }}
            label="Explore More"
            className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-600"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Chef;
