import { useState } from 'react';
import { IoIosRestaurant } from 'react-icons/io';
import { IoHomeOutline, IoLocationOutline } from 'react-icons/io5';
import { MdMenuBook } from 'react-icons/md';

const icons = [
  <IoIosRestaurant color="gray" size={50} className="hover:fill-black-900" />,
  <IoLocationOutline color="gray" size={50} className="hover:fill-white" />,
  <IoLocationOutline color="gray" size={50} className="hover:fill-white" />,
  <IoLocationOutline color="gray" size={50} className="hover:fill-white" />,
  <IoHomeOutline color="gray" size={50} className="hover:fill-white" />,
  <MdMenuBook color="gray" size={50} className="hover:fill-white" />,
];
function Restaurants() {
  const [showNav, setShowNav] = useState(false);
  const dotCount = 10;
  const radius = 10;
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const angle = (i / dotCount) * 2 * Math.PI + (3 * Math.PI) / 2; // Spread dots evenly
    console.log({ angle });
    const cx = 0 + radius * Math.cos(angle); // x-coordinate
    const cy = 10 + radius * Math.sin(angle); // y-coordinate
    return { x: cx, y: cy };
  });
  console.log({ dots });
  return (
    <div className="py-28 relative bg-black-900 h-screen">
      <img
        onClick={() => setShowNav((r) => !r)}
        src="https://cdn.pixabay.com/photo/2022/11/01/05/18/coffee-7561288_1280.jpg"
        alt=""
        className="z-10 w-44 h-44 rounded-full absolute -left-14 border-[2px] border-white"
      />
      {/* <div>
        <div className="bg-black-900 absolute animate-slide w-max p-2 rounded-full border-[2px] border-white">
          <IoHomeOutline color="gray" size={50} />
        </div>
        <p className="text-white text-xxs font-semibold absolute top-[4rem] left-[12.5rem]">
          HOME
        </p>
      </div> */}

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

      {/* <div className="bg-black-900 absolute top-[7rem] left-[12rem] w-max p-2 rounded-full border-[2px] border-white">
        <IoIosRestaurant color="gray" size={50} />
      </div>
      <div className="bg-black-900 absolute top-[11.3rem] left-[13.5rem] w-max p-2 rounded-full border-[2px] border-white">
        <IoLocationOutline color="gray" size={50} />
      </div>
      <div className="bg-black-900 absolute top-[15.8rem] left-[12rem] w-max p-2 rounded-full border-[2px] border-white">
        <MdMenuBook color="gray" size={50} />
      </div> */}
    </div>
    // <div id="container" className="bg-black-900">
    //   <svg
    //     id=""
    //     className="animate-spin-10s"
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="48"
    //     height="48"
    //     viewBox="0 0 48 48"
    //   >
    //     <circle cx="24" cy="4" r="4" fill="#fff" />
    //     <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2" />
    //     <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4" />
    //     <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7" />
    //     <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9" />
    //     <circle cx="24" cy="44" r="2.5" fill="#feebbc" />
    //     <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af" />
    //     <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1" />
    //     <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94" />
    //     <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86" />
    //   </svg>
    // </div>
  );
}

export default Restaurants;
