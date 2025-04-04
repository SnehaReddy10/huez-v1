import { useNavigate } from 'react-router-dom';
import Carousel from '../common/Carousel';
import Reviews from './CustomerReviews';
import Hero from './Hero';
import DiscountCard from './DiscountCard';
import Chef from './Chef';

const items = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
  },
];

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col pb-20">
      <div className="flex-1 flex flex-col gap-10 items-center justify-center">
        <Hero />
        <div className="flex flex-col gap-8 justify-center items-center w-1/3 text-center">
          <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="font-bold text-2xl font-serif">
              Our Special Dishes
            </h1>
            <p className="text-gray-600 text-xs">
              Experience flavors that bring comfort, joy, and a touch of magic
              to every bite. Savor the best, because you deserve it!
            </p>
          </div>
          <Carousel
            totalItems={items?.length ?? 0}
            children={
              <>
                {items?.map((x: any, idx: any) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 shrink-0"
                    onClick={() => navigate('/menu')}
                  >
                    <img
                      src={x.url}
                      alt={`Item ${idx}`}
                      className="rounded-full w-24 h-24 object-cover"
                    />
                    <span className="absolute inset-0 rounded-full bg-black-900 opacity-0 hover:opacity-30  transition-all ease-in" />
                  </div>
                ))}
              </>
            }
          />
        </div>
        {/* <Offers /> */}
        <Reviews />
        <DiscountCard />
        <Chef />
      </div>
    </div>
  );
}

export default Home;
