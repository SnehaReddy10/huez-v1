import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2.5, ease: 'easeInOut' },
  },
};

const scratchHead = {
  hidden: { rotate: 0 },
  visible: {
    rotate: [0, -10, 0, 10, 0], // Scratching effect
    transition: { duration: 1.5, ease: 'easeInOut', repeat: Infinity },
  },
};

const floatingQuestionMarks = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: [0, 1, 1, 0],
    y: [10, -10, -10, 10],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

export default function ConfusedChef() {
  return (
    <div className="flex flex-col items-center justify-center h-min">
      <motion.svg
        width="150"
        height="150"
        viewBox="0 0 400 400"
        initial="hidden"
        animate="visible"
        preserveAspectRatio="xMidYMid meet"
        className="max-w-[300px]"
      >
        {/* Chef Hat */}
        <motion.circle
          cx="200"
          cy="90"
          r="44"
          stroke="black"
          strokeWidth="5"
          fill="none"
          variants={draw}
        />
        <motion.circle
          cx="156"
          cy="100"
          r="30"
          stroke="black"
          strokeWidth="5"
          fill="none"
          variants={draw}
        />
        <motion.circle
          cx="244"
          cy="100"
          r="30"
          stroke="black"
          strokeWidth="5"
          fill="none"
          variants={draw}
        />

        {/* Chef Face */}
        <motion.circle
          cx="200"
          cy="200"
          r="60"
          stroke="black"
          strokeWidth="5"
          fill="none"
          variants={draw}
        />

        {/* Raised Eyebrows */}
        <motion.line
          x1="170"
          y1="160"
          x2="190"
          y2="150"
          stroke="black"
          strokeWidth="5"
          variants={draw}
        />
        <motion.line
          x1="210"
          y1="150"
          x2="230"
          y2="160"
          stroke="black"
          strokeWidth="5"
          variants={draw}
        />

        {/* Eyes Looking Up */}
        <motion.circle cx="180" cy="190" r="6" fill="black" variants={draw} />
        <motion.circle cx="220" cy="190" r="6" fill="black" variants={draw} />

        {/* Mouth Open (Confused) */}
        <motion.path
          d="M180,230 Q200,260 220,230"
          stroke="black"
          strokeWidth="5"
          fill="none"
          variants={draw}
        />

        {/* Left Hand Raised (Scratching Head) */}
        <motion.line
          x1="150"
          y1="270"
          x2="120"
          y2="300"
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          variants={draw}
        />
        <motion.line
          x1="120"
          y1="300"
          x2="100"
          y2="320"
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          variants={scratchHead}
          initial="hidden"
          animate="visible"
        />

        {/* Right Hand (Helpless Gesture) */}
        <motion.line
          x1="250"
          y1="270"
          x2="280"
          y2="300"
          stroke="black"
          strokeWidth="5"
          strokeLinecap="round"
          variants={draw}
        />

        {/* Floating Question Marks */}
        <motion.text
          x="100"
          y="100"
          fontSize="40"
          fill="black"
          variants={floatingQuestionMarks}
          initial="hidden"
          animate="visible"
        >
          ?
        </motion.text>
        <motion.text
          x="300"
          y="100"
          fontSize="40"
          fill="black"
          variants={floatingQuestionMarks}
          initial="hidden"
          animate="visible"
        >
          ?
        </motion.text>
      </motion.svg>
    </div>
  );
}
