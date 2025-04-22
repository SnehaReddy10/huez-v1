import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

function Carousel({
  enableAutoPlay = false,
  slides = [],
  className = '',
  carouselItem,
  slidesPerView = 1,
  slidesPerGroup = 1,
  showPagination = false,
  enableResponsiveView = false,
}: {
  enableAutoPlay?: boolean;
  slides?: any[];
  className?: string;
  carouselItem?: (slide: any) => React.ReactNode;
  slidesPerView?: number;
  slidesPerGroup?: number;
  showPagination?: boolean;
  enableResponsiveView?: boolean;
}) {
  const [visibleItems, setVisibleCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setVisibleCount(4);
      } else if (window.innerWidth <= 900) {
        setVisibleCount(6);
      } else {
        setVisibleCount(6);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        className={`relative w-full md:max-w-xl xl:max-w-2xl mx-auto overflow-hidden px-2 ${className}`}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={enableResponsiveView ? visibleItems : slidesPerView}
          slidesPerGroup={enableResponsiveView ? visibleItems : slidesPerGroup}
          pagination={
            showPagination
              ? {
                  el: '.custom-pagination',
                  clickable: true,
                }
              : false
          }
          autoplay={
            enableAutoPlay
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                }
              : false
          }
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {carouselItem ? carouselItem({ slide }) : null}
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination mt-2 flex justify-center"></div>
      </div>
    </>
  );
}

export default Carousel;
