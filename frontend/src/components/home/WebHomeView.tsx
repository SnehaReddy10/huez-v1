import { motion } from 'framer-motion';
import { useGetProductsQuery } from '../../store';
import Carousel from '../common/Carousel';
import Chef from './Chef';
import DiscountCard from './DiscountCard';
import Hero from './Hero';
import CustomerReviews from './CustomerReviews';
import { CarouselMenuItem } from './CarouselmenuItem';
import { useNavigate } from 'react-router-dom';
function WebHomeView() {
  const navigate = useNavigate();
  const { data: products } = useGetProductsQuery({ limit: 20, cursor: 0 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="hidden md:flex flex-col pb-20 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex-1 flex flex-col gap-10 items-center justify-center">
        <motion.div variants={itemVariants}>
          <Hero />
        </motion.div>

        <motion.div
          className="flex flex-col gap-8 justify-center items-center w-full"
          variants={itemVariants}
        >
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="font-bold text-base md:text-2xl font-serif">
              Our Special Dishes
            </h1>
            <p className="text-gray-600 text-xs text-pretty px-4 md:px-0">
              Experience flavors that bring comfort, joy, and a touch of magic
              to every bite. Savor the best, because you deserve it!
            </p>
          </div>

          <Carousel
            carouselItem={({ slide }) => CarouselMenuItem({ slide, navigate })}
            slides={products?.data}
            slidesPerView={6}
            slidesPerGroup={2}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <CustomerReviews />
        </motion.div>

        <motion.div
          className="flex justify-center items-center w-full"
          variants={itemVariants}
        >
          <DiscountCard />
        </motion.div>

        <motion.div
          className="flex justify-center items-center w-full"
          variants={itemVariants}
        >
          <Chef />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default WebHomeView;
