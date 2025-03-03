import { useState } from 'react';
import { BiSolidOffer } from 'react-icons/bi';
import { GoClock } from 'react-icons/go';
import { IoIosRestaurant } from 'react-icons/io';
import { IoHomeOutline, IoLocationOutline } from 'react-icons/io5';
import { MdMenuBook } from 'react-icons/md';

const restaurantImages = [
  {
    imgUrl:
      'https://images.unsplash.com/photo-1586999768265-24af89630739?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
    hovered: false,
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    hovered: false,
  },
  {
    imgUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    hovered: false,
  },
  {
    imgUrl:
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=600',
    hovered: false,
  },
];

const icons = [
  <IoIosRestaurant color="white" size={40} className="hover:fill-black-900" />,
  <GoClock color="white" size={40} className="hover:fill-white" />,
  <IoLocationOutline color="white" size={40} className="hover:fill-white" />,
  <BiSolidOffer color="white" size={40} className="hover:fill-white" />,
  <IoHomeOutline color="white" size={40} className="hover:fill-white" />,
  <MdMenuBook color="white" size={40} className="hover:fill-white" />,
];

function Restaurants() {
  const [images, setImages] = useState(restaurantImages);
  const dotCount = 10;
  const radius = 10;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i / dotCount) * 2 * Math.PI + (3 * Math.PI) / 2; // Spread dots evenly
    const cx = 0 + radius * Math.cos(angle); // x-coordinate
    const cy = 10 + radius * Math.sin(angle); // y-coordinate
    return { x: cx, y: cy };
  });

  const handleMouseEnter = (index: number) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, hovered: true } : img
      )
    );
  };

  const handleMouseLeave = (index: number) => {
    setImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, hovered: false } : img
      )
    );
  };

  return (
    <div className="flex flex-col gap-10 py-10 bg-black-900">
      <div className="py-10 bg-black-900 relative justify-between flex">
        <div>
          <div className="pt-28">
            <img
              src="https://cdn.pixabay.com/photo/2022/11/01/05/18/coffee-7561288_1280.jpg"
              alt=""
              className="z-10 w-44 h-44 rounded-full absolute -left-14 border-[2px] border-white"
            />
          </div>

          <div className="flex justify-start">
            {icons.map((x, i) => (
              <div
                style={
                  {
                    '--translateX-end': `${dots[i].x}rem`,
                    '--translateY-end': `${dots[i].y - 6}rem`,
                  } as React.CSSProperties
                }
                className={`animate-slide hover:bg-orange-500 transition-all ease-in bg-black-900 absolute w-max p-2 rounded-full border-[2px] border-white`}
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        {/* <MenuBook /> */}

        {/* <div className="mx-10 flex gap-1">
        <img
          src="https://images.unsplash.com/photo-1574936145840-28808d77a0b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"
          alt=""
          className="h-72 w-80 translate-x-20 z-20 hover:animate-easeBounce"
        />
        <div
          className="h-96 w-72 translate-y-10 overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D"
            alt=""
            className={`h-96 w-72 z-0 ${
              hovered ? 'animate-scale-in' : 'animate-scale-out'
            }`}
          />
        </div>
      </div> */}
      </div>
      <div className="flex justify-center items-center mt-60 w-full p-2 md:p-10">
        <div className="grid grid-cols-2 gap-2 w-full">
          {images.map((x, i) => (
            <div
              className="translate-y-10 overflow-hidden"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <img
                src={x.imgUrl}
                alt=""
                className={`w-full z-0 ${
                  x.hovered ? 'animate-scale-in' : 'animate-scale-out'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
