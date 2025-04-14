import { motion } from 'framer-motion';
import Typewriter from '../common/Typewriter';
import SearchBar from '../common/SearchBar';

function Hero() {
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={heroVariants}>
      <motion.div
        className={`w-screen background bg-cover h-96 md:h-[25rem] bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]`}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute h-min inset-0 text-white font-serif mt-20 md:mt-40"
          variants={contentVariants}
        >
          <div className="flex flex-col gap-4 items-center">
            <motion.p
              className="text-xs md:text-xl w-48 md:w-96 text-center font-bold h-14"
              variants={contentVariants}
            >
              <Typewriter
                text="Bringing restaurant-quality meals to your table without compromise!"
                delay={60}
              />
            </motion.p>
            <motion.div variants={contentVariants}>
              <SearchBar />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
