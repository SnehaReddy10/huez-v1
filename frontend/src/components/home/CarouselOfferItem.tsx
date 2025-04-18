export const CarouselOfferItem = ({ slide }: { slide: any }) => {
  return (
    <div
      key={slide.id}
      className="min-w-[100%] bg-black text-white relative rounded-md"
    >
      <img
        src={slide.image}
        alt="Slide"
        className="w-[100%] h-32 object-cover opacity-90 rounded-md"
      />
    </div>
  );
};
