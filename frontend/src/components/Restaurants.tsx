import { useState } from 'react';
import { BiSolidOffer } from 'react-icons/bi';
import { GoClock } from 'react-icons/go';
import { IoIosRestaurant } from 'react-icons/io';
import { IoHomeOutline, IoLocationOutline } from 'react-icons/io5';
import { MdMenuBook } from 'react-icons/md';
import { FaCalendarAlt, FaRegGrinHearts } from 'react-icons/fa';

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
    <div className="flex flex-col gap-10 py-10">
      <div className="py-10 relative justify-between flex">
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

      <div>
        <SpecialMenu
          title="Breakfast Special Menu"
          menuItems={breakfastItems}
        />
        <SpecialMenu title="Lunch Special Menu" menuItems={lunchItems} />
        <SpecialMenu title="Dinner Special Menu" menuItems={dinnerItems} />
      </div>

      <MealGrid />
    </div>
  );
}

const breakfastItems = [
  {
    name: 'Crispy Chicken Poblano',
    price: '$120',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Beef, Chicken, Turkey',
  },
  {
    name: 'Crispy Chicken Poblano',
    price: '$54',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Beef, Chicken, Turkey',
  },
  {
    name: 'Crispy Chicken Poblano',
    price: '$78',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Beef, Chicken, Turkey',
  },
  {
    name: 'Crispy Chicken Poblano',
    price: '$58',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Beef, Chicken, Turkey',
  },
];

const lunchItems = [
  {
    name: 'Grilled Salmon',
    price: '$140',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Served with fresh oranges',
  },
  {
    name: 'BBQ Chicken',
    price: '$60',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Slow-cooked to perfection',
  },
  {
    name: 'Vegan Pasta',
    price: '$95',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Made with fresh organic vegetables',
  },
  {
    name: 'Steak & Fries',
    price: '$110',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Juicy steak with crispy fries',
  },
];

const dinnerItems = [
  {
    name: 'Grilled Salmon',
    price: '$140',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Served with fresh oranges',
  },
  {
    name: 'BBQ Chicken',
    price: '$60',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Slow-cooked to perfection',
  },
  {
    name: 'Vegan Pasta',
    price: '$95',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Made with fresh organic vegetables',
  },
  {
    name: 'Steak & Fries',
    price: '$110',
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    description: 'Juicy steak with crispy fries',
  },
];

const meals = [
  {
    src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Meal 1',
  },
  {
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Meal 2',
    large: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Meal 3',
  },
  {
    src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D',
    alt: 'Meal 4',
    large: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    alt: 'Meal 5',
  },
];

const MealGrid = () => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4 items-center justify-center">
      {meals.map((src, index) => (
        <img
          key={index}
          src={src.src}
          alt={`Dish ${index + 1}`}
          className={`rounded-lg object-cover transition-transform duration-300 hover:scale-105 ${
            index % 2 === 0 ? 'h-32 w-32' : 'h-48 w-48'
          }`}
        />
      ))}
    </div>
  );
};

function SpecialMenu({ title, menuItems }: any) {
  return (
    <div className="text-xs flex flex-col items-center py-10 px-4">
      <div className="mb-4">
        <FaRegGrinHearts size={30} />{' '}
      </div>

      <h2 className="text-orange-900 text-3xl font-semibold mb-6 font-serif">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-x-6">
        {menuItems.map((item: any, index: number) => (
          <div
            key={index}
            className="flex gap-10 items-center justify-between py-3 border-b border-dashed border-gray-400"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.src}
                alt={item.name}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div>
                <p className="text-orange-900 font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>

            <p className="text-orange-900 font-semibold">{item.price}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 bg-orange-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:bg-orange-800">
        Book a Table <FaCalendarAlt />
      </button>
    </div>
  );
}

export default Restaurants;
