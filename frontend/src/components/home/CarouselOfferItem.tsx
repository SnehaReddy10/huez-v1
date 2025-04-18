export const CarouselOfferItem = ({ slide }: { slide: any }) => {
  return (
    <div key={slide.id} className="min-w-[100%] text-white relative rounded-md">
      <img
        src={slide.image}
        alt={slide.name}
        className="min-w-[100%] h-[20dvh] object-cover opacity-90 rounded-md"
      />
    </div>
  );
};

export const CarouselOfferItemSkeleton = () => {
  return (
    <div className="min-w-[100%] bg-white rounded-md animate-pulse p-2">
      <div className="w-[100%] h-32 bg-gray-300 rounded-md"></div>
    </div>
  );
};
