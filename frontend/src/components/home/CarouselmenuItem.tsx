import { motion } from 'framer-motion';

export function CarouselMenuItem({ slide, navigate }: any) {
  return (
    <motion.div
      key={slide.id}
      className="relative aspect-1 shrink-0 flex flex-col items-center justify-center"
      onClick={() => {
        navigate(`/menu`, {
          state: { searchCategory: slide.category },
        });
      }}
    >
      <img
        src={slide.imageUrl}
        alt={`Item ${slide.id}`}
        className="rounded-full aspect-1 object-cover"
      />
      <span className="absolute aspect-1 inset-0 rounded-full bg-black-900 opacity-0 hover:opacity-30 transition-all ease-in" />
      <span className="mt-1 text-black-900 text-xxs font-semibold text-center w-full justify-center items-center flex capitalize">
        {slide.category}
      </span>
    </motion.div>
  );
}

export function CarouselMenuItemSkeleton() {
  return (
    <div className="relative md:w-20 md:h-20 xl:w-24 xl:h-24 shrink-0 flex flex-col items-center justify-center animate-pulse">
      <div className="rounded-full w-14 h-14 md:w-20 md:h-20 xl:w-24 xl:h-24 bg-gray-300" />
      <div className="mt-1 h-3 w-12 md:w-16 xl:w-20 bg-gray-300 rounded" />
    </div>
  );
}
