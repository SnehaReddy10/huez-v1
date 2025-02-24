import { motion } from 'motion/react';

export const MenuSkeletonLoader = () => {
  return (
    <div className="grid 2xl:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          {i % 2 === 0 ? (
            <div className="mr-8">
              <SkeletonMenuItem align="left" />
            </div>
          ) : (
            <div className="flex justify-end items-end">
              <SkeletonMenuItem align="right" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const SkeletonMenuItem = ({ align }: { align: 'left' | 'right' }) => {
  return (
    <motion.div
      className={`relative m-4 flex w-full justify-between bg-slate-50 rounded-md p-4 ${
        align === 'right' ? 'flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
    >
      <div className="md:w-64 md:h-56 bg-gray-300 rounded-md animate-pulse" />

      <div className="flex flex-col gap-4 p-4 w-full">
        <div className="w-3/5 h-6 bg-gray-300 rounded-md animate-pulse" />

        <div className="w-4/5 h-4 bg-gray-300 rounded-md animate-pulse" />

        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-6 bg-gray-300 rounded-md animate-pulse"
            />
          ))}
        </div>

        <div className="flex gap-4">
          <div className="w-24 h-8 bg-gray-300 rounded-md animate-pulse" />
          <div className="w-32 h-8 bg-gray-300 rounded-md animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};
