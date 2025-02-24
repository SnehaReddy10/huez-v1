import { motion } from 'motion/react';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: () => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        // repeat: Infinity,
        duration: 2.5,
        ease: 'easeInOut',
        // repeatType: 'reverse' as const,
      },
    };
  },
};

export default function CartLoader() {
  return (
    <div className="w-max">
      <motion.svg
        width="100%"
        height="auto"
        viewBox="0 0 125 125"
        initial="hidden"
        animate="visible"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: '75px', ...image }}
      >
        <motion.polyline
          points="27,35 35,35 37,40 60,40 110,40 100,80 50,80 54,86 98,86"
          stroke="#FF7F3E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />

        <motion.circle
          cx="55"
          cy="100"
          r="10" // Halved the size
          stroke="#FF7F3E"
          strokeWidth="2"
          fill="none"
          strokeDasharray="15 7"
          variants={draw}
        />

        <motion.circle
          cx="95"
          cy="100"
          r="10"
          stroke="#FF7F3E"
          strokeWidth="2"
          fill="none"
          strokeDasharray="15 7"
          variants={draw}
        />
      </motion.svg>
    </div>
  );
}

const image: React.CSSProperties = {
  maxWidth: '80vw',
};
