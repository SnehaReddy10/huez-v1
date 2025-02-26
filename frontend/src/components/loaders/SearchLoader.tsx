import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

export default function SearchLoader() {
  return (
    <div className="w-max flex justify-center items-center">
      <motion.svg
        width="100%"
        height="auto"
        viewBox="0 0 100 100"
        initial="hidden"
        animate="visible"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: '50px', ...image }}
      >
        <motion.circle
          cx="40"
          cy="40"
          r="18"
          stroke="#FF7F3E"
          strokeWidth="1"
          fill="none"
          variants={draw}
        />

        <motion.line
          x1="54"
          y1="52"
          x2="70"
          y2="70"
          stroke="#FF7F3E"
          strokeWidth="1"
          strokeLinecap="round"
          variants={draw}
        />
      </motion.svg>
    </div>
  );
}

const image: React.CSSProperties = {
  maxWidth: '80vw',
};
