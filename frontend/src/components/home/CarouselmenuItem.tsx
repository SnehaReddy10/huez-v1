import { motion } from 'framer-motion';

export function CarouselMenuItem({ slide, navigate }: any) {
  return (
    <motion.div
      key={slide.id}
      className="relative md:w-20 md:h-20 xl:w-24 xl:h-24 shrink-0"
      onClick={() => {
        navigate(`/menu`, {
          state: { searchCategory: slide.category },
        });
      }}
    >
      <img
        src={slide.imageUrl}
        alt={`Item ${slide.id}`}
        className="rounded-full w-14 h-14 md:w-20 md:h-20 xl:w-24 xl:h-24 object-cover"
      />
      <span className="absolute w-14 h-14 md:w-20 md:h-20 xl:w-24 xl:h-24 inset-0 rounded-full bg-black-900 opacity-0 hover:opacity-30 transition-all ease-in" />
      <span className="mt-1 text-black-900 text-xxs font-semibold text-center w-full justify-center items-center flex capitalize">
        {slide.category}
      </span>
    </motion.div>
  );
}
